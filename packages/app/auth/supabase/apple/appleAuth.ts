import axiosInstance from 'app/api/common/axiosInstance'
import { asyncAuthStorage } from 'app/utils/auth'
import { supabase } from 'app/utils/supabase'
import * as AppleAuthentication from 'expo-apple-authentication'

export const handleAppleSignIn = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    })

    if (credential.identityToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      })

      const res = await axiosInstance.post('/v1/user', {
        email: data.session?.user.email,
        authProvider: 'APPLE',
        supabaseUuid: data.session?.user.id,
        isPolicyAgreeded: true,
      })

      if (data.session) {
        await asyncAuthStorage.setSession(data.session)
      }

      if (error) {
        return {
          success: false,
          error: {
            code: 'SUPABASE_ERROR',
            message: error.message,
          },
        }
      }
      return {
        success: res.data.ok,
        data: data.user,
      }
    } else {
      return {
        success: false,
        error: {
          code: 'NO_IDENTITY_TOKEN',
          message: 'No identityToken received from Apple',
        },
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: {
        code: error.code || 'UNKNOWN_ERROR',
        message:
          error.code === 'ERR_REQUEST_CANCELED'
            ? 'Sign in canceled by user'
            : error.message || 'Unknown error occurred',
      },
    }
  }
}

'use client'

import {
  Platform,
  TouchableOpacity,
  View,
  Linking,
  Pressable,
} from 'react-native'
import { CustomText, Typography } from 'app/design/typography'
import { GoogleLoginButton } from 'app/auth/supabase/google/googleLoginButton'
import { AppleLoginButton } from 'app/auth/supabase/apple/AppleLoginButton'
import { useI18n } from 'app/provider/i18n/i18n-provider'

export function LoginScreen() {
  const { t } = useI18n()

  const handleLoginError = (error: any) => {
    console.error('Login failed:', error)
  }

  return (
    <>
      <View className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center space-y-3 px-6">
          <Typography className="mt-8" variant="t1" weight="bold">
            {t('auth.title')}
          </Typography>
        </View>
        <View className="w-full px-6 pb-6">
          <View className="flex flex-col items-center gap-4">
            {Platform.OS === 'ios' && (
              <View>
                <AppleLoginButton onError={handleLoginError} />
              </View>
            )}
            <View>
              <GoogleLoginButton onError={handleLoginError} />
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default LoginScreen

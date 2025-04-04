import { useEffect } from 'react'
import { TouchableOpacity, Text, Image, View } from 'react-native'
import { initializeGoogleSignIn, handleGoogleSignIn } from './googleAuth'
import { supabase } from 'app/utils/supabase'
import { useI18n } from 'app/provider/i18n/i18n-provider'
import { Typography } from 'app/design/typography'
import { router } from 'expo-router'
import axiosInstance from 'app/api/common/axiosInstance'

interface GoogleLoginButtonProps {
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

export function GoogleLoginButton({
  onSuccess,
  onError,
}: GoogleLoginButtonProps) {
  const { t } = useI18n()
  useEffect(() => {
    initializeGoogleSignIn()
  }, [])

  const onGoogleSignIn = async () => {
    console.log('onGoogleSignIn')
    const result = await handleGoogleSignIn()
    if (result?.success) {
      console.log(result.success)
    } else {
      onError?.(result.error)
    }
  }

  return (
    <TouchableOpacity
      className="h-12 w-96 flex-row items-center justify-center rounded-full bg-gray-100"
      onPress={onGoogleSignIn}
    >
      <View className="absolute left-4 h-full justify-center"></View>
      <Typography color="black">{t('auth.googleLogin')}</Typography>
    </TouchableOpacity>
  )
}

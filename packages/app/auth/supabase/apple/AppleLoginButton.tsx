import * as AppleAuthentication from 'expo-apple-authentication'
import { handleAppleSignIn } from './appleAuth'
import { TouchableOpacity, View } from 'react-native'
import { Typography } from 'app/design/typography'
import { useI18n } from 'app/provider/i18n/i18n-provider'

interface AppleLoginButtonProps {
  onError?: (error: any) => void
}

export const AppleLoginButton = ({ onError }: AppleLoginButtonProps) => {
  const { t } = useI18n()
  const onAppleSignIn = async () => {
    const result = await handleAppleSignIn()
    if (result.success) {
      console.log('result.data', result.data)
    } else {
      onError?.(result.error)
    }
  }
  return (
    <TouchableOpacity
      className="h-12 w-96 flex-row items-center justify-center rounded-full bg-black"
      onPress={onAppleSignIn}
      activeOpacity={0.8}
    >
      <View className="absolute left-4 h-full justify-center"></View>
      <Typography className="text-base font-medium text-white">
        {t('auth.appleLogin')}
      </Typography>
    </TouchableOpacity>
  )
}

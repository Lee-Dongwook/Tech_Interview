import { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'
import { supabase } from 'app/utils/supabase'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'app/api/common/axiosInstance'

export default function Index() {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setIsLoading(false)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Typography>{t('common.loading')}</Typography>
      </View>
    )
  }

  if (!session) {
    return <Login />
  }

  return <Redirect href="/(tabs)/(monitoring)" />
}

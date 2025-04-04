import { Stack } from 'expo-router'
import {
  SafeAreaView,
  StyleSheet,
  AppState,
  Linking,
  Alert,
} from 'react-native'
import '../global.css'
import * as Notifications from 'expo-notifications'

import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import Constants from 'expo-constants'

export default function Root() {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
          <Stack.Screen
            name="camera-screen"
            options={{
              gestureEnabled: false,
            }}
          />
        </Stack>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

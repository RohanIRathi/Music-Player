import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState.tsx'
import { useTrackPlayerSetup } from '@/hooks/useTrackPlayerSetup.tsx'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

const App = () => {
	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])

	useTrackPlayerSetup({
		onLoad: handleTrackPlayerLoaded,
	})

	useLogTrackPlayerState()

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<RootNavigation />
				<StatusBar style="auto" />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}

const RootNavigation = () => {
	return (
		<Stack style={{ flex: 1, backgroundColor: 'transparent' }}>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="player"
				options={{
					presentation: 'transparentModal',
					animation: 'slide_from_bottom',
					gestureDirection: 'vertical',
					headerShown: false,
					contentStyle: { backgroundColor: 'transparent' },
				}}
			/>
		</Stack>
	)
}

export default App

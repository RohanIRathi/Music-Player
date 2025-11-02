import { colors, fontSize } from '@/constants/tokens.ts'
import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState.tsx'
import { useTrackPlayerSetup } from '@/hooks/useTrackPlayerSetup.tsx'
import store from '@/stores/store.tsx'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MenuProvider } from 'react-native-popup-menu'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

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
		<MenuProvider>
			<SafeAreaProvider>
				<Provider store={store}>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<RootNavigation />
						<StatusBar style="auto" />
					</GestureHandlerRootView>
				</Provider>
			</SafeAreaProvider>
		</MenuProvider>
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
			<Stack.Screen
				name="(modals)/addToPlaylist"
				options={{
					presentation: 'modal',
					animation: 'slide_from_bottom',
					gestureDirection: 'vertical',
					headerTitle: '',
					headerBackButtonDisplayMode: 'default',
					headerStyle: { backgroundColor: colors.background },
					headerBackTitleStyle: {
						color: colors.text,
						fontSize: fontSize.xl,
						fontWeight: '600',
					},
					headerTintColor: colors.primary,
					contentStyle: { backgroundColor: colors.background },
				}}
			/>
		</Stack>
	)
}

export default App

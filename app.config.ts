import { ConfigContext, ExpoConfig } from '@expo/config'
import 'tsx/cjs'

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: 'Music Player',
	slug: 'Music-Player',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/images/icon.png',
	scheme: 'music-player',
	userInterfaceStyle: 'dark',
	newArchEnabled: true,
	ios: {
		supportsTablet: true,
	},
	android: {
		adaptiveIcon: {
			backgroundColor: '#000000',
			foregroundImage: './assets/images/android-icon-foreground.png',
			backgroundImage: './assets/images/android-icon-background.png',
			monochromeImage: './assets/images/android-icon-monochrome.png',
		},
		edgeToEdgeEnabled: true,
		predictiveBackGestureEnabled: false,
		package: 'com.rohanirathi.MusicPlayer',
	},
	web: {
		bundler: 'metro',
		output: 'static',
		favicon: './assets/images/favicon.png',
	},
	plugins: [
		'expo-router',
		[
			'expo-splash-screen',
			{
				image: './assets/images/splash-icon.png',
				imageWidth: 200,
				resizeMode: 'contain',
				backgroundColor: '#ffffff',
				dark: {
					backgroundColor: '#000000',
				},
			},
		],
		[
			'./plugins/withAndroidDrawables',
			{
				drawableFiles: [
					'./assets/images/star.xml',
					'./assets/images/star_border.xml',
					'./assets/images/playlist_add.xml',
				],
			},
		],
	],
	experiments: {
		typedRoutes: true,
		reactCompiler: true,
		tsconfigPaths: true,
	},
	extra: {
		router: {},
		eas: {
			projectId: '2dde0e24-1667-49e6-8b3a-dc3f0bef98f0',
		},
	},
})

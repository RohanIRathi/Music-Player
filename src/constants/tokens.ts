import { ThemeProp } from 'react-native-paper/lib/typescript/types.ts'

export const colors = {
	primary: '#fc3c44',
	background: '#000',
	text: '#fff',
	textMuted: '#9ca3af',
	icon: '#fff',
	maximumTrackTintColor: 'rgba(255,255,255,0.4)',
	minimumTrackTintColor: 'rgba(255,255,255,0.6)',
	tabBarColor: 'rgba(0,0,0,0.7)',
	searchBarBackground: 'rgba(30,30,30,0.9)',
}

export const fontSize = {
	xs: 12,
	sm: 16,
	md: 20,
	lg: 24,
	xl: 28,
}

export const screenPadding = {
	horizontal: 24,
}

export const searchBarThemes: ThemeProp = {
	colors: {
		onSurface: colors.textMuted,
		outline: colors.textMuted,
		primary: colors.maximumTrackTintColor,
		onSurfaceVariant: colors.textMuted,
		elevation: {
			level3: colors.searchBarBackground,
		},
	},
}

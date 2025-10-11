import { colors, fontSize } from '@/constants/tokens'
import { StyleSheet } from 'react-native'

const defaultStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	text: {
		fontSize: fontSize.md,
		color: colors.text,
	},
})

export const utilStyles = StyleSheet.create({
	itemSeparator: {
		borderColor: colors.textMuted,
		borderWidth: StyleSheet.hairlineWidth,
		opacity: 0.45,
	},
})

export const trackStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingVertical: 5,
	},
	artworkImage: {
		borderRadius: 8,
		height: 70,
		width: 70,
	},
	title: {
		...defaultStyles.text,
		fontWeight: '600',
		maxWidth: '90%',
	},
	artist: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		color: colors.textMuted,
		marginTop: 4,
	},
})

export default defaultStyles

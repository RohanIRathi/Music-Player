import { colors, fontSize } from '@/constants/tokens.ts'
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
	searchBar: {
		borderColor: colors.textMuted,
		borderWidth: 1,
		borderRadius: 10,
		marginVertical: 5,
		marginHorizontal: 5,
	},
	emptyContentText: {
		borderColor: colors.textMuted,
		borderWidth: StyleSheet.hairlineWidth,
		opacity: 0.5,
		color: colors.text,
		fontSize: fontSize.xl,
		textAlign: 'center',
		marginTop: 20,
		padding: 25,
		borderLeftWidth: 0,
		borderRightWidth: 0,
	},
	emptyContentImage: {
		width: 200,
		height: 200,
		alignSelf: 'center',
		marginTop: 20,
		opacity: 0.5,
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
	activeTrackArtworkImage: {
		borderRadius: 8,
		height: 40,
		width: 40,
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
	floatingPlayer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	floatingPlayerTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	controlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
	},
	floatingPlayerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.searchBarBackground,
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
	},
	trackPlayingIconIndicator: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: 70,
		height: 70,
		alignSelf: 'center',
		opacity: 0.7,
	},
})

export default defaultStyles

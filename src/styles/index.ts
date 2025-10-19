import { colors, fontSize, screenPadding } from '@/constants/tokens.ts'
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
	centeredRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	slider: {
		height: 7,
		borderRadius: 16,
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

export const playerStyles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: 'transparent',
	},
	artworkImageContainer: {
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.44,
		shadowRadius: 11.0,
		flexDirection: 'row',
		justifyContent: 'center',
		height: '45%',
	},
	artworkImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.xl,
		fontWeight: '700',
	},
	trackArtistText: {
		...defaultStyles.text,
		fontSize: fontSize.md,
		opacity: 0.8,
		maxWidth: '90%',
	},
})

export const playerControlsStyles = StyleSheet.create({
	container: {
		width: '100%',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	timeText: {
		...defaultStyles.text,
		color: colors.text,
		opacity: 0.75,
		fontSize: fontSize.xs,
		letterSpacing: 0.7,
		fontWeight: '500',
	},
	timeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		marginTop: 20,
	},
})

export default defaultStyles

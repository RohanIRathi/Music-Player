import { colors } from '@/constants/tokens.ts'
import { playerControlsStyles } from '@/styles/index.ts'
import { FontAwesome6 } from '@expo/vector-icons'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import LoaderKitView from 'react-native-loader-kit'
import TrackPlayer, { State, useIsPlaying, usePlaybackState } from 'react-native-track-player'

interface PlayerControlsProps {
	style?: ViewStyle
}

interface PlayerButtonProps {
	style?: ViewStyle
	iconSize?: number
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
	return (
		<View style={[playerControlsStyles.container, style]}>
			<View style={[playerControlsStyles.row]}>
				<SkipToPreviousButton />
				<PlayPauseButton iconSize={35} />
				<SkipToNextButton />
			</View>
		</View>
	)
}

export const PlayPauseButton = ({ style, iconSize }: PlayerButtonProps) => {
	const { playing } = useIsPlaying()
	const playbackState = usePlaybackState()
	console.log(playbackState)

	if (playbackState.state === State.Buffering || playbackState === State.Loading)
		return (
			<LoaderKitView
				name={'BallScaleRippleMultiple'}
				style={{ height: (iconSize ?? 30) * 1.3, width: (iconSize ?? 30) * 1.3 }}
				color={colors.text}
			/>
		)

	if (playbackState.state === State.Error) {
		TrackPlayer.skipToNext()
	}

	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity
				activeOpacity={0.9}
				onPress={playing ? TrackPlayer.pause : TrackPlayer.play}>
				<FontAwesome6
					name={playing ? 'pause' : 'play'}
					size={iconSize}
					color={colors.text}
				/>
			</TouchableOpacity>
		</View>
	)
}

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={() => TrackPlayer.skipToNext()}>
			<FontAwesome6 name="forward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={() => TrackPlayer.skipToPrevious()}>
			<FontAwesome6 name="backward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

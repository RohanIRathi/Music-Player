import { colors } from '@/constants/tokens.ts'
import { playerControlsStyles } from '@/styles/index.ts'
import { FontAwesome6 } from '@expo/vector-icons'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'

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
				<SkipToPreviousButton iconSize={40} />
				<PlayPauseButton iconSize={40} />
				<SkipToNextButton iconSize={40} />
			</View>
		</View>
	)
}

export const PlayPauseButton = ({ style, iconSize }: PlayerButtonProps) => {
	const { playing } = useIsPlaying()

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

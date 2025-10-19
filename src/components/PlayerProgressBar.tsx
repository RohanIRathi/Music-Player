import { colors } from '@/constants/tokens.ts'
import { playerControlsStyles, utilStyles } from '@/styles/index.ts'
import { formatSecondsToMinutes } from '@/utils/misc.ts'
import { Text, View, ViewProps } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import TrackPlayer, { useProgress } from 'react-native-track-player'

const PlayerProgressBar = ({ style }: ViewProps) => {
	const { duration, position } = useProgress(250)
	const isSliding = useSharedValue(false)
	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	const trackElapsedTime = formatSecondsToMinutes(position)
	const trackRemainingTime = formatSecondsToMinutes(duration - position)

	if (!isSliding.value) {
		progress.value = duration > 0 ? position / duration : 0
	}

	return (
		<View style={style}>
			<Slider
				progress={progress}
				minimumValue={min}
				maximumValue={max}
				theme={{
					maximumTrackTintColor: colors.maximumTrackTintColor,
					minimumTrackTintColor: colors.minimumTrackTintColor,
				}}
				containerStyle={utilStyles.slider}
				thumbWidth={0}
				renderBubble={() => null}
				onSlidingStart={() => (isSliding.value = true)}
				onSlidingComplete={async (value) => {
					if (!isSliding.value) return
					isSliding.value = false
					await TrackPlayer.seekTo(value * duration)
				}}
				onValueChange={async (value) => {
					await TrackPlayer.seekTo(value * duration)
				}}
			/>
			<View style={playerControlsStyles.timeRow}>
				<Text style={playerControlsStyles.timeText}>{trackElapsedTime}</Text>
				<Text style={playerControlsStyles.timeText}>
					{'-'}
					{trackRemainingTime}
				</Text>
			</View>
		</View>
	)
}

export default PlayerProgressBar

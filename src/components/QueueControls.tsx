import { colors } from '@/constants/tokens.ts'
import { queueControlsStyle } from '@/styles/index.ts'
import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View, ViewProps } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'

interface QueueControlsProps extends ViewProps {
	tracks: Track[]
}

const QueueControls = ({ tracks, style, ...viewProps }: QueueControlsProps) => {
	const handlePlay = async () => {
		await TrackPlayer.setQueue(tracks)
		await TrackPlayer.play()
	}

	const handleShufflePlay = async () => {
		const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5)

		await TrackPlayer.setQueue(shuffledTracks)
		await TrackPlayer.play()
	}

	return (
		<View style={[{ flexDirection: 'row', columnGap: 16 }, style]} {...viewProps}>
			{/* Play Button */}
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					onPress={handlePlay}
					activeOpacity={0.8}
					style={queueControlsStyle.button}>
					<Ionicons name="play" size={22} color={colors.primary} />
					<Text style={queueControlsStyle.buttonText}>Play</Text>
				</TouchableOpacity>
			</View>
			{/* Shuffle Button */}
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					onPress={handleShufflePlay}
					activeOpacity={0.8}
					style={queueControlsStyle.button}>
					<Ionicons name="shuffle-sharp" size={22} color={colors.primary} />
					<Text style={queueControlsStyle.buttonText}>Shuffle</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default QueueControls

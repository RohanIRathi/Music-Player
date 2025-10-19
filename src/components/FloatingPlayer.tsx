import { unknownTrackImageUri } from '@/constants/images.ts'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack.tsx'
import { trackStyles } from '@/styles/index.ts'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { useActiveTrack } from 'react-native-track-player'
import MovingText from './MovingText.tsx'
import { PlayPauseButton, SkipToNextButton } from './PlayerControls.tsx'

const FloatingPlayer = () => {
	const router = useRouter()
	const activeTrack = useActiveTrack()
	const lastActiveTrack = useLastActiveTrack()

	const displayedTrack = activeTrack ?? lastActiveTrack

	if (!displayedTrack) return null

	const handlePress = () => {
		router.push('/player')
	}

	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.9}
			style={trackStyles.floatingPlayerContainer}>
			<>
				<Image
					source={{
						uri: displayedTrack.artwork ?? unknownTrackImageUri,
					}}
					style={trackStyles.activeTrackArtworkImage}
				/>
				<View style={trackStyles.floatingPlayer}>
					<MovingText
						style={trackStyles.floatingPlayerTitle}
						text={displayedTrack.title}
						animationThreshold={25}></MovingText>
				</View>
				<View style={trackStyles.controlsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>
			</>
		</TouchableOpacity>
	)
}

export default FloatingPlayer

import { useEffect, useRef } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

const setupPlayer = async () => {
	try {
		const currentState = await TrackPlayer.getPlaybackState()
	} catch {
		await TrackPlayer.setupPlayer({
			maxCacheSize: 1024 * 10,
		})

		await TrackPlayer.setVolume(0.4)
		await TrackPlayer.setRepeatMode(RepeatMode.Off)
	}
}

export const useTrackPlayerSetup = ({ onLoad }: { onLoad?: () => void }) => {
	const isInitialized = useRef(false)
	useEffect(() => {
		setupPlayer()
			.then(() => {
				isInitialized.current = true
				onLoad?.()
			})
			.catch((error) => {
				isInitialized.current = false
				console.error(error)
			})
	}, [onLoad])
}

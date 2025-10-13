import { Event, useTrackPlayerEvents } from 'react-native-track-player'

const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackActiveTrackChanged]

export const useLogTrackPlayerState = () => {
	useTrackPlayerEvents(events, async (event) => {
		if (event.type == Event.PlaybackError) console.warn('An error occurred: ', event.error)
		else if (event.type == Event.PlaybackState) console.log('Playback State: ', event.state)
		else console.log('Track changed: ', event.index)
	})
}

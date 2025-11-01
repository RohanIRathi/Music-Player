import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks.ts'
import { toggleTrackFavorite } from '@/stores/slices/librarySlice.tsx'
import { useQueue } from '@/stores/slices/queueSlice.tsx'
import { MenuView } from '@react-native-menu/menu'
import { useRouter } from 'expo-router'
import { PropsWithChildren } from 'react'
import TrackPlayer, { Track } from 'react-native-track-player'
import { match } from 'ts-pattern'

interface TrackShortcutsMenuProps extends PropsWithChildren<{ track: Track }> {}

const TrackShortcutsMenu = ({ track, children }: TrackShortcutsMenuProps) => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const isFavorite = track.rating === 1

	const activeQueueId = useAppSelector(useQueue)

	const handlePressAction = (id: string) => {
		match(id)
			.with('add-to-favorites', async () => {
				dispatch.call(toggleTrackFavorite, track)
				if (activeQueueId?.startsWith('favorites')) {
					await TrackPlayer.add(track)
				}
			})
			.with('remove-from-favorites', async () => {
				dispatch.call(toggleTrackFavorite, track)

				if (activeQueueId?.startsWith('favorites')) {
					const queue = await TrackPlayer.getQueue()

					const trackToRemove = queue.findIndex(
						(queueTrack: Track) => queueTrack.url === track.url
					)

					await TrackPlayer.remove(trackToRemove)
				}
			})
			.with('add-to-playlist', async () => {
				router.push({ pathname: '(modals)/addToPlaylist', params: { trackUrl: track.url } })
			})
			.otherwise(() => console.warn('Unknown menu action: ', id))
	}

	return (
		<MenuView
			onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
			actions={[
				{
					id: isFavorite ? 'remove-from-favorites' : 'add-to-favorites',
					title: isFavorite ? 'Remove from favorites' : 'Add to favorites',
					image: isFavorite ? 'star.fill' : 'star',
				},
				{ id: 'add-to-playlist', title: 'Add to playlist', image: 'plus' },
			]}>
			{children}
		</MenuView>
	)
}

export default TrackShortcutsMenu

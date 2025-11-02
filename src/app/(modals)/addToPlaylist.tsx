import PlaylistsList from '@/components/PlaylistsList.tsx'
import { screenPadding } from '@/constants/tokens.ts'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks.ts'
import { addToPlaylist, usePlaylists, useTracks } from '@/stores/slices/librarySlice.tsx'
import { useQueue } from '@/stores/slices/queueSlice.tsx'
import defaultStyles from '@/styles/index.ts'
import { Playlist } from '@/utils/types.ts'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
// @ts-expect-error
import TrackPlayer, { Track } from 'react-native-track-player'

const AddToPlaylist = () => {
	const router = useRouter()
	const { trackUrl } = useLocalSearchParams<{ trackUrl: Track['url'] }>()
	const tracks = useAppSelector(useTracks)
	const playlists = useAppSelector(usePlaylists)
	const activeQueueId = useAppSelector(useQueue)
	const dispatch = useAppDispatch()

	const track = tracks.find((currentTrack) => currentTrack.url === trackUrl)

	if (!track) return null

	const availablePlaylists = playlists.filter(
		(playlist) => !playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url)
	)

	const handlePlaylistPress = async (playlist: Playlist) => {
		dispatch(addToPlaylist({ track, playlist: playlist.name }))
		router.dismiss()

		if (activeQueueId?.startsWith(playlist.name)) await TrackPlayer.add(track)
	}

	return (
		<SafeAreaView
			style={[
				defaultStyles.container,
				{ height: '100%', paddingHorizontal: screenPadding.horizontal, paddingTop: -50 },
			]}>
			<PlaylistsList playlists={availablePlaylists} onPlaylistPress={handlePlaylistPress} />
		</SafeAreaView>
	)
}

export default AddToPlaylist

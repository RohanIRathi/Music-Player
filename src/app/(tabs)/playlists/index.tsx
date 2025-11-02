import PlaylistsList from '@/components/PlaylistsList.tsx'
import { screenPadding } from '@/constants/tokens.ts'
import { useAppSelector } from '@/hooks/useReduxHooks.ts'
import { usePlaylists } from '@/stores/slices/librarySlice.tsx'
import defaultStyles from '@/styles/index.ts'
import { Playlist } from '@/utils/types.ts'
import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, View } from 'react-native'

const PlaylistsScreen = () => {
	const router = useRouter()
	const playlists = useAppSelector(usePlaylists)

	const handlePlaylistPress = (playlist: Playlist) => {
		router.push(`/(tabs)/playlists/${playlist.name}`)
	}

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}>
				<PlaylistsList
					scrollEnabled={false}
					playlists={playlists}
					onPlaylistPress={handlePlaylistPress}
				/>
			</ScrollView>
		</View>
	)
}

export default PlaylistsScreen

import PlaylistsList from '@/components/PlaylistsList.tsx'
import { fontSize, screenPadding, searchBarThemes } from '@/constants/tokens.ts'
import { useAppSelector } from '@/hooks/useReduxHooks.ts'
import { usePlaylists } from '@/stores/slices/librarySlice.tsx'
import defaultStyles, { utilStyles } from '@/styles/index.ts'
import { playlistNameFilter } from '@/utils/filters.ts'
import { Playlist } from '@/utils/types.ts'
import { useRouter } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Searchbar } from 'react-native-paper'

const PlaylistsScreen = () => {
	const router = useRouter()
	const playlists = useAppSelector(usePlaylists)
	const [search, setSearch] = useState('')

	const filteredPlaylists = useMemo(() => {
		if (!search) return playlists

		return playlists.filter(playlistNameFilter(search))
	}, [search, playlists])

	const handlePlaylistPress = (playlist: Playlist) => {
		router.push(`/(tabs)/playlists/${playlist.name}`)
	}

	return (
		<View style={defaultStyles.container}>
			<Searchbar
				placeholder="Find in Playlists"
				onChangeText={setSearch}
				value={search}
				theme={searchBarThemes}
				style={utilStyles.searchBar}
				inputStyle={{
					fontSize: fontSize.lg,
				}}
			/>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}>
				<PlaylistsList
					scrollEnabled={false}
					playlists={filteredPlaylists}
					onPlaylistPress={handlePlaylistPress}
				/>
			</ScrollView>
		</View>
	)
}

export default PlaylistsScreen

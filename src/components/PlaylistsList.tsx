import { unknownTrackImageUri } from '@/constants/images.ts'
import { fontSize, searchBarThemes } from '@/constants/tokens.ts'
import defaultStyles, { utilStyles } from '@/styles/index.ts'
import { playlistNameFilter } from '@/utils/filters.ts'
import { Playlist } from '@/utils/types.ts'
import { Image } from 'expo-image'
import React, { useMemo, useState } from 'react'
import { FlatList, FlatListProps, ListRenderItem, Text, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import PlaylistListItem from './PlaylistListItem.tsx'

interface PlaylistsListProps extends Partial<FlatListProps<Playlist>> {
	playlists: Playlist[]
	onPlaylistPress: (playlist: Playlist) => void
}

const ItemDivider = () => (
	<View style={{ ...utilStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }} />
)

const PlaylistsList = ({ playlists, onPlaylistPress, ...flatListProps }: PlaylistsListProps) => {
	const [search, setSearch] = useState('')
	const filteredPlaylists = useMemo(() => {
		if (!search) return playlists

		return playlists.filter(playlistNameFilter(search))
	}, [search, playlists])

	const renderItem: ListRenderItem<Playlist> = ({ item: playlist }) => {
		return <PlaylistListItem playlist={playlist} onPress={() => onPlaylistPress(playlist)} />
	}

	return (
		<View style={{ height: '100%' }}>
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
			<FlatList
				contentContainerStyle={[
					defaultStyles.container,
					{ paddingTop: 10, paddingBottom: 120 },
				]}
				ItemSeparatorComponent={ItemDivider}
				ListFooterComponent={ItemDivider}
				ListEmptyComponent={
					<View>
						<Text style={utilStyles.emptyContentText}>No Playlist Foud.</Text>
						<Image
							source={{ uri: unknownTrackImageUri }}
							priority={'normal'}
							style={utilStyles.emptyContentImage}
						/>
					</View>
				}
				data={filteredPlaylists}
				renderItem={renderItem}
				{...flatListProps}
			/>
		</View>
	)
}

export default PlaylistsList

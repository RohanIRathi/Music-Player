import { unknownTrackImageUri } from '@/constants/images.ts'
import { utilStyles } from '@/styles/index.ts'
import { Playlist } from '@/utils/types.ts'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Image } from 'expo-image'
import React from 'react'
import { FlatList, FlatListProps, ListRenderItem, Text, View } from 'react-native'
import PlaylistListItem from './PlaylistListItem.tsx'

interface PlaylistsListProps extends Partial<FlatListProps<Playlist>> {
	playlists: Playlist[]
	onPlaylistPress: (playlist: Playlist) => void
}

const ItemDivider = () => (
	<View style={{ ...utilStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }} />
)

const PlaylistsList = ({ playlists, onPlaylistPress, ...flatListProps }: PlaylistsListProps) => {
	const tabBarHeight = useBottomTabBarHeight() + 80

	const renderItem: ListRenderItem<Playlist> = ({ item: playlist }) => {
		return <PlaylistListItem playlist={playlist} onPress={() => onPlaylistPress(playlist)} />
	}

	return (
		<FlatList
			contentContainerStyle={{ paddingTop: 10, paddingBottom: tabBarHeight }}
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
			data={playlists}
			renderItem={renderItem}
			{...flatListProps}
		/>
	)
}

export default PlaylistsList

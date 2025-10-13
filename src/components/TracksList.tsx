import { unknownTrackImageUri } from '@/constants/images.ts'
import { utilStyles } from '@/styles/index.ts'
import { Image } from 'expo-image'
import { FlatList, FlatListProps, ListRenderItem, Text, View } from 'react-native'
import { default as Track, default as TrackPlayer } from 'react-native-track-player'
import TrackListItem from './TrackListItem.tsx'

export interface TracksListProps extends Partial<FlatListProps<Track>> {
	tracks: Track[]
}

const ItemDivider = () => (
	<View
		style={{ ...utilStyles.itemSeparator, marginVertical: 5, marginLeft: 80, marginRight: 20 }}
	/>
)

const handleTrackSelect = async (track: Track) => {
	await TrackPlayer.reset()
	await TrackPlayer.add([track])
	await TrackPlayer.skip(0)
	await TrackPlayer.play()
}

const renderItem: ListRenderItem<Track> = ({ item: track }) => (
	<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
)

const TracksList = ({ ...flatListProps }: TracksListProps) => {
	return (
		<FlatList<Track>
			data={flatListProps.tracks}
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Image source={unknownTrackImageUri} style={utilStyles.emptyContentImage} />
					<Text style={utilStyles.emptyContentText}>No Songs Found.</Text>
				</View>
			}
			renderItem={renderItem}
			{...flatListProps}
		/>
	)
}

export default TracksList

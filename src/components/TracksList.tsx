import library from '@/assets/data/library.json'
import { utilStyles } from '@/styles'
import { FlatList, FlatListProps, View } from 'react-native'
import TrackListItem from './TrackListItem'

export interface TracksListProps extends Partial<FlatListProps<unknown>> {}

const ItemDivider = () => (
	<View
		style={{ ...utilStyles.itemSeparator, marginVertical: 5, marginLeft: 80, marginRight: 20 }}
	/>
)

const TracksList = ({ ...flatListProps }: TracksListProps) => {
	return (
		<FlatList
			data={library}
			ItemSeparatorComponent={<ItemDivider />}
			renderItem={({ item: track }) => (
				<TrackListItem title={track.title} image={track.artwork} artist={track.artist} />
			)}
			{...flatListProps}
		/>
	)
}

export default TracksList

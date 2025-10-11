import { utilStyles } from '@/styles/index.ts'
import { FlatList, FlatListProps, ListRenderItem, View } from 'react-native'
import TrackListItem, { TrackListItemProps } from './TrackListItem.tsx'

export interface TracksListProps extends Partial<FlatListProps<TrackListItemProps>> {
	tracks: TrackListItemProps[]
}

const ItemDivider = () => (
	<View
		style={{ ...utilStyles.itemSeparator, marginVertical: 5, marginLeft: 80, marginRight: 20 }}
	/>
)

const renderItem: ListRenderItem<TrackListItemProps> = ({ item: track }) => (
	<TrackListItem {...track} />
)

const TracksList = ({ ...flatListProps }: TracksListProps) => {
	return (
		<FlatList<TrackListItemProps>
			data={flatListProps.tracks}
			ItemSeparatorComponent={ItemDivider}
			renderItem={renderItem}
			{...flatListProps}
		/>
	)
}

export default TracksList

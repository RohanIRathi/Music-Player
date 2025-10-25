import { unknownTrackImageUri } from '@/constants/images.ts'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks.ts'
import { setActiveQueueId, useQueue } from '@/stores/slices/queueSlice.tsx'
import { utilStyles } from '@/styles/index.ts'
import { Image } from 'expo-image'
import { useRef } from 'react'
import { FlatList, FlatListProps, ListRenderItem, Text, View } from 'react-native'
import { default as Track, default as TrackPlayer } from 'react-native-track-player'
import TrackListItem from './TrackListItem.tsx'

export interface TracksListProps extends Partial<FlatListProps<Track>> {
	id: string
	tracks: Track[]
}

const ItemDivider = () => (
	<View
		style={{ ...utilStyles.itemSeparator, marginVertical: 5, marginLeft: 80, marginRight: 20 }}
	/>
)

const TracksList = ({ id, tracks, ...flatListProps }: TracksListProps) => {
	const queueOffset = useRef(0)
	const activeQueueId = useAppSelector(useQueue)
	const dispatch = useAppDispatch()

	const handleTrackSelect = async (selectedTrack: Track) => {
		const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)
		if (trackIndex === -1) return

		if (id !== activeQueueId) {
			const beforeTracks = tracks.slice(0, trackIndex)
			const afterTracks = tracks.slice(trackIndex + 1)

			await TrackPlayer.reset()
			await TrackPlayer.add(selectedTrack)
			await TrackPlayer.add(afterTracks)
			await TrackPlayer.add(beforeTracks)
			await TrackPlayer.skip(0)
			await TrackPlayer.play()

			queueOffset.current = trackIndex
			dispatch(setActiveQueueId(id))
		} else {
			const nextTrackIndex =
				trackIndex - queueOffset.current < 0
					? tracks.length + trackIndex - queueOffset.current
					: trackIndex - queueOffset.current

			await TrackPlayer.skip(nextTrackIndex)
			await TrackPlayer.play()
		}
	}

	const renderItem: ListRenderItem<Track> = ({ item: track }) => (
		<TrackListItem track={track} onTrackSelect={handleTrackSelect} />
	)

	return (
		<FlatList<Track>
			data={tracks}
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

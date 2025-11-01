import { fontSize, searchBarThemes } from '@/constants/tokens.ts'
import { playlistStyles, utilStyles } from '@/styles/index.ts'
import { trackTitleFilter } from '@/utils/filters.ts'
import { generateTracksListId } from '@/utils/misc.ts'
import { Playlist } from '@/utils/types.ts'
import { Image } from 'expo-image'
import { useMemo, useState } from 'react'
import { Text, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import QueueControls from './QueueControls.tsx'
import TracksList from './TracksList.tsx'

const PlaylistTracksList = ({ playlist }: { playlist: Playlist }) => {
	const [search, setSearch] = useState('')

	const filteredPlaylistTracks = useMemo(() => {
		if (!search) return playlist.tracks

		return playlist.tracks.filter(trackTitleFilter(search))
	}, [search, playlist.tracks])

	return (
		<>
			<Searchbar
				placeholder={`Find Tracks in ${playlist.name}`}
				onChangeText={setSearch}
				value={search}
				theme={searchBarThemes}
				style={utilStyles.searchBar}
				inputStyle={{
					fontSize: fontSize.md,
				}}
			/>
			<TracksList
				id={generateTracksListId(playlist.name, search)}
				scrollEnabled={false}
				tracks={filteredPlaylistTracks}
				hideQueueControls={true}
				ListHeaderComponentStyle={playlistStyles.playlistHeaderContainer}
				ListHeaderComponent={
					<View>
						<View style={playlistStyles.artworkImageContainer}>
							<Image
								style={[playlistStyles.artworkImage]}
								source={{ uri: playlist.artworkPreview }}
								priority={'high'}
							/>
						</View>
						<Text
							numberOfLines={1}
							style={[
								playlistStyles.playlistNameText,
								{
									marginTop: 22,
									fontWeight: '800',
									textAlign: 'center',
									maxWidth: '100%',
									width: '100%',
								},
							]}>
							{playlist.name}
						</Text>

						{search.length === 0 && (
							<QueueControls
								tracks={filteredPlaylistTracks}
								style={{ paddingTop: 24 }}
							/>
						)}
					</View>
				}
			/>
		</>
	)
}

export default PlaylistTracksList

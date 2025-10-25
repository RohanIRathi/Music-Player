import { unknownArtistImageUri } from '@/constants/images.ts'
import { fontSize, searchBarThemes } from '@/constants/tokens.ts'
import { artistStyles, utilStyles } from '@/styles/index.ts'
import { trackTitleFilter } from '@/utils/filters.ts'
import { generateTracksListId } from '@/utils/misc.ts'
import { Artist } from '@/utils/types.ts'
import { Image } from 'expo-image'
import { useMemo, useState } from 'react'
import { Text, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import QueueControls from './QueueControls.tsx'
import TracksList from './TracksList.tsx'

const ArtistTracksList = ({ artist }: { artist: Artist }) => {
	const [search, setSearch] = useState('')

	const filteredArtistTracks = useMemo(() => {
		if (!search) return artist.tracks

		return artist.tracks.filter(trackTitleFilter(search))
	}, [search, artist.tracks])

	return (
		<>
			<Searchbar
				placeholder={`Find Tracks by ${artist.name}`}
				onChangeText={setSearch}
				value={search}
				theme={searchBarThemes}
				style={utilStyles.searchBar}
				inputStyle={{
					fontSize: fontSize.lg,
				}}
			/>
			<TracksList
				id={generateTracksListId(artist.name, search)}
				scrollEnabled={false}
				tracks={filteredArtistTracks}
				hideQueueControls={true}
				ListHeaderComponentStyle={artistStyles.artistHeaderContainer}
				ListHeaderComponent={
					<View>
						<View style={artistStyles.artistImageContainer}>
							<Image
								style={[
									artistStyles.artistImage,
									{
										width: 200,
										height: 200,
										resizeMode: 'cover',
										borderRadius: 200,
									},
								]}
								source={{ uri: unknownArtistImageUri }}
								priority={'high'}
							/>
						</View>
						<Text
							numberOfLines={1}
							style={[
								artistStyles.artistNameText,
								{
									marginTop: 22,
									fontWeight: '800',
									textAlign: 'center',
									maxWidth: '100%',
									width: '100%',
								},
							]}>
							{artist.name}
						</Text>

						{search.length === 0 && (
							<QueueControls
								tracks={filteredArtistTracks}
								style={{ paddingTop: 24 }}
							/>
						)}
					</View>
				}
			/>
		</>
	)
}

export default ArtistTracksList

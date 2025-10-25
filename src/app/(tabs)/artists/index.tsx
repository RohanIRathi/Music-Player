import ArtistListItem from '@/components/ArtistListItem.tsx'
import { unknownArtistImageUri } from '@/constants/images.ts'
import { fontSize, screenPadding, searchBarThemes } from '@/constants/tokens.ts'
import { useAppSelector } from '@/hooks/useReduxHooks.ts'
import { useArtists } from '@/stores/slices/librarySlice.tsx'
import defaultStyles, { utilStyles } from '@/styles/index.ts'
import { artistNameFilter } from '@/utils/filters.ts'
import { Artist } from '@/utils/types.ts'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Image } from 'expo-image'
import { useMemo, useState } from 'react'
import { FlatList, ListRenderItem, ScrollView, Text, View } from 'react-native'
import { Searchbar } from 'react-native-paper'

const ItemSeparatorComponent = () => {
	return <View style={[utilStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />
}

const ArtistsScreen = () => {
	const tabBarHeight = useBottomTabBarHeight() + 80
	const artists = useAppSelector(useArtists)
	const [search, setSearch] = useState('')

	const filteredArtists = useMemo(() => {
		if (!search) return artists

		return artists.filter(artistNameFilter(search))
	}, [search, artists])

	const renderItem: ListRenderItem<Artist> = ({ item: artist }) => {
		return <ArtistListItem artist={artist} />
	}

	return (
		<View style={defaultStyles.container}>
			<Searchbar
				placeholder="Find Artists"
				onChangeText={setSearch}
				value={search}
				theme={searchBarThemes}
				style={utilStyles.searchBar}
				inputStyle={{
					fontSize: fontSize.lg,
				}}
			/>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic">
				<FlatList
					contentContainerStyle={{ paddingTop: 10, paddingBottom: tabBarHeight }}
					data={filteredArtists}
					scrollEnabled={false}
					ItemSeparatorComponent={ItemSeparatorComponent}
					ListFooterComponent={ItemSeparatorComponent}
					ListEmptyComponent={
						<View>
							<Text style={utilStyles.emptyContentText}>No Artist Found</Text>
							<Image
								source={{ uri: unknownArtistImageUri }}
								priority={'normal'}
								style={utilStyles.emptyContentImage}
							/>
						</View>
					}
					renderItem={renderItem}
				/>
			</ScrollView>
		</View>
	)
}

export default ArtistsScreen

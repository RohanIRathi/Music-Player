import TracksList from '@/components/TracksList.tsx'
import { fontSize, screenPadding, searchBarThemes } from '@/constants/tokens.ts'
import { useAppSelector } from '@/hooks/useReduxHooks.ts'
import { useFavorites } from '@/stores/slices/librarySlice.tsx'
import defaultStyles, { utilStyles } from '@/styles/index.ts'
import { trackTitleFilter } from '@/utils/filters.ts'
import { generateTracksListId } from '@/utils/misc.ts'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Searchbar } from 'react-native-paper'

const FavoritesScreen = () => {
	const favoriteTracks = useAppSelector(useFavorites)

	const tabHeight = useBottomTabBarHeight() + 85
	const [search, setSearch] = useState('')

	const filteredSongs = useMemo(() => {
		if (!search) return favoriteTracks

		return favoriteTracks.filter(trackTitleFilter(search))
	}, [search, favoriteTracks])

	return (
		<View style={defaultStyles.container}>
			<Searchbar
				placeholder="Find in Songs"
				onChangeText={setSearch}
				value={search}
				theme={searchBarThemes}
				style={utilStyles.searchBar}
				inputStyle={{
					fontSize: fontSize.lg,
				}}
			/>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal, paddingTop: 5 }}
				contentInsetAdjustmentBehavior="automatic"
				contentContainerStyle={{ flexGrow: 1, paddingBottom: tabHeight }}>
				<TracksList
					id={generateTracksListId('favorites', search)}
					scrollEnabled={false}
					tracks={filteredSongs}
				/>
			</ScrollView>
		</View>
	)
}

export default FavoritesScreen

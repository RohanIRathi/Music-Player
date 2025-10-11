import library from '@/assets/data/library.json'
import TracksList from '@/components/TracksList.tsx'
import { fontSize, screenPadding, searchBarThemes } from '@/constants/tokens.ts'
import defaultStyles, { utilStyles } from '@/styles/index.ts'
import { trackTitleFilter } from '@/utils/filters.ts'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Searchbar } from 'react-native-paper'

const SongsScreen = () => {
	const tabHeight = useBottomTabBarHeight() + 85
	const [search, setSearch] = useState('')

	const filteredSongs = useMemo(() => {
		if (!search) return library

		return library.filter(trackTitleFilter(search))
	}, [search])

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
				contentInsetAdjustmentBehavior="automatic"
				style={{
					paddingHorizontal: screenPadding.horizontal,
					paddingTop: 5,
				}}
				contentContainerStyle={{ flexGrow: 1, paddingBottom: tabHeight }}>
				<TracksList tracks={filteredSongs} scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen

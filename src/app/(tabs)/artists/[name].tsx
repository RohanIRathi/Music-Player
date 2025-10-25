import ArtistTracksList from '@/components/ArtistTracksList.tsx'
import { screenPadding } from '@/constants/tokens.ts'
import { useAppSelector } from '@/hooks/useReduxHooks.ts'
import { useArtists } from '@/stores/slices/librarySlice.tsx'
import defaultStyles from '@/styles/index.ts'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { ScrollView, View } from 'react-native'

const ArtistDetailScreen = () => {
	const tabBarHeight = useBottomTabBarHeight() + 80
	const { name: artistName } = useLocalSearchParams<{ name: string }>()

	const artists = useAppSelector(useArtists)

	const artist = artists.find((artist) => artist.name === artistName)

	if (!artist) {
		console.warn(`Artist ${artistName} not found!`)
		return <Redirect href={'/(tabs)/artists'} />
	}

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				contentContainerStyle={{ paddingBottom: tabBarHeight }}
				style={{ paddingHorizontal: screenPadding.horizontal }}>
				<ArtistTracksList artist={artist} />
			</ScrollView>
		</View>
	)
}

export default ArtistDetailScreen

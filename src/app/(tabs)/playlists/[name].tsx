import PlaylistTracksList from '@/components/PlaylistTracksList.tsx'
import { screenPadding } from '@/constants/tokens.ts'
import { useAppSelector } from '@/hooks/useReduxHooks.ts'
import { usePlaylists } from '@/stores/slices/librarySlice.tsx'
import defaultStyles from '@/styles/index.ts'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Redirect, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ScrollView, View } from 'react-native'

const PlaylistScreen = () => {
	const tabBarHeight = useBottomTabBarHeight() + 80
	const { name: playlistName } = useLocalSearchParams<{ name: string }>()

	const playlists = useAppSelector(usePlaylists)

	const playlist = playlists.find((playlist) => playlist.name === playlistName)

	if (!playlist) {
		console.warn(`Playlist ${playlistName} was not found`)

		return <Redirect href={'/(tabs)/playlists'} />
	}

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				contentContainerStyle={{ paddingBottom: tabBarHeight }}
				style={{ paddingHorizontal: screenPadding.horizontal }}>
				<PlaylistTracksList playlist={playlist} />
			</ScrollView>
		</View>
	)
}

export default PlaylistScreen

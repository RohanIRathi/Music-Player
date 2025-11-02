import { colors, fontSize } from '@/constants/tokens.ts'
import { useAppSelector } from '@/hooks/useReduxHooks.ts'
import { useTrackPlayerFavorite } from '@/hooks/useTrackPlayerFavorite.tsx'
import { useQueue } from '@/stores/slices/queueSlice.tsx'
import { menuStyles, utilStyles } from '@/styles/index.ts'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { PropsWithChildren } from 'react'
import { Text, View } from 'react-native'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
// @ts-expect-error
import TrackPlayer, { Track } from 'react-native-track-player'

interface TrackShortcutsMenuProps extends PropsWithChildren<{ track: Track }> {}

const TrackShortcutsMenu = ({ track, children }: TrackShortcutsMenuProps) => {
	const router = useRouter()
	const { isFavorite, toggleFavorite } = useTrackPlayerFavorite(track)
	const activeQueueId = useAppSelector(useQueue)

	const handleAddToFavorites = async () => {
		toggleFavorite()
		if (activeQueueId?.startsWith('favorites')) {
			await TrackPlayer.add(track)
		}
	}
	const handleRemoveFromFavorites = async () => {
		toggleFavorite()

		if (activeQueueId?.startsWith('favorites')) {
			const queue = await TrackPlayer.getQueue()

			const trackToRemove = queue.findIndex(
				(queueTrack: Track) => queueTrack.url === track.url
			)

			await TrackPlayer.remove(trackToRemove)
		}
	}
	const handleAddToPlaylists = async () => {
		router.push({
			pathname: '/(modals)/addToPlaylist',
			params: { trackUrl: track.url },
		})
	}

	return (
		<Menu>
			<MenuTrigger customStyles={menuStyles}>{children}</MenuTrigger>
			<MenuOptions customStyles={menuStyles}>
				{isFavorite ? (
					<MenuOption onSelect={handleRemoveFromFavorites}>
						<MaterialIcons
							name="star-border"
							size={fontSize.md}
							color={colors.icon}
							style={{ paddingVertical: 'auto' }}
						/>
						<Text numberOfLines={1} style={menuStyles.optionText}>
							Remove from favorites
						</Text>
					</MenuOption>
				) : (
					<MenuOption onSelect={handleAddToFavorites}>
						<MaterialIcons
							name="star"
							size={fontSize.md}
							color={colors.icon}
							style={{ paddingVertical: 'auto' }}
						/>
						<Text numberOfLines={1} style={menuStyles.optionText}>
							Add to favorites
						</Text>
					</MenuOption>
				)}
				<View style={utilStyles.itemSeparator} />
				<MenuOption onSelect={handleAddToPlaylists}>
					<MaterialIcons
						name="playlist-add"
						size={fontSize.md}
						color={colors.icon}
						style={{ paddingVertical: 'auto' }}
					/>
					<Text numberOfLines={1} style={menuStyles.optionText}>
						Add to playlists
					</Text>
				</MenuOption>
			</MenuOptions>
		</Menu>
	)
}

export default TrackShortcutsMenu

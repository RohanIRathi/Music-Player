import { toggleTrackFavorite, useFavorites } from '@/stores/slices/librarySlice.tsx'
import { useCallback } from 'react'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'
import { useAppDispatch, useAppSelector } from './useReduxHooks.ts'

export const useTrackPlayerFavorite = () => {
	const activeTrack = useActiveTrack()
	const favorites = useAppSelector(useFavorites)
	const dispatch = useAppDispatch()

	const isFavorite = favorites.find((track) => track.url === activeTrack?.url)?.rating === 1

	const toggleFavorite = useCallback(async () => {
		const id = await TrackPlayer.getActiveTrackIndex()

		if (id == null) return

		await TrackPlayer.updateMetadataForTrack(id, {
			rating: isFavorite ? 0 : 1,
		})

		if (activeTrack) {
			dispatch.call(toggleTrackFavorite, activeTrack)
		}
	}, [isFavorite, toggleTrackFavorite, activeTrack])

	return { isFavorite, toggleFavorite }
}

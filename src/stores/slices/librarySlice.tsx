import library from '@/assets/data/library.json'
import { TrackWithPlaylist } from '@/utils/types.ts'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Track from 'react-native-track-player'
import { RootState } from '../store.tsx'

interface LibraryState {
	tracks: TrackWithPlaylist[]
}

interface playlistParams {
	track: Track
	playlist: string
}

const initialState: LibraryState = {
	tracks: library as TrackWithPlaylist[],
}

const librarySlice = createSlice({
	name: 'library',
	initialState: initialState,
	reducers: {
		toggleTrackFavorite: (state, action: PayloadAction<Track>) => {},
		addToPlaylist: (state, action: PayloadAction<playlistParams>) => {},
	},
})

export const useTracks = (state: RootState) => state.library.tracks

export const useFavorites = () => {
	const favorites = createSelector([useTracks], (tracks: TrackWithPlaylist[]) =>
		tracks.filter((track: Track) => track.rating === 1)
	)

	return {
		favorites,
	}
}

export const { toggleTrackFavorite, addToPlaylist } = librarySlice.actions

export default librarySlice.reducer

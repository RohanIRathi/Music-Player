import library from '@/assets/data/library.json'
import { unknownTrackImageUri } from '@/constants/images.ts'
import { Artist, Playlist, TrackWithPlaylist } from '@/utils/types.ts'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Track from 'react-native-track-player'
import { RootState } from '../store.tsx'

interface LibraryState {
	tracks: TrackWithPlaylist[]
}

export interface PlaylistParams {
	track: TrackWithPlaylist
	playlist: string
}

const initialState: LibraryState = {
	tracks: library as TrackWithPlaylist[],
}

const librarySlice = createSlice({
	name: 'library',
	initialState: initialState,
	reducers: {
		toggleTrackFavorite: (state, action: PayloadAction<Track>) => {
			state.tracks = state.tracks.map((currentTrack) => {
				if (currentTrack.url === action.payload.url) {
					return { ...currentTrack, rating: currentTrack.rating === 1 ? 0 : 1 }
				}
				return currentTrack
			})
		},
		addToPlaylist: (state, action: PayloadAction<PlaylistParams>) => {
			state.tracks = state.tracks.map((currentTrack) => {
				if (
					currentTrack.url === action.payload.track.url &&
					!currentTrack.playlist?.find((playlist) => playlist === action.payload.playlist)
				) {
					return {
						...currentTrack,
						playlist: [...(currentTrack.playlist ?? []), action.payload.playlist],
					}
				}

				return currentTrack
			})
		},
	},
})

export const useTracks = (state: RootState) => state.library.tracks

export const useArtists = createSelector([useTracks], (tracks: TrackWithPlaylist[]) =>
	tracks.reduce((acc, track) => {
		const existingArtist = acc.find((artist) => artist.name === track.artist)
		if (existingArtist) {
			existingArtist.tracks.push(track)
		} else {
			acc.push({
				name: track.artist ?? 'unknown',
				tracks: [track],
			})
		}

		return acc
	}, [] as Artist[])
)

export const usePlaylists = createSelector([useTracks], (tracks: TrackWithPlaylist[]) =>
	tracks.reduce((acc, track) => {
		track.playlist?.forEach((playlistName) => {
			const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)
			if (existingPlaylist) {
				existingPlaylist.tracks.push(track)
			} else {
				acc.push({
					name: playlistName,
					tracks: [track],
					artworkPreview: track.artwork ?? unknownTrackImageUri,
				})
			}
		})

		return acc
	}, [] as Playlist[])
)

export const useFavorites = createSelector([useTracks], (tracks: TrackWithPlaylist[]) =>
	tracks.filter((track: Track) => track.rating === 1)
)

export const { toggleTrackFavorite, addToPlaylist } = librarySlice.actions

export default librarySlice.reducer

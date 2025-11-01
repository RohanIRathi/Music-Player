import { Artist, Playlist, TrackWithPlaylist } from './types.ts'

export const trackTitleFilter = (search: string) => (track: TrackWithPlaylist) =>
	track.title?.toLowerCase().includes(search.toLowerCase())

export const artistNameFilter = (name: string) => (artist: Artist) =>
	artist.name.toLowerCase().includes(name.toLowerCase())

export const playlistNameFilter = (name: string) => (playlist: Playlist) =>
	playlist.name.toLowerCase().includes(name.toLowerCase())

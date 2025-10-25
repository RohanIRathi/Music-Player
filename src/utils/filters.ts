import { TrackWithPlaylist } from './types.ts'

export const trackTitleFilter = (search: string) => (track: TrackWithPlaylist) =>
	track.title?.toLowerCase().includes(search.toLowerCase())

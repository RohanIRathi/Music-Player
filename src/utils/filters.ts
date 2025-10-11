export const trackTitleFilter = (search: string) => (track: { title: string }) =>
	track.title?.toLowerCase().includes(search.toLowerCase())

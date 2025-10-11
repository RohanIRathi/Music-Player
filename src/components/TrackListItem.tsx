import { unknownTrackImageUri } from '@/constants/images.ts'
import { colors } from '@/constants/tokens.ts'
import { trackStyles } from '@/styles/index.ts'
import { Image } from 'expo-image'
import { Text, TouchableHighlight, View } from 'react-native'

export interface TrackListItemProps {
	title: string
	artwork?: string | undefined
	artist?: string | undefined
	url: string
	rating?: number | undefined
	playlist?: string[] | undefined
}

const TrackListItem = ({ title, artwork: image, artist }: TrackListItemProps) => {
	const isActiveTrack = false
	return (
		<TouchableHighlight>
			<View style={{ ...trackStyles.container }}>
				<View>
					<Image
						source={{
							uri: image ?? unknownTrackImageUri,
						}}
						style={{
							...trackStyles.artworkImage,
							opacity: isActiveTrack ? 0.6 : 1,
						}}
					/>
				</View>
				<View style={{ width: '100%' }}>
					<Text
						numberOfLines={1}
						style={{
							...trackStyles.title,
							color: isActiveTrack ? colors.primary : colors.text,
						}}>
						{title}
					</Text>
					{artist && (
						<Text
							numberOfLines={1}
							style={{
								...trackStyles.artist,
							}}>
							{artist}
						</Text>
					)}
				</View>
			</View>
		</TouchableHighlight>
	)
}

export default TrackListItem

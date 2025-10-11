import { unknownTrackImageUri } from '@/constants/images'
import { colors } from '@/constants/tokens'
import { trackStyles } from '@/styles'
import { Image } from 'expo-image'
import { Text, TouchableHighlight, View } from 'react-native'

export interface TrackListItemProps {
	title: string
	image: string | undefined
	artist: string | undefined
}

const TrackListItem = ({ title, image, artist }: TrackListItemProps) => {
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

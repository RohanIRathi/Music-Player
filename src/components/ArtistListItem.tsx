import { unknownArtistImageUri } from '@/constants/images.ts'
import { artistStyles } from '@/styles/index.ts'
import { Artist } from '@/utils/types.ts'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import { Text, TouchableHighlight, View } from 'react-native'

export interface ArtistListItemProps {
	artist: Artist
}

const ArtistListItem = ({ artist }: ArtistListItemProps) => {
	return (
		<Link href={`/artists/${artist.name}`} asChild>
			<TouchableHighlight activeOpacity={0.8}>
				<View style={artistStyles.artistItemContainer}>
					<View>
						<Image
							source={{ uri: unknownArtistImageUri }}
							priority={'normal'}
							style={artistStyles.artistImage}
						/>
					</View>
					<View style={{ width: '100%' }}>
						<Text numberOfLines={1} style={artistStyles.artistNameText}>
							{artist.name}
						</Text>
					</View>
				</View>
			</TouchableHighlight>
		</Link>
	)
}

export default ArtistListItem

import { colors } from '@/constants/tokens.ts'
import { playlistStyles } from '@/styles/index.ts'
import { Playlist } from '@/utils/types.ts'
import { AntDesign } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Text, TouchableHighlight, TouchableHighlightProps, View } from 'react-native'

interface PlaylistListItem extends TouchableHighlightProps {
	playlist: Playlist
}

const PlaylistListItem = ({ playlist, ...props }: PlaylistListItem) => {
	return (
		<TouchableHighlight activeOpacity={0.8} {...props}>
			<View style={playlistStyles.playlistItemContainer}>
				<View>
					<Image
						source={{ uri: playlist.artworkPreview }}
						priority={'high'}
						style={playlistStyles.playlistArtworkImage}
					/>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}>
					<Text numberOfLines={1} style={playlistStyles.playlistNameText}>
						{playlist.name}
					</Text>
					<AntDesign
						name="right"
						size={16}
						color={colors.icon}
						style={{ opacity: 0.5 }}
					/>
				</View>
			</View>
		</TouchableHighlight>
	)
}

export default PlaylistListItem

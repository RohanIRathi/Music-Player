import { unknownTrackImageUri } from '@/constants/images.ts'
import { colors } from '@/constants/tokens.ts'
import { trackStyles } from '@/styles/index.ts'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Text, TouchableHighlight, View } from 'react-native'
import LoaderKit from 'react-native-loader-kit'
import { useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { Track } from 'react-native-track-player/interfaces'

export interface TrackListItemProps {
	track: Track
	onTrackSelect: (track: Track) => void
}

const TrackListItem = ({ track, onTrackSelect: handleTrackSelect }: TrackListItemProps) => {
	const { playing } = useIsPlaying()
	const activeTrack = useActiveTrack()
	const isActiveTrack = activeTrack?.url === track.url

	return (
		<TouchableHighlight onPress={() => handleTrackSelect(track)}>
			<View style={{ ...trackStyles.container }}>
				<View>
					<Image
						source={{
							uri: track.artwork ?? unknownTrackImageUri,
						}}
						style={{
							...trackStyles.artworkImage,
							opacity: isActiveTrack ? 0.6 : 1,
						}}
					/>
					{isActiveTrack &&
						(playing ? (
							<LoaderKit
								style={trackStyles.trackPlayingIconIndicator}
								name="LineScaleParty"
								color={colors.icon}
							/>
						) : (
							<Ionicons
								name="play"
								size={70}
								color={colors.icon}
								style={trackStyles.trackPlayingIconIndicator}
							/>
						))}
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					<View style={{ width: '90%' }}>
						<Text
							numberOfLines={1}
							style={{
								...trackStyles.title,
								color: isActiveTrack ? colors.primary : colors.text,
							}}>
							{track.title}
						</Text>
						{track.artist && (
							<Text
								numberOfLines={1}
								style={{
									...trackStyles.artist,
								}}>
								{track.artist}
							</Text>
						)}
					</View>
					<Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
				</View>
			</View>
		</TouchableHighlight>
	)
}

export default TrackListItem

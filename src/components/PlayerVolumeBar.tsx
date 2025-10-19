import { colors } from '@/constants/tokens.ts'
import useTrackPlayerVolume from '@/hooks/useTrackPlayerVolume.tsx'
import { utilStyles } from '@/styles/index.ts'
import { Ionicons } from '@expo/vector-icons'
import { View, ViewProps } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'

const PlayerVolumeBar = ({ style }: ViewProps) => {
	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	const { volume, updateVolume } = useTrackPlayerVolume()

	progress.value = volume ?? 0

	return (
		<View style={style}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}>
				<Ionicons
					name="volume-low"
					size={20}
					color={colors.icon}
					style={{ opacity: 0.8, marginHorizontal: 5 }}
				/>
				<Slider
					progress={progress}
					minimumValue={min}
					maximumValue={max}
					theme={{
						maximumTrackTintColor: colors.maximumTrackTintColor,
						minimumTrackTintColor: colors.minimumTrackTintColor,
					}}
					containerStyle={utilStyles.slider}
					thumbWidth={0}
					renderBubble={() => null}
					onValueChange={updateVolume}
				/>
				<Ionicons
					name="volume-high"
					size={20}
					color={colors.icon}
					style={{ opacity: 0.8, marginHorizontal: 5 }}
				/>
			</View>
		</View>
	)
}

export default PlayerVolumeBar

import TracksList from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import defaultStyles from '@/styles'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { ScrollView, View } from 'react-native'

const SongsScreen = () => {
	const tabHeight = useBottomTabBarHeight() + 5
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{
					paddingHorizontal: screenPadding.horizontal,
					paddingTop: 5,
				}}
				contentContainerStyle={{ flexGrow: 1, paddingBottom: tabHeight }}>
				<TracksList scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen

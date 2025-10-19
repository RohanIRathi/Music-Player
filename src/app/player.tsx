import MovingText from '@/components/MovingText.tsx'
import { PlayerControls } from '@/components/PlayerControls.tsx'
import PlayerProgressBar from '@/components/PlayerProgressBar.tsx'
import PlayerRepeatToggle from '@/components/PlayerRepeatToggle.tsx'
import PlayerVolumeBar from '@/components/PlayerVolumeBar.tsx'
import { unknownTrackImageUri } from '@/constants/images.ts'
import { colors } from '@/constants/tokens.ts'
import defaultStyles, { playerStyles, utilStyles } from '@/styles/index.ts'
import { FontAwesome } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'

const PlayerScreen = () => {
	const activeTrack = useActiveTrack()
	const { top, bottom } = useSafeAreaInsets()
	const isFavorite = false

	const router = useRouter()
	const translateY = useSharedValue(0)
	const [shouldGoBack, setShouldGoBack] = useState<boolean>(false)
	const AnimatedView = Animated.createAnimatedComponent(View)

	const panGesture = Gesture.Pan()
		.onUpdate((event) => {
			if (event.translationY > 0) translateY.value = event.translationY
		})
		.onEnd((event) => {
			if (event.translationY > 150) setShouldGoBack(true)
			else translateY.value = withSpring(0)
		})
		.runOnJS(true)

	useEffect(() => {
		if (shouldGoBack) router.back()
	}, [shouldGoBack])

	const animationStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}))

	function toggleFavorite(): void {}

	if (!activeTrack) {
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		)
	}

	return (
		<GestureDetector gesture={panGesture}>
			<AnimatedView style={[playerStyles.overlayContainer, animationStyle]}>
				<DismissPlayerSymbol />
				<View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
					<View style={playerStyles.artworkImageContainer}>
						<Image
							source={{ uri: activeTrack.artwork ?? unknownTrackImageUri }}
							priority={'high'}
							contentFit="cover"
							style={playerStyles.artworkImage}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<View style={{ marginTop: 'auto' }}>
							{/* Track Title Row */}
							<View style={{ height: 60 }}>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}>
									{/* Track Title */}
									<View style={playerStyles.trackTitleContainer}>
										<MovingText
											text={activeTrack.title ?? ''}
											animationThreshold={30}
											style={playerStyles.trackTitleText}
										/>
									</View>

									{/* Favorite Button Icon */}
									<FontAwesome
										name={isFavorite ? 'heart' : 'heart-o'}
										size={20}
										color={isFavorite ? colors.primary : colors.icon}
										style={{
											marginHorizontal: 14,
										}}
										onPress={toggleFavorite}
									/>
								</View>
								{/* Track Artist */}
								{activeTrack.artist && (
									<Text
										numberOfLines={1}
										style={[playerStyles.trackArtistText, { marginTop: 6 }]}>
										{activeTrack.artist}
									</Text>
								)}
							</View>
							<PlayerProgressBar style={{ marginTop: 32 }} />
							<PlayerControls style={{ marginTop: 40 }} />
						</View>
						<PlayerVolumeBar style={{ marginTop: 'auto', marginBottom: 30 }} />
						<View style={utilStyles.centeredRow}>
							<PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
						</View>
					</View>
				</View>
			</AnimatedView>
		</GestureDetector>
	)
}

const DismissPlayerSymbol = () => {
	const { top } = useSafeAreaInsets()

	return (
		<View
			style={{
				position: 'absolute',
				top: top + 10,
				left: 0,
				right: 0,
				flexDirection: 'row',
				justifyContent: 'center',
			}}>
			<View
				accessible={false}
				style={{
					width: 50,
					height: 8,
					borderRadius: 8,
					backgroundColor: '#fff',
					opacity: 0.7,
				}}
			/>
		</View>
	)
}

export default PlayerScreen

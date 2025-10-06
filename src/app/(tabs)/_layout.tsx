import { colors, fontSize } from '@/constants/tokens'
import { Tabs } from 'expo-router'
import { BlurView } from 'expo-blur'
import { StyleSheet } from 'react-native'

const TabsNavigation = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				tabBarLabelStyle: {
					fontSize: fontSize.sm,
					fontWeight: '500',
				},
				headerShown: false,
				tabBarStyle: {
					position: 'absolute',
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					borderTopWidth: 0,
					paddingTop: 8,
				},
			}}>
			<Tabs.Screen name="favorites" />
			<Tabs.Screen name="playlists" />
			<Tabs.Screen name="(songs)" />
			<Tabs.Screen name="artists" />
		</Tabs>
	)
}

export default TabsNavigation

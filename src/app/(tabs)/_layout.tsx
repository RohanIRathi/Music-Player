import { colors, fontSize } from '@/constants/tokens'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

interface TabBarIconProps {
	focused: boolean
	color: string
	size: number
}

const TabsNavigation = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				tabBarLabelStyle: {
					fontSize: fontSize.sm,
					fontWeight: '500',
					color: colors.text,
				},
				headerShown: false,
				tabBarStyle: {
					position: 'absolute',
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					borderTopWidth: 0,
					paddingTop: 8,
					backgroundColor: colors.tabBarColor,
				},
			}}>
			<Tabs.Screen
				name="favorites"
				options={{
					title: 'Favorites',
					tabBarIcon: ({ focused, color, size }: TabBarIconProps) => (
						<FontAwesome
							name={focused ? 'heart' : 'heart-o'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="playlists"
				options={{
					title: 'Playlists',
					tabBarIcon: ({ focused, color, size }: TabBarIconProps) => (
						<MaterialCommunityIcons
							name={focused ? 'playlist-music' : 'playlist-music-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="(songs)"
				options={{
					title: 'Songs',
					tabBarIcon: ({ focused, color, size }: TabBarIconProps) => (
						<Ionicons
							name={focused ? 'musical-note' : 'musical-note-outline'}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="artists"
				options={{
					title: 'Artists',
					tabBarIcon: ({ focused, color, size }: TabBarIconProps) => (
						<FontAwesome name={focused ? 'user' : 'user-o'} size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	)
}

export default TabsNavigation

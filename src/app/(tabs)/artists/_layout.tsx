import { colors, fontSize } from '@/constants/tokens.ts'
import defaultStyles from '@/styles/index.ts'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const ArtistsScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerTitle: 'Artists',
						headerStyle: { backgroundColor: colors.background },
						headerTitleStyle: {
							color: colors.text,
							fontSize: fontSize.xl,
							fontWeight: '600',
						},
					}}
				/>
				<Stack.Screen
					name="[name]"
					options={{
						headerTitle: '',
						headerBackButtonDisplayMode: 'default',
						headerStyle: { backgroundColor: colors.background },
						headerBackTitleStyle: {
							color: colors.text,
							fontSize: fontSize.xl,
							fontWeight: '600',
						},
						headerTintColor: colors.primary,
					}}
				/>
			</Stack>
		</View>
	)
}

export default ArtistsScreenLayout

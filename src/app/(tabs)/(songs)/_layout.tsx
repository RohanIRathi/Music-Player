import { colors, fontSize } from '@/constants/tokens.ts'
import defaultStyles from '@/styles/index.ts'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const SongsScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerTitle: 'Songs',
						headerStyle: { backgroundColor: colors.background },
						headerTitleStyle: {
							color: colors.text,
							fontSize: fontSize.xl,
							fontWeight: '600',
						},
					}}
				/>
			</Stack>
		</View>
	)
}

export default SongsScreenLayout

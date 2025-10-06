import { colors, fontSize } from "@/constants/tokens";
import { StyleSheet } from "react-native";

const defaultStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	text: {
		fontSize: fontSize.md,
		color: colors.text,
	},
})

export const utilStyles = StyleSheet.create({})

export default defaultStyles
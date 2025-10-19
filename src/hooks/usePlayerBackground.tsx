import { colors } from '@/constants/tokens.ts'
import { useEffect, useState } from 'react'
import { getColors, ImageColorsResult } from 'react-native-image-colors'

const usePlayerBackground = (imageUrl: string) => {
	const [imageColors, setImageColors] = useState<ImageColorsResult | null>(null)

	useEffect(() => {
		getColors(imageUrl, {
			fallback: colors.background,
			cache: true,
			key: imageUrl,
		}).then((colors) => setImageColors(colors))
	}, [imageUrl])

	return { imageColors }
}

export default usePlayerBackground

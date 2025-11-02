import { withDangerousMod } from '@expo/config-plugins'
import { ExpoConfig } from '@expo/config-types'
import fs from 'node:fs'
import path from 'node:path'

const withAndroidDrawables = (
	config: ExpoConfig,
	{ drawableFiles }: { drawableFiles: string[] }
) => {
	return withDangerousMod(config, [
		'android',
		(config) => {
			// Validate drawableFiles
			if (!Array.isArray(drawableFiles)) {
				throw new Error('drawableFiles must be an array of file paths')
			}

			// Define the target drawable directory
			const drawableDir = path.join(
				config.modRequest.projectRoot,
				'android/app/src/main/res/drawable'
			)

			// Create the drawable directory if it doesn't exist
			if (!fs.existsSync(drawableDir)) {
				fs.mkdirSync(drawableDir, { recursive: true })
			}

			// Copy each drawable file to the drawable directory
			for (const filePath of drawableFiles) {
				const sourcePath = path.resolve(config.modRequest.projectRoot, filePath)
				const fileName = path.basename(filePath)
				const destPath = path.join(drawableDir, fileName)

				if (!fs.existsSync(sourcePath)) {
					console.warn(`Warning: Drawable file not found: ${sourcePath}`)
					continue
				}

				// Copy the file
				fs.copyFileSync(sourcePath, destPath)
			}

			return config
		},
	])
}

export default withAndroidDrawables

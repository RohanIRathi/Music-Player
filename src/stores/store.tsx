import libraryReducer from '@/stores/slices/librarySlice.tsx'
import queueReducer from '@/stores/slices/queueSlice.tsx'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
	reducer: {
		library: libraryReducer,
		queue: queueReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store

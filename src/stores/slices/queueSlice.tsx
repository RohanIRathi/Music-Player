import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store.tsx'

interface QueueState {
	activeQueueId: string | null
}

const initialState: QueueState = {
	activeQueueId: null,
}

const queueSlice = createSlice({
	name: 'queue',
	initialState,
	reducers: {
		setActiveQueueId: (state, action: PayloadAction<string>) => {
			state.activeQueueId = action.payload
		},
	},
})

export const useQueue = (state: RootState) => state.queue.activeQueueId

export const { setActiveQueueId } = queueSlice.actions

export default queueSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'

export const getConfiguredStore = () => {
	const store = configureStore({
		reducer: rootReducer,
	})

	if (process.env.NODE_ENV !== 'production' && module.hot) {
		module.hot.accept('./', () => store.replaceReducer(rootReducer))
	}

	return store
}

export type { RootState } from './rootReducer'

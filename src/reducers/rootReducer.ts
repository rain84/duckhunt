import { combineReducers } from 'redux'
import todos from 'features/todo/todo.slice'

export const rootReducer = combineReducers({
	todos,
})

export type RootState = ReturnType<typeof rootReducer>

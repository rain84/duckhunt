import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Todo = {
	text: string
	id: number
}
type TodosState = Todo[]

let id = 0
const initialState: TodosState = []

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: {
			reducer: (state, action: PayloadAction<Todo>) => {
				const { text, id } = action.payload
				state.push({ text, id })
			},
			prepare: (text) => ({ payload: { text, id: id++ } }),
		},
		removeTodo: (state, action: PayloadAction<number>) => {
			const id = action.payload
			const idx = state.findIndex(({ id: _id }) => id === _id)
			state.splice(idx, 1)
		},
	},
})

export const { addTodo, removeTodo } = todoSlice.actions
export default todoSlice.reducer

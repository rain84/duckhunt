import { useCallback } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Todo } from './todo.component'
import { removeTodo } from './todo.slice'
import style from './todo.module.sass'
import { RootState } from 'reducers'

const selectTodos = (state: RootState) => state.todos
const mapState = (state: RootState) => ({
	todos: selectTodos(state),
})
const mapDispatch = { removeTodo }

const connector = connect(mapState, mapDispatch)
interface Props extends ConnectedProps<typeof connector> {}
type ComponentType = (props: Props) => React.ReactElement

const Todos: ComponentType = (props) => {
	const { todos, removeTodo } = props
	const onClick = useCallback(
		(id) => {
			removeTodo(id)
		},
		[removeTodo]
	)

	return (
		<span>
			{todos.map(({ text, id }, key) => (
				<p key={id} className={style.row}>
					<span>
						{key + 1}. <Todo text={text} />
					</span>
					<button onClick={() => onClick(id)}>X</button>
				</p>
			))}
		</span>
	)
}

const ConnectedTodos = connector(Todos)
export { ConnectedTodos as Todos }

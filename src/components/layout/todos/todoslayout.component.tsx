import { Link } from 'react-router-dom'
import { useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import { Todos } from 'features'
import { addTodo } from 'features/todo/todo.slice'

const mapDispatchToProps = {
	addTodo,
}

type StateProps = {}
type DispatchProps = typeof mapDispatchToProps
type OwnProps = {}
type Props = StateProps & DispatchProps & OwnProps
type Component = (props: Props) => React.ReactElement

const TodosLayout: Component = ({ addTodo }) => {
	const nodeInput = useRef<HTMLInputElement>(null)
	const handleAddTodo = useCallback(() => {
		if (!nodeInput.current) return

		const { value } = nodeInput.current
		if (!value) return

		addTodo(value)
		nodeInput.current.value = ''
	}, [addTodo])

	const onKeyPress = useCallback(
		(e) => {
			if (e.code === 'Enter') handleAddTodo()
		},
		[handleAddTodo]
	)

	return (
		<div className="TodosLayout">
			<div>
				<Link to="/">Open Main View</Link>
				<br />
				<br />
			</div>
			<div>
				<input type="text" className="edit-todo" ref={nodeInput} onKeyPress={onKeyPress} />
				<button onClick={handleAddTodo}>Add Todo</button>
			</div>
			<Todos />
		</div>
	)
}

const ConnectedTodosLayout = connect<StateProps, DispatchProps, OwnProps>(null, mapDispatchToProps)(TodosLayout)
export { ConnectedTodosLayout as TodosLayout }

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, TodosLayout } from 'components/layout'

export const App = () => (
	<Router>
		<Switch>
			<Route path="/game">Game</Route>
			<Route path="/scores">Scores</Route>
			<Route path="/about">About</Route>
			<Route path="/todos">
				<TodosLayout />
			</Route>
			<Route path="*">
				<Home />
			</Route>
		</Switch>
	</Router>
)

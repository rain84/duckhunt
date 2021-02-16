import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Home, Game } from 'components/layout'

export const App = () => (
	<Router>
		<Switch>
			<Route path="/game" component={Game} />
			<Route path="/home" component={Home} />
			<Route path="/scores">Scores</Route>
			<Route path="/about">About</Route>
			<Route path="/" component={Game} />
			<Route path="/*">
				<Redirect to="/game" />
			</Route>
		</Switch>
	</Router>
)

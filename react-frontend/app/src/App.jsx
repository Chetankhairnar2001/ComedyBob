import { Route, Switch } from 'wouter';
import About from './pages/about';
import Navbar from './components/navbar';
import Generate from './pages/generate';
import './App.css';
import Login from './pages/Login';
import SignOut from './pages/signout';
import Register from './pages/Register';
import Home from './pages/home';
import teams from './pages/teams';
import saved_joke from './pages/saved_joke'

function App () {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path='/generate' component={Generate} />
                <Route path='/about' component={About} />
                <Route path='/teams' component={teams} />
                <Route path='/signin' component={Login} />
                <Route path='/signout' component={SignOut} />
                <Route path='/register' component={Register} />
                <Route path='/' component={Home} />
                <Route path='/saved_joke' component={saved_joke} />
            </Switch>
        </>
    );
}

export default App;
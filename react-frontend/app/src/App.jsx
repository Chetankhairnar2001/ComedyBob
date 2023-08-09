import { Route, Switch } from 'wouter';
import About from './pages/about';
import Navbar from './components/navbar';
import Generate from './pages/generate';
import './App.css';
import Login from './pages/Login';
import SignOut from './pages/signout';

function App () {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path='/generate' component={Generate} />
                <Route path='/about' component={About} />
                <Route path='/signin' component={Login} />
                <Route path='/signout' component={SignOut} />
            </Switch>
        </>
    );
}

export default App;
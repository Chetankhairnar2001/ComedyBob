import { Route, Switch } from 'wouter';
import About from './pages/about';
import Navbar from './components/navbar';
import Generate from './pages/generate';
import './App.css';
import Login from './pages/Login';

function App () {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path='/' component={Generate} />
                <Route path='/about' component={About} />
                {/* <Route path='/signin' component={Login} /> */}
            </Switch>
        </>
    );
}

export default App;
import { Route, Switch } from 'wouter';
import About from './pages/about';
import Navbar from './components/navbar';
import Generate from './pages/generate';
import './App.css';

function App () {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path='/' component={Generate} />
                <Route path='/about' component={About} />
            </Switch>
        </>
    );
}

export default App;
// style
import './App.css';

// react router
import { Switch, Route } from 'react-router-dom'

// components
import Navbar from './Components/NavBar/Navbar';
import Home from './Pages/Home'
import Error from './Pages/Error'

function App() {
  return <>
    <Navbar />
    <Switch>
      <Route path="/s/:name/" component={Home} />
      <Route path="/:movie/" component={Home} />
      <Route path="/" component={Home} />
      <Route component={Error} />
    </Switch>
  </>
}

export default App;

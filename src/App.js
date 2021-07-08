// style
import './App.css';

// react router
import { Switch, Route } from 'react-router-dom'

// components
import Navbar from './Components/NavBar/Navbar';
// pages
import Home from './Pages/Home'
import Movie from './Pages/Movie'
import Error from './Pages/Error'

function App() {
  return <>
    <Navbar />
    <Switch>
      <Route path="/s/:name/" component={Home} />
      <Route path="/:mediaType/:movie/" component={Movie} />
      <Route path="/" component={Home} />
      <Route component={Error} />
    </Switch>
  </>
}

export default App;

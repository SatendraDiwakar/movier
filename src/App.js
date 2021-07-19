// style
import './App.css';

// react router
import { Switch, Route } from 'react-router-dom'

// components
import Navbar from './Components/NavBar/Navbar';
// pages
import Home from './Pages/Home'
import SingleMedia from './Pages/SingleMedia';
import SearchedMedia from './Pages/SearchedMedia';
import Error from './Pages/Error'

function App() {
  return <>
    <Navbar />
    <Switch>
      <Route path="/s/:searchTerm/" component={SearchedMedia} />
      <Route path="/:mediaType/:movie/" component={SingleMedia} />
      <Route path="/" component={Home} />
      <Route component={Error} />
    </Switch>
  </>
}

export default App;

import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Error from './Pages/Error'

function App() {
  return (
    <Switch>
      <Route path="/s/:name/" component={Home} />
      <Route path="/:movie/" component={Home} />
      <Route path="/" component={Home} />
      <Route component={Error} />
    </Switch>
  );
}

export default App;

import './App.css';
import { Switch, Route } from 'react-router-dom'

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

import './App.css';
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Switch>
        <Route path="/" component={Home} />
        <Route component={Error} />
      </Switch>
  );
}

export default App;

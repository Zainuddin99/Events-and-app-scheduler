import {Route, BrowserRouter as Router, Switch, useHistory} from 'react-router-dom'
import AddSchedules from './Components/AddSchedules';
import BlockedApps from './Components/BlockedApps';
import Home from './Components/Home';
import LimitedApps from './Components/LimitedApps';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/schedules/add'>
          <AddSchedules/>
        </Route>
        <Route path='/apps/:id/blocked-apps' children={<BlockedApps/>}>
        </Route>
        <Route path='/apps/:id/limited-apps' children={<LimitedApps/>}>
        </Route>
        <Route path='*'>
          <h1>No page found</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import AddSchedules from './Components/AddSchedules';
import BlockedApps from './Components/BlockedApps';
import Header from './Components/Header';
import Home from './Components/Home';
import LimitedApps from './Components/LimitedApps';
import Login from './Components/Login';
import { useGlobalContext } from './context';

function App() {
  const {utilsState} = useGlobalContext()

  return (
    <Router>

      <Header/>

      {utilsState.loginPageOpen && <Login/>}

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
          <h1 style={{textAlign: "center", margin: "50px"}}>No page found</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

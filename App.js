import Login from './component/login/login'
import Register from './component/register/register'
import Resetpassword from './component/resetPassword/resetpassword';
import Forgotpassword from './component/forgotPassword/fogotpassword';
import Keep from './component/fundoo keep/keep' 
import test from './component/fundoo keep/test'
import testone from './component/login/test1'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
    <div>
      <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/resetpassword/:token" component={Resetpassword} />
      <Route path="/forgotpassword" component={Forgotpassword} />
      <Route path="/dashboard" component={Keep} />
      <Route path="/test" component={test} />
      <Route path="/test1" component={testone} />
      </Switch>
    </div>
  </Router>

    // <Register />
    // <Login />
    // <Resetpassword />
  );
}

export default App;

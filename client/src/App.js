import Login from "./Login";
import Register from "./Register";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './admin/admin.css';
import Home from "./Home";
import Task from "./Task";
import MyTasks from "./MyTasks";
import Profile from "./Profile";
import NotFound from "./NotFound";



import Users from "./admin/Users";
import Posts from "./admin/Posts";
import Topics from "./admin/Topics";
import Payments from "./admin/Payments";
import Answers from "./admin/Answers";
import PaymentHistory from "./PaymentHistory";
import AccessDenied from "./403";
import Test from "./Test";





function App() {
  return (
    
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="/task/:id">
            <Task />
          </Route>
          <Route path="/mytasks">
            <MyTasks />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          
          <Route exact path="/payment">
            <PaymentHistory />
          </Route>
          <Route exact path="/denied">
            <AccessDenied />
          </Route>

          <Route exact path="/test">
            <Test />
          </Route>
          

          {/* admin Routes */}
          <Route exact path="/admin">
            <Users />
          </Route>
          <Route exact path="/admin/users">
            <Users />
          </Route>
          <Route exact path="/admin/posts">
            <Posts />
          </Route>
          <Route exact path="/admin/topics">
            <Topics />
          </Route>
          <Route exact path="/admin/payments">
            <Payments />
          </Route>
          <Route exact path="/admin/answers">
            <Answers />
          </Route>

          



          {/* not foud route */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;

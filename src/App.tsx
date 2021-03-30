import React from "react";
import Nav from "./Nav";
import Find from "./Find";
import Books from "./Books";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/find" component={Find} />
          <Route path="/books" component={Books} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Our Library</h1>
    <p> Welcome to our Library! </p>
    <p>Digital libraries are libraries that house digital resources.</p>
    <p>Click on "Books" to add or remove books.</p>
    <p>Click on "Find Books" to find a particular book.</p>
  </div>
);
export default App;

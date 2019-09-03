import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateToggle from "./components/create-toggle.component";
import EditToggle from "./components/edit-toggle.component";
import TogglesList from "./components/toggles-list.component";

class App extends Component {
  render() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">Toggle App</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Toggles</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/createToggle" className="nav-link">Create Toggle</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
                <Route path="/" exact component={TogglesList} />
                <Route path="/editToggle/:id" component={EditToggle} />
                <Route path="/createToggle" component={CreateToggle} />
            </div>
        </Router>
    );
  }
}

export default App;
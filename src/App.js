import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateToggle from "./components/create-toggle.component";
import EditToggle from "./components/edit-toggle.component";
import DeleteToggle from "./components/delete-toggle.component";
import TogglesList from "./components/toggles-list.component";
import AssignmentsList from "./components/assignments-list.component";
import CreateAssignment from "./components/create-assignment.component";
import EditAssignment from "./components/edit-assignment.component";
import DeleteAssignment from "./components/delete-assignment.component";
import SearchAssignmentsList from "./components/search-assignments-list.component";

class App extends Component {
  render() {
    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <Link to="/" className="navbar-brand">Toggle App</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Toggles<span className="sr-only active">(current)</span></Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/create-toggle" className="nav-link">Create Toggle</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/search-toggles" className="nav-link">Search Assignments</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
                <Route path="/" exact component={TogglesList}/>
                <Route path="/create-toggle" component={CreateToggle}/>
                <Route path="/edit-toggle/:id" component={EditToggle}/>
                <Route path="/delete-toggle/:id" component={DeleteToggle}/>
                <Route path="/toggle/:id/assignments" component={AssignmentsList}/>
                <Route path="/create-assignment/toggle/:id" component={CreateAssignment}/>
                <Route path="/edit-assignment/:assignmentId/toggle/:id" component={EditAssignment}/>
                <Route path="/delete-assignment/:assignmentId/toggle/:id" component={DeleteAssignment}/>
                <Route path="/search-toggles" component={SearchAssignmentsList}/>
            </div>
        </Router>
    );
  }
}

export default App;

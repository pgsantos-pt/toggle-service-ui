import React, { Component } from 'react';
import axios from 'axios';

const Assignment = props => {
    return (
      <tr>
          <td>{props.assignment.toggleOwner}</td>
          <td className="align-middle"><input type="checkbox" checked={props.assignment.toggleValue} readOnly/></td>
      </tr>
    )
}

const Toggle = props => {
    let assignments;

    if(props.toggle.toggleAssignments.length>0) {
        assignments = props.toggle.toggleAssignments.map(
          function(currentAssignment, i){
              return <Assignment assignment={currentAssignment} key={i} />;
      });
    }

    return (
        <div>
            <br/>
            <label>Toggle name: '{props.toggle.toggleName}'</label>
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th width={"85%"}>Toggle Owner</th>
                            <th>Toggle Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments}
                    </tbody>
                </table>
            </div>
        </div>
      )
}

export default class SearchAssignmentsList extends Component {
    constructor(props) {
        super(props);

        this.onChangeToggleName = this.onChangeToggleName.bind(this);
        this.onChangeToggleOwner = this.onChangeToggleOwner.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            toggle_name: '',
            toggle_owner: '',
            toggles: []
        };
    }

    onChangeToggleName(e) {
        this.setState({
            toggle_name: e.target.value
        });
    }

    onChangeToggleOwner(e) {
        this.setState({
            toggle_owner: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let url = 'http://localhost:8080/search-toggle-assignments?';

        if(this.state.toggle_name!=='') {
            url = url + 'toggleName=' + this.state.toggle_name + '&'
        }

        if(this.state.toggle_owner!=='') {
            url = url + 'toggleOwner=' + this.state.toggle_owner
        }

        axios.get(url)
            .then(response => {
                this.setState({
                    toggle_name: '',
                    toggle_owner: '',
                    toggles: response.data
                });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    toggleList() {
        return this.state.toggles.map(
            function(currentToggle, i){
                return <Toggle toggle={currentToggle} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Search Toggle Assignments</h3>
                <br/>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <table>
                                <tbody>
                                    <tr className="align-middle">
                                        <td><label style={{marginRight: 10}}>Toggle name: </label></td>
                                        <td>
                                            <input type="text"
                                                className="form-control"
                                                value={this.state.toggle_name}
                                                onChange={this.onChangeToggleName} />
                                        </td>
                                        <td><label style={{marginRight: 10, marginLeft: 25}}>Toggle owner: </label></td>
                                        <td>
                                            <input type="text"
                                                className="form-control"
                                                value={this.state.toggle_owner}
                                                onChange={this.onChangeToggleOwner}/>
                                        </td>
                                        <td><input type="submit" value="Search" className="btn btn-primary" style={{marginLeft: 25}} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
                {this.toggleList()}
            </div>
        )
    }
}

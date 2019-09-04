import React, { Component } from 'react';
import axios from 'axios';

const Assignment = props => {
    return (
      <tr>
          <td>{props.assignment.toggleOwner}</td>
          <td>{props.assignment.toggleValue.toString()}</td>
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
            <label>Toggle name: {props.toggle.toggleName}</label>
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th width={"85%"}>Toggle Owner</th>
                            <th>Toggle Value</th>
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

export default class AssignmentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/toggles/'+this.props.match.params.id+'/toggle-assignments')
            .then(response => {
                this.setState({ toggle: response.data });
                console.log(this.state.toggle);
            })
            .catch(function (error){
                console.log(error);
            })
    }

    toggleList() {
        if(this.state.toggle.length===0) {
            return <div><label>There are no assignments yet</label></div>
        }

        return this.state.toggle.map(
            function(currentToggle, i){
                return <Toggle toggle={currentToggle} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Toggle Assignments List</h3>
                {this.toggleList()}
            </div>
        )
    }
}

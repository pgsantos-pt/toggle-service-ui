import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Assignment = ({assignment, toggle}) => {
    return (
      <tr>
          <td className="align-middle">{assignment.toggleOwner}</td>
          <td className="align-middle"><input type="checkbox" checked={assignment.toggleValue} readOnly/></td>
          <td>
              <Link to={"/edit-assignment/"+assignment.toggleAssignmentId+"/toggle/"+toggle.toggleId}>
                  <button type="button" className="btn btn-warning">
                      Edit
                  </button>
              </Link>
          </td>
          <td>
              <Link to={"/delete-assignment/"+assignment.toggleAssignmentId+"/toggle/"+toggle.toggleId}>
                  <button type="button" className="btn btn-secondary">
                      Delete
                  </button>
              </Link>
          </td>
      </tr>
    )
}

const Toggle = ({toggle}) => {
    let assignments;

    if(toggle.toggleAssignments.length>0) {
        assignments = toggle.toggleAssignments.map(
          function(currentAssignment, i){
              return <Assignment assignment={currentAssignment} toggle={toggle} key={i} />;
      });
    }

    return (
        <div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td width={"85%"}>
                                Toggle name: '{toggle.toggleName}'
                            </td>
                            <td>
                                <Link to={"/create-assignment/toggle/"+toggle.toggleId}>
                                    <button type="button" className="btn btn-success">
                                        +
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th width={"55%"}>Toggle Owner</th>
                            <th width={"30%"}>Toggle Active</th>
                            <th colSpan={2}>Actions</th>
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
                <br/>
                {this.toggleList()}
            </div>
        )
    }
}

import React, { Component } from 'react';
import axios from 'axios';

const Assignment = props => (
    <tr>
        <td>{props.assignment.toggleAssignments[0].toggleOwner}</td>
        <td>{props.assignment.toggleAssignments[0].toggleValue}</td>
    </tr>
)

export default class AssignmentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assignments: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/toggles/'+this.props.match.params.id+'/toggle-assignments')
            .then(response => {
                this.setState({ assignments: response.data });
                console.log(this.state.assignments[0].toggleAssignments[0].toggleOwner);
            })
            .catch(function (error){
                console.log(error);
            })
    }

    toggleList() {
        return this.state.assignments.map(
            function(currentToggle, i){
                return <Assignment assignment={currentToggle} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Toggle Assignment List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Toggle ID</th>
                            <th>Toggle Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.toggleList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

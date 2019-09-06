import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Toggle = props => (
    <tr>
        <td className="align-middle">{props.toggle.toggleName}</td>
        <td>
            <Link to={"/toggle/"+props.toggle.toggleId+"/assignments"}>
                <button type="button" className="btn btn-primary">
                    Assign
                </button>
            </Link>
        </td>
        <td>
            <Link to={"/edit-toggle/"+props.toggle.toggleId}>
                <button type="button" className="btn btn-warning">
                    Edit
                </button>
            </Link>
        </td>
        <td>
            <Link to={"/delete-toggle/"+props.toggle.toggleId}>
                <button type="button" className="btn btn-secondary">
                    Delete
                </button>
            </Link>
        </td>
    </tr>
)

export default class TogglesList extends Component {
    constructor(props) {
        super(props);
        this.state = {toggles: []};
    }

    componentDidMount() {
        axios.get('http://localhost:8080/toggles')
            .then(response => {
                this.setState({ toggles: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    toggleList() {
        if(this.state.toggles.length===0) {
            return <div><label>There are no toggles yet</label></div>
        }

        let displayToggles = this.state.toggles.map(
            function(currentToggle, i) {
                return <Toggle toggle={currentToggle} key={i} />
            }
        )

        return (
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th width={"85%"}>Toggle Name</th>
                        <th colSpan={3}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayToggles}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div>
                <h3>Toggle List</h3>
                { this.toggleList() }
            </div>
        )
    }
}

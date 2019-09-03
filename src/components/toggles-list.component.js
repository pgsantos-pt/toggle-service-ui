import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Toggle = props => (
    <tr>
        <td>{props.toggle.toggleName}</td>
        <td>
            <Link to={"/editToggle/"+props.toggle.toggleId}>Edit</Link>
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
        return this.state.toggles.map(function(currentToggle, i){
            return <Toggle toggle={currentToggle} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Toggle List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Toggle Name</th>
                        <th>Action</th>
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
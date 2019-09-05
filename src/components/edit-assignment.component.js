import React, { Component } from 'react';
import axios from 'axios';

export default class EditAssignment extends Component {
    constructor(props) {
        super(props);

        this.onChangeToggleValue = this.onChangeToggleValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            toggle_name: '',
            toggle_owner: '',
            toggle_value: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/toggles/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    toggle_name: response.data.toggleName
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:8080/toggles/'+this.props.match.params.id+"/toggle-assignments/"+this.props.match.params.assignmentId)
            .then(response => {
                this.setState({
                    toggle_owner: response.data.toggleOwner,
                    toggle_value: response.data.toggleValue
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeToggleValue(e) {
        this.setState({
            toggle_value: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const updateToggle = {
            toggleValue: this.state.toggle_value
        };

        console.log(updateToggle);

        axios.put('http://localhost:8080/toggles/'+this.props.match.params.id+"/toggle-assignments/"+this.props.match.params.assignmentId, updateToggle)
            .then(res => {
                this.props.history.goBack();
            });

        this.setState({
            toggle_name: '',
            toggle_owner: '',
            toggle_value: false
        });
    }

    onCancel(e) {
        this.props.history.goBack();
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Edit Assignment</h3>
                <br/>
                <div>
                    <label>Toggle name: '{this.state.toggle_name}'</label>
                </div>
                <div>
                    <label>Toggle owner: '{this.state.toggle_owner}'</label>
                </div>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label style={{marginRight: 10}}>Set as active: </label>
                        <input type="checkbox" checked={this.state.toggle_value} onChange={this.onChangeToggleValue} className="align-middle" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary" style={{marginRight: 20}} />
                        <input type="button" value="Cancel" className="btn btn-secondary" onClick={this.onCancel}/>
                    </div>
                </form>
            </div>
        )
    }
}

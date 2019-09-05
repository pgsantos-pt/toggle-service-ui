import React, { Component } from 'react';
import axios from 'axios';

export default class CreateAssignment extends Component {
    constructor(props) {
        super(props);

        this.onChangeToggleOwner = this.onChangeToggleOwner.bind(this);
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
    }

    onChangeToggleOwner(e) {
        this.setState({
            toggle_owner: e.target.value
        });
    }

    onChangeToggleValue(e) {
        this.setState({
            toggle_value: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newAssignment = {
            toggleOwner: this.state.toggle_owner,
            toggleValue: this.state.toggle_value
        };

        axios.post('http://localhost:8080/toggles/'+this.props.match.params.id+"/toggle-assignments", newAssignment)
            .then(res => {
                this.props.history.goBack();
            })
            .catch(function (error) {
                console.log(error);
            })

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
                <h3>Assign Toggle '{this.state.toggle_name}'</h3>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div>
                            <label>Toggle owner: </label>
                            <input type="text"
                                    className="form-control"
                                    value={this.state.toggle_owner}
                                    onChange={this.onChangeToggleOwner}/>
                        </div>
                        <br/>
                        <div>
                            <label style={{marginRight: 10}}>Set as active: </label>
                            <input type="checkbox" checked={this.state.toggle_value} onChange={this.onChangeToggleValue} className="align-middle" />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary" style={{marginRight: 20}} />
                        <input type="button" value="Cancel" className="btn btn-secondary" onClick={this.onCancel}/>
                    </div>
                </form>
            </div>
        )
    }
}

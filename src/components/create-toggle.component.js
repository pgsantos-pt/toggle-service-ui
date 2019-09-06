import React, { Component } from 'react';
import axios from 'axios';

export default class CreateToggle extends Component {
    constructor(props) {
        super(props);

        this.onChangeToggleName = this.onChangeToggleName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            toggle_name: ''
        }
    }

    onChangeToggleName(e) {
        this.setState({
            toggle_name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newToggle = {
            name: this.state.toggle_name
        };

        axios.post('http://localhost:8080/toggles', newToggle)
            .then(res => {
                this.props.history.goBack();
            })
            .catch(function (error) {
                console.log(error);
            })

        this.setState({
            toggle_name: ''
        });
    }

    onCancel(e) {
        this.props.history.goBack();
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Toggle</h3>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Toggle name: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.toggle_name}
                                onChange={this.onChangeToggleName}/>
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

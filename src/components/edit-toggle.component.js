import React, { Component } from 'react';
import axios from 'axios';

export default class EditToggle extends Component {
    constructor(props) {
        super(props);

        this.onChangeToggleName = this.onChangeToggleName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            toggle_name: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/toggles/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    toggle_name: response.data.toggle_name
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeToggleName(e) {
        this.setState({
            toggle_name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            toggle_name: this.state.toggle_name,
        };

        console.log(obj);

        axios.put('http://localhost:8080/toggles/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.toggle_name}
                                onChange={this.onChangeToggleName}
                        />
                    </div>
                </form>
                <div className="form-group">
                    <input type="submit" value="Update Todo" className="btn btn-primary" />
                </div>
            </div>
        )
    }
}
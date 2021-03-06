import React, { Component } from 'react';
import axios from 'axios';

export default class EditToggle extends Component {
    constructor(props) {
        super(props);

        this.onChangeToggleName = this.onChangeToggleName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            toggle_name: ''
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

    onChangeToggleName(e) {
        this.setState({
            toggle_name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const updateToggle = {
            name: this.state.toggle_name
        };

        console.log(updateToggle);

        axios.put('http://localhost:8080/toggles/'+this.props.match.params.id, updateToggle)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/');
            });

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
                <h3>Edit Toggle</h3>
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
                        <input type="submit" value="Update" className="btn btn-primary" style={{marginRight: 20}} />
                        <input type="button" value="Cancel" className="btn btn-secondary" onClick={this.onCancel}/>
                    </div>
                </form>
            </div>
        )
    }
}

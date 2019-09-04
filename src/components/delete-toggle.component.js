import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteToggle extends Component {
    constructor(props) {
        super(props);

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

    onSubmit(e) {
        e.preventDefault();

        axios.delete('http://localhost:8080/toggles/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/');
            });

        this.setState({
            toggle_name: ''
        });
    }

    onCancel(e) {
        this.props.history.push('/');
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Delete Toggle</h3>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Are you sure you want to delete toggle '{this.state.toggle_name}'?</label>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete" className="btn btn-primary" style={{marginRight: 20}} />
                        <input type="button" value="Cancel" className="btn btn-secondary" onClick={this.onCancel}/>
                    </div>
                </form>
            </div>
        )
    }
}

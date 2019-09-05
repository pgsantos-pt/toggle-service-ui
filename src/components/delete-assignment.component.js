import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteAssignment extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            toggle_name: '',
            toggle_owner: ''
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

        axios.get('http://localhost:8080/toggles/'+this.props.match.params.id+'/toggle-assignments/'+this.props.match.params.assignmentId)
            .then(response => {
                this.setState({
                    toggle_owner: response.data.toggleOwner
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        axios.delete('http://localhost:8080/toggles/'+this.props.match.params.id+'/toggle-assignments/'+this.props.match.params.assignmentId)
            .then(res => {
                this.props.history.goBack();
            });

        this.setState({
            toggle_name: '',
            toggle_owner: ''
        });
    }

    onCancel(e) {
        this.props.history.goBack();
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Delete Assignment</h3>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Are you sure you want to delete toggle '{this.state.toggle_name}' for '{this.state.toggle_owner}'?</label>
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

import React, { Component } from 'react';
import {API_URL} from '../constants';
import {server} from '../server'

export class SignUp extends Component {

    state = {
        name: '',
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    createUser = () => {
        // console.log('h', this.state)
        server.post(`${API_URL}/users/`, (this.state)) 
        .then( user => {
            this.props.onSignUp(user.token, user)
            this.props.history.push(`/login`)
        })
    
    }
    
    render() {
        const {name, email, password} = this.state
        return (
            <div>
            <h1>Sign Up!</h1>
            <div>
                <label>Name</label>
                <input onChange={this.handleChange} value={name} name="name" type="text" />
            </div>
            <div>
                <label>Email</label>
                <input onChange={this.handleChange} value={email} name="email" type="text" />
            </div>
            <div>
                <label>Password</label>
                <input onChange={this.handleChange} value={password} name="password" type="password" />
            </div>
            <button onClick={this.createUser}>Create User</button>
        </div>
        );
    }
}

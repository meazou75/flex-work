import React from 'react';
import { endpoint } from '../../Constants';
import AuthService from '../../Services/AuthService';

import '../../Assets/Pages/login.css';

export default class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            login: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        fetch(`${endpoint}/login`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (!res.success) {
                    return alert('Invalid password');
                }

                new AuthService().setToken(res.token);
                this.props.history.push('/');
            })
            .catch(err => alert(err));
    }

    render() {
        return (
            <div className="background-container">
                <div className="login-page">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="login">Username</label>
                            <input
                                type="text"
                                name="login"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <input type="submit" value="Connexion" />
                    </form>
                </div>
            </div>
        );
    }
}

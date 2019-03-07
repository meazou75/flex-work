import React from 'react';
import AuthService from './AuthService';

export default AuthComponent => {
    const Auth = new AuthService();

    return class AuthWrapped extends React.Component {
        constructor() {
            super();
            this.state = {
                user: null
            };
        }

        componentDidMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login');
            } else {
                try {
                    const profile = Auth.getProfile();
                    this.setState({
                        user: profile
                    });
                } catch (err) {
                    Auth.logout();
                    this.props.history.replace('/login');
                }
            }
        }

        render() {
            if (this.state.user) {
                return <AuthComponent {...this.props} />;
            } else {
                return null;
            }
        }
    };
};

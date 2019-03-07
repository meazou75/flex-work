import decode from 'jwt-decode';

export default class AuthService {
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        localStorage.setItem('feeli_admin_token', idToken);
    }

    getToken() {
        return localStorage.getItem('feeli_admin_token');
    }

    logout() {
        localStorage.removeItem('feeli_admin_token');
    }

    getProfile() {
        return decode(this.getToken());
    }
}

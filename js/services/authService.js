let auth = (() => {
    function isAuth() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function saveSession(userData) {
        sessionStorage.setItem('authtoken', userData._kmd.authtoken);
        sessionStorage.setItem('username', userData.username);
        sessionStorage.setItem('email', userData.email);
        sessionStorage.setItem('avatarUrl', userData.avatarUrl);
        sessionStorage.setItem('userId', userData._id);
    }

    function register(userData) {
        return remote.post('user', '', 'basic', userData);
    }

    function login(username, password) {
        let obj = {username, password};

        return remote.post('user', 'login', 'basic', obj)
    }

    function logout() {
        return remote.post('user', '_logout', 'kinvey');
    }

    return {
        isAuth,
        login,
        logout,
        register,
        saveSession
    }
})();
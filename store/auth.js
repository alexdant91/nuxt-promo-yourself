export const state = () => ({
    user: null
});

export const getters = {
    authUser(state) {
        return state.user || null;
    },
    isAuthenticated(state) {
        return !!state.user;
    },
    isAdmin(state) {
        return state.user && state.user.role && state.user.role === "admin";
    }
}

export const actions = {
    login({ commit, state }, loginData) {
        return this.$axios.$post('/api/v1/users/login', loginData)
            .then(user => {
                commit('setAuthUser', user);
                return state.user;
            })
            .catch(err => Promise.reject(err));
    },
    getAuthUser({ commit, getters, state }) {
        const authUser = getters.authUser;
        if (authUser) return Promise.resolve(authUser); // if client side user exist return it
        else return this.$axios.$get('/api/v1/users/me') // else check for user on server side
            .then(user => {
                commit('setAuthUser', user);
                return state.user;
            })
            .catch(err => Promise.reject(err));
    },
    logout({ commit }) {
        return this.$axios.$post('/api/v1/users/logout')
            .then(() => {
                commit('setAuthUser', null);
                return true;
            })
            .catch(err => Promise.reject(err));
    }
}

export const mutations = {
    setAuthUser(state, user) {
        state.user = user;
    }
}
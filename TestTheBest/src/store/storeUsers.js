import axios from 'axios';

const state = {
    users: []
};

const getters = {
    getUsers: (state) => state.users,
    getApplicants: (state) => state.users.filter(user => (!user.isObserver && !user.isAdmin)),
    getObservers: (state) => state.users.filter(user => user.isObserver === true)
};

const actions = {
    async fetchUsers({ commit }) {
        const response = await axios.get("/api/users/");
        commit("SET_USERS", response.data);
    },
    async addObserver({ commit }, observer) {
        const response = await axios.post('/api/users/registerObserver', observer);
        commit('ADD_USER', response.data);
    },
    async deleteUser({ commit }, id) {
        await axios.delete(`/api/users/${id}`);
        commit('REMOVE_USER', id);
    }
};

const mutations = {
    SET_USERS: (state, payload) => (state.users = payload),
    ADD_USER: (state, user) => state.users.unshift(user),
    REMOVE_USER: (state, id) => state.users = state.users.filter(user => user.id !== id)
};


export default {
    state,
    getters,
    actions,
    mutations
}
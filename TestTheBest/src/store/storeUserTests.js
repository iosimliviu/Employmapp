import axios from 'axios';

const state = {
    userTests: [],
    test: {}
};

const getters = {
    allUserTests: (state) => state.userTests,
    getUserTestsByUserId: (state) => (user_id) => {
        return state.userTests.filter(userTest => userTest.userId === user_id)
    },
    getUserTestByTestId: (state) => (test_id) => {
        return state.userTests.find(userTest => userTest.testId === test_id)
    },
    getTestForUserTest: (state) => state.test
};

const actions = {
    async fetchUserTests({ commit }) {
        const response = await axios.get('/api/userTests/');
        commit('SET_USERTESTS', response.data);
    },
    async fetchTestForUserTest({ commit }, id) {
        const response = await axios.get(`/api/tests/data/${id}`);
        commit('SET_TEST_FOR_USERTEST', response.data);
    }
};

const mutations = {
    SET_USERTESTS: (state, payload) => (state.userTests = payload),
    SET_TEST_FOR_USERTEST: (state, payload) => (state.test = payload)
};

export default {
    state,
    getters,
    actions,
    mutations
}
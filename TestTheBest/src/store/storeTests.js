import axios from 'axios';

const state = {
    testsMetadata: []
};

const getters = {
    getTestsMetadata: (state) => state.testsMetadata
};

const actions = {
    async fetchTestsMetadata({ commit }) {
        const response = await axios.get("/api/tests");
        commit("SET_TESTS_METADATA", response.data);
    },
    async  deleteTestsMetadataById({ commit }, id) {
        await axios.delete(`/api/tests/${id}`);
        commit('REMOVE_TEST', id);
    }
};

const mutations = {
    SET_TESTS_METADATA: (state, payload) => (state.testsMetadata = payload),
    REMOVE_TEST: (state, id) => state.testsMetadata = state.testsMetadata.filter(test => test.id !== id)
};

export default {
    state,
    getters,
    actions,
    mutations
}
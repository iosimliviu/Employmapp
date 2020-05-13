import axios from 'axios';

const state = {
    feedbacks: []
};

const getters = {
    allFeedbacks: (state) => state.feedbacks,
    fetchFeedbackByUserId: (state) => (user_id) => {
        return state.feedbacks.find(feedback => feedback.userId === user_id)
    }
};

const actions = {
    async fetchFeedbacks({ commit }) {
        const response = await axios.get('/api/feedbacks/');
        commit('SET_FEEDBACKS', response.data);
    },
    async addFeedback({ commit }, feedback) {
        const response = await axios.post('/api/feedbacks', feedback);
        commit('ADD_FEEDBACK', response.data);
    },
    async updateFeedback({ commit }, updFeedback) {
        const response = await axios.put(
            `/api/feedbacks/${updFeedback.id}`,
            updFeedback
        );
        commit('UPDATE_FEEDBACK', response.data);
    }
};

const mutations = {
    SET_FEEDBACKS: (state, payload) => (state.feedbacks = payload),
    ADD_FEEDBACK: (state, feedback) => state.feedbacks.unshift(feedback),
    UPDATE_FEEDBACK: (state, updFeedback) => {
        const index = state.feedbacks.findIndex(feedback => feedback.id === updFeedback.id);
        if (index !== -1) {
            state.feedbacks.splice(index, 1, updFeedback);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
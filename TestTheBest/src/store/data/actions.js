import axios from "axios";

export async function fetchTestsMetadata({ commit }) {
    const response = await axios.get("/api/tests");

    commit("SET_TESTS_METADATA", response.data);
}

export async function fetchUsers({ commit }) {
    const response = await axios.get("/api/users/");

    commit("SET_USERS", response.data);
}

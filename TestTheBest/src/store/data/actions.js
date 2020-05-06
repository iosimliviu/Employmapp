import axios from "axios";

export async function fetchTestsMetadata ({ commit }) {
    const response = await axios.get("/api/tests");

    commit("SET_TESTS_METADATA", response.data);
}

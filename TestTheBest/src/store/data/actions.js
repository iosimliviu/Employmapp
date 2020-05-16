import axios from "axios";

export async function fetchUsers({ commit }) {
    const response = await axios.get("/api/users/");
    commit("SET_USERS", response.data);
}


export function getTestsMetadata(state) {
    return state.testsMetadata;
}

export function getUsers(state) {
    return state.users;
}

export function getFeedbacks(state) {
    return state.feedbacks;
}

// export function getFeedbackForUser(state) {
//     return (id) => {
//         return state.feedbacks.find(feedback => feedback.userId === id)
//     }
// }
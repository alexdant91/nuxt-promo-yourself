export const state = () => ({
    item: {},
    items: []
});

export const actions = {
    fetchCourses({ commit, state }) {
        return this.$axios.$get('/api/v1/products')
            .then(courses => {
                commit('setItems', { resource: 'course', items: courses }, { root: true })
                return state.items;
            })
    },
    fetchCourseBySlug({ commit, state }, slug) {
        return this.$axios.$get(`/api/v1/products/s/${slug}`)
            .then(course => {
                commit('setItem', course);
                return state.item;
            })
    }
}

export const mutations = {
    setItem(state, course) {
        state.item = course;
    }
}
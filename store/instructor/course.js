export const state = () => ({
    items: [],
    item: {},
    canUpdateCourse: false
});

export const actions = {
    fetchInstructorCourses({ commit, state }) {
        return this.$axios.$get('/api/v1/products/user-products')
            .then(courses => {
                commit('setCourses', courses);
                return state.items;
            }).catch(err => Promise.reject(err));
    },
    createCourse(_, courseData) {
        return this.$axios.$post('/api/v1/products', courseData)
            .then(() => true)
            .catch(err => Promise.reject(err));
    },
    fetchCourseById({ commit, state }, courseId) {
        return this.$axios.$get(`/api/v1/products/${courseId}`)
            .then(course => {
                commit('setCourse', course);
                return state.item;
            })
            .catch(err => Promise.reject(err));
    },
    updateLine({ commit }, { index, field, value }) {
        commit('setLineValue', { index, field, value });
        commit('setCanUpdateCourse', true);
        return true;
    },
    updateCourseValue({ commit }, { name, value }) {
        commit('setCourseValue', { name, value });
        commit('setCanUpdateCourse', true);
        return true;
    },
    updateCourse({ commit, state }) {
        return this.$axios.$patch(`/api/v1/products/${state.item._id}`, state.item)
            .then(course => {
                commit('setCourse', course);
                commit('setCanUpdateCourse', false);
                return state.item;
            })
            .catch(err => Promise.reject(err));

    }
}

export const mutations = {
    setCourses(state, courses) {
        state.items = courses
    },
    setCourse(state, course) {
        state.item = course
    },
    addLine(state, field) {
        state.item[field].push({ value: "" });
    },
    removeLine(state, { index, field }) {
        state.item[field].splice(index, 1);
    },
    setLineValue(state, { index, field, value }) {
        state.item[field][index].value = value;
    },
    setCourseValue(state, { name, value }) {
        state.item[name] = value;
    },
    setCanUpdateCourse(state, canUpdateCourse) {
        state.canUpdateCourse = canUpdateCourse;
    }
}
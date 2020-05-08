export const state = () => ({
    items: {
        drafts: [],
        published: []
    },
    item: {},
    isSaving: false
});

export const getters = {
    getBlogs({ state }) {
        return state.items;
    }
}

export const actions = {
    createBlog({ commit }, blogData) {
        commit('setIsSaving', true);
        return this.$axios.$post('/api/v1/blogs', blogData)
            .then(blog => {
                commit('setIsSaving', false);
                return blog;
            })
            .catch(err => {
                commit('setIsSaving', false);
                return Promise.reject(err)
            })
    },
    fetchInstructorBlogs({ commit, state }) {
        return this.$axios.$get('/api/v1/blogs/me')
            .then(blogs => {
                commit('setBlogs', blogs);
                return state.items;
            }).catch(err => Promise.reject(err));
    },
    fetchBlogById({ commit, state }, blogId) {
        return this.$axios.$get(`/api/v1/blogs/${blogId}`)
            .then(blog => {
                commit('setBlog', blog);
                return state.item;
            })
            .catch(err => Promise.reject(err));
    },
    updateBlog({ commit, state }, blogData) {
        commit('setIsSaving', true);
        blogData.updatedAt = Date.now();
        return this.$axios.$patch(`/api/v1/blogs/${state.item._id}`, blogData)
            .then(blog => {
                commit('setBlog', blog);
                commit('setIsSaving', false);
                return state.item;
            })
            .catch(err => {
                commit('setIsSaving', false);
                return Promise.reject(err)
            })
    },
    deleteBlog({ state }, blogId) {
        return this.$axios.$delete(`/api/v1/blogs/${blogId}`)
            .then(_ => {
                return state.item;
            })
            .catch(err => {
                return Promise.reject(err)
            })
    },
    updateFeaturedBlog({ commit, state }, {id, featured}) {
        return this.$axios.$patch(`/api/v1/blogs/${id}`, { featured })
            .then(_ => true)
            .catch(err => Promise.reject(err));
    }
}

export const mutations = {
    setBlog(state, blog) {
        state.item = blog
    },
    setBlogs(state, blogs) {
        let drafts = [], published = [];
        blogs.forEach(blog => {
            if (blog.status == "active") drafts.push(blog);
            if (blog.status == "published") published.push(blog);
        });
        state.items = { drafts, published };
    },
    setIsSaving(state, isSaving) {
        state.isSaving = isSaving;
    }
}
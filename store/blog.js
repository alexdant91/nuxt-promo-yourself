import Vue from 'vue';

export const state = () => ({
    item: {},
    items: {
        all: [],
        featured: []
    },
    pagination: {
        count: 0, // Count of all blogs posts
        pageCount: 0, // How many pages we want to display
        pageSize: 6, // How many items we want to display per page
        pageNum: 1 // Current page
    }
});

export const actions = {
    fetchBlogs({ commit, state }, filters) {
        const url = this.$applyParamsToUrl('/api/v1/blogs', filters);
        return this.$axios.$get(url)
            .then(({ blogs, count, pageCount }) => {
                commit('setBlogs', { resource: 'all', blogs });
                commit('setPagination', { count, pageCount });
                return state.items.all;
            })
            .catch(err => Promise.reject(err));
    },
    fetchFeaturedBlogs({ commit, state }, filters) {
        const url = this.$applyParamsToUrl('/api/v1/blogs', filters);
        return this.$axios.$get(url)
            .then(({ blogs }) => {
                commit('setBlogs', { resource: 'featured', blogs });
                return state.items.all;
            })
            .catch(err => Promise.reject(err));
    },
    fetchBlogBySlug({ commit, state }, slug) {
        return this.$axios.$get(`/api/v1/blogs/s/${slug}`)
            .then(blog => {
                commit('setBlog', blog);
                return state.item;
            })
            .catch(err => Promise.reject(err));
    }
}

export const mutations = {
    setBlogs(state, { resource, blogs }) {
        state.items[resource] = blogs;
    },
    setBlog(state, blog) {
        state.item = blog;
    },
    setPagination(state, { count, pageCount }) {
        Vue.set(state.pagination, 'count', count);
        Vue.set(state.pagination, 'pageCount', pageCount);
    },
    setPage(state, currentPage) {
        Vue.set(state.pagination, 'pageNum', currentPage);
    }
}

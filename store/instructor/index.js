export const state = () => ({
    heroes: []
});

export const actions = {
    fetchHeroes({ commit, state }) {
        return this.$axios.$get('/api/v1/product-heroes')
            .then(heroes => {
                commit('setHeroes', heroes);
                return state.heroes;
            })
            .catch(err => Promise.reject(err));
    },
    activateHero({ commit }, heroId) {
        return this.$axios.$patch(`/api/v1/product-heroes/${heroId}`)
            .then(activeHero => {
                commit('hero/setHero', activeHero, { root: true });
                return activeHero;
            })
            .catch(err => Promise.reject(err));
    }
};

export const mutations = {
    setHeroes(state, heroes) {
        state.heroes = heroes;
    }
}
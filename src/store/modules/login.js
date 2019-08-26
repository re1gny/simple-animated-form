export default {
    namespaced: true,
    state: {
        canvasWidth: '100%',
        formWidth: '0%',
        formHidden: true
    },
    getters: {
        getFormHidden (state, getters) {
            return state.formHidden
        },
        getCanvasWidth (state, getters) {
            return state.canvasWidth
        },
        getFormWidth (state, getters) {
            return state.formWidth
        }
    },
    mutations: {
        changeFormHidden (state, payload) {
            state.formHidden = payload
        },
        changeCanvasWidth (state, payload) {
            state.canvasWidth = payload
        },
        changeFormWidth (state, payload) {
            state.formWidth = payload
        }
    },
    actions: {
        changeWidth ({commit, state, getters}, payload) {
            commit('changeCanvasWidth', payload.canvasWidth)
            commit('changeFormWidth', payload.formWidth)
            commit('changeFormHidden', payload.formHidden)
        }
    }
}
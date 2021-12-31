import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

function initToast() {
    return {
        snackbar: false,
        snackbarText: "",
        timeout: 3000,
        queue: [],
    }
}



const initUser = () => {
    return {
        user: {
            displayName: "",
            id: "",
            role: "",
            username: "",
        }

    }
}

import axios from "axios";
import router from "../router";
export default new Vuex.Store({
    modules: {
    },
    strict: process.env.NODE_ENV !== 'production',
    state: {
        ...initUser(),
        ...initToast(),

    },
    getters: {
        getUserProfile: (state) => state.userProfile,
        getSnackBar: (state) => state.snackbar,
        getSnackBarTimeout: (state) => state.timeout,
        getSnackBarText: (state) => state.snackbarText,
        getTotalAlarmNumber: (state) => state.totalAlarm,
        currentUser: (state) => state.user
    },
    mutations: {
        SET_USER: (state, { user }) => {
            state.user = user;
        },
        setSnackBarText(state, value) {
            state.snackbarText = value
        },
        setSnackBar(state, value) {
            state.snackbar = value
        },
        setSnackBarTimeOut(state, value) {
            state.timeout = value
        },
        setTotalAlarm(state, value) {
            state.totalAlarm = value
        },
        addtToSnackBarQueue(state, value) {
            state.queue = [...state.queue, ...value]
        },
        setSnackBarQueue(state, value) {
            state.queue = value
        },
        setEditingUserUsername(state, value) {
            state.editingUserUsername = value
        }
    },
    actions: {
        async popSnackbarMq({ commit }) {
            if (this.state.queue.length > 0) {
                await new Promise((r) => setTimeout(r, 200)) //sleep
                const queue = [...this.state.queue]
                const snackbarText = queue.shift()

                commit('setSnackBarQueue', queue)
                commit('setSnackBarText', snackbarText)
                commit('setSnackBar', true)
            }
        },
        async addArrayToSnackBarQueue({ commit }, value) {
            //array object need time to update its attribute, if too quick to assgin it to store, vuex will complaint state is mutated by other
            await new Promise((r) => setTimeout(r, 1000))
            const queue = value
            const snackbarText = queue.shift()

            commit('setSnackBarText', snackbarText)
            commit('setSnackBar', true)
            commit('setSnackBarQueue', queue)
            commit('setSnackBarTimeOut', 1200)
        },
        async fetchCurrentUser({ commit }) {
            return new Promise(resolve => {
                axios
                    .get("/api/user")
                    .then((response) => {
                        commit('SET_USER', { user: response.data.user })
                        resolve();
                    })
                    .catch((errors) => {
                        // console.log("retrieve user info error", errors)
                        router.push("/login")
                    });
            })
        }
    }
})

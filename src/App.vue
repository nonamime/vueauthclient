<template>
  <v-app>
    <Header />
    <router-view />
  </v-app>
</template>

<script>
import Header from "./components/header.vue";
import { mapActions } from "vuex";

export default {
  name: "App",

  title: "Foo Page",
  components: {
    Header,
  },
  methods: {
    ...mapActions(["fetchCurrentUser"]),
    getUserData: function () {},
  },
  async created() {
    await this.fetchCurrentUser();
    console.log("app");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.col {
  padding: 10px;
}
</style>

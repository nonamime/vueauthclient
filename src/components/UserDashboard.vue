<template>
  <div v-if="currentUser">
    <h2>Dashboard</h2>
    <p>User Name: {{ currentUser.username }}</p>
    <p>Display Name: {{ currentUser.displayName }}</p>
    <p>Role: {{ currentUser.role }}</p>
    <v-form v-on:submit="logout">
      <v-btn class="loginButton" type="submit" value="Logout">Logout</v-btn>
    </v-form>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    logout: function () {
      let self = this;
      axios
        .get("/api/logout")
        .then((response) => {
          console.log(response);
          self.$set(this, "user", response.data.user);
          this.$router.push("/").catch(() => {});
        })
        .catch((errors) => {
          router.push("/");
        });
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
    // this.getUserData();
  },
};
</script>

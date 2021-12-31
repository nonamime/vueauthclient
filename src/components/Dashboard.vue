<template>
  <div class="pt-16">
    <h2>Dashboard</h2>
    <p>User Name: {{ currentUser.username }}</p>
    <p>Display Name: {{ currentUser.displayName }}</p>
    <p>System Role: {{ systemRole }}</p>
    <p>Team Role: {{ teamRole }}</p>
    <v-form v-on:submit="logout">
      <v-btn class="loginButton" type="submit" value="Logout">Logout</v-btn>
    </v-form>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";
import { mapGetters } from "vuex";
import { TEAM_ROLE_NAME, SYSTEM_ROLE_NAME } from "../const";

export default {
  name: "Login",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentUser"]),
    systemRole() {
      return SYSTEM_ROLE_NAME[this.currentUser.role];
    },
    teamRole() {
      return TEAM_ROLE_NAME[this.currentUser.teamrole];
    }
  },
  methods: {
    logout: function () {
      let self = this;
      axios
        .get("/api/logout")
        .then((response) => {
          console.log(response);
          self.$set(this, "user", response.data.user);
          console.log("logout");
          //this.$router.push("/").catch(() => {});
          router.push("/");
        })
        .catch((errors) => {
          //router.push("/");
        });
    },
  },
  mounted() {},
};
</script>

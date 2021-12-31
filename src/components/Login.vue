<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">Login Page</h1>
    <v-spacer></v-spacer>
    <v-form v-model="valid" v-on:submit="login">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="username"
            :rules="nameRules"
            name="username"
            label="User name"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 6 characters"
            counter
            @click:append="show1 = !show1"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn class="loginButton" type="submit" value="Login">Login</v-btn>
      </v-row>
    </v-form>
    <br /><br />

    <v-row>
      <v-snackbar v-model="snackbar">
        User not found or password not match
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "Login",
  methods: {
    ...mapActions(["fetchCurrentUser"]),
    login: function (e) {
      e.preventDefault();
      let username = e.target.elements.username.value;
      let password = e.target.elements.password.value;

      let self = this;
      let data = {
        username: username,
        password: password,
      };
      axios
        .post("/api/login", data)
        .then(async (response) => {
          await this.fetchCurrentUser();
          if (response.data.teamrole == 1) {
            //supervisor
            return this.$router.push("/supervisor").catch(() => {});
          }

          this.$router.push("/dashboard").catch(() => {});
        })
        .catch((errors) => {
          console.log(errors);
          if ((errors = "Request failed with status code 401")) {
            self.$set(this, "snackbar", true);
          }
        });
    },
  },
  data: () => ({
    snackbar: false,
    show1: false,
    valid: false,
    username: "",
    nameRules: [
      (v) => !!v || "User Name is required",
      // (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      // (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
  mounted() {},
};
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin: -12px;
  justify-content: space-between;
  flex-direction: column;
  align-content: space-around;
}

/* .loginButton:hover {background-color: white;} */
</style>

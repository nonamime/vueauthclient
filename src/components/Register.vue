<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">Register Page</h1>
    <v-spacer></v-spacer>
    <v-form v-model="valid" v-on:submit="register">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            name="username"
            label="User name"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            name="name"
            label="Name"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="role"
            :items="selectOption"
            :rules="roleRules"
            :menu-props="{ maxHeight: '400' }"
            name="role"
            label="Role"
            persistent-hint
            required
          ></v-select>
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
            autocomplete="off"
            counter
            @click:append="show1 = !show1"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="confirmpassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
            :type="show2 ? 'text' : 'password'"
            name="confirmpassword"
            label="Confirm Password"
            hint="At least 6 characters"
            autocomplete="off"
            counter
            @click:append="show2 = !show2"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn
          :disabled="!valid"
          class="loginButton"
          type="submit"
          value="Register"
          >Register</v-btn
        >
      </v-row>
    </v-form>
    <br /><br />
  </v-container>
</template>

<script>
import router from "../router";
import axios from "axios";
export default {
  name: "Register",
  methods: {
    register: (e) => {
      e.preventDefault();
      let username = e.target.elements.username.value;
      let name = e.target.elements.name.value;
      let role = e.target.elements.role.value;
      let password = e.target.elements.password.value;
      let confirmpassword = e.target.elements.confirmpassword.value;
      let register = () => {
        let data = {
          username: username,
          name: name,
          role: role,
          confirm_password: confirmpassword,
          password: password,
        };
        axios
          .post("/api/register", data)
          .then((response) => {
            console.log("register");
            router.push("/");
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("Duplicate User Name");
          });
      };
      register();
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmpassword || "Password must match";
    },
  },
  data: () => ({
    selectOption: ["User", "Admin"],
    alert: false,
    show1: false,
    show2: false,
    valid: false,
    username: "",
    name: "",
    role: "",
    nameRules: [
      (v) => !!v || "Name is required",
      // (v) => v.length <= 10 || "Name must be less than 6 characters",
    ],
    usernameRules: [
      (v) => !!v || "User Name is required",
      // (v) => v.length <= 10 || "Name must be less than 6 characters",
    ],
    password: "",
    confirmpassword: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length >= 6 || "Password must at least 6 characters",
    ],
    confirmPasswordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length >= 6 || "Password must at least 6 characters",
    ],
    roleRules: [(v) => !!v || "Role is required"],
  }),
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

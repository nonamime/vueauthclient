<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">Create Project</h1>
    <v-spacer></v-spacer>
    <v-form v-model="valid" v-on:submit="register">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="projectname"
            :rules="projectnameRules"
            name="projectname"
            label="Project name"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="projectadddress"
            :rules="projectadddressRules"
            name="projectadddress"
            label="Project Address"
            autocomplete="off"
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
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  methods: {
    register: (e) => {
      e.preventDefault();
      let projectname = e.target.elements.projectname.value;
      let projectadddress = e.target.elements.projectadddress.value;
      let register = () => {
        let data = {
          projectname: projectname,
          projectadddress: projectadddress,
        };
        axios
          .post("/api/registerproject", data)
          .then((response) => {
            console.log("register");
            console.log(response);
            alert("Project created successfully.");
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("Duplicate Project Name");
          });
      };
      register();
    },
  },
  data: () => ({
    valid: false,
    projectname: "",
    projectadddress: "",
    projectnameRules: [(v) => !!v || "Project Name is required"],
    projectadddressRules: [(v) => !!v || "Project Address is required"],
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

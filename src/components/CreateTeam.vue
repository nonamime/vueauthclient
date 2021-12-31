<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">
      Create Team and Assign Worker
    </h1>

    <v-spacer></v-spacer>

    <v-form v-model="valid" v-on:submit="register">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="input.team_name"
            :rules="teamnameRules"
            name="teamname"
            label="Team Name & Desription"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="input.project_name"
            :items="projectnameOption"
            :rules="projectnameRules"
            name="projectname"
            item-value="projectid"
            item-text="projectname"
            label="Project Site Name"
            required
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="input.worker_name"
            :items="workernameOption"
            :rules="workernameRules"
            name="workername"
            item-value="employeeid"
            item-text="name"
            label="Worker Name"
            multiple
            chips
            persistent-hint
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-btn
          :disabled="!valid"
          class="loginButton"
          type="submit"
          value="Register"
          >Assign</v-btn
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
      let team = e.target.elements.teamname.value;
      let projectid = e.target.elements.projectname.value;
      let workerid = e.target.elements.workername.value;

      workerid = workerid.split(",");
      console.log(workerid);
      console.log(projectid);
      let register = () => {
        let data = {
          projectid: projectid,
          team: team,
          workerid: workerid,
        };
        axios
          .post("/api/assignproject", data)
          .then((response) => {
            console.log("register");
            console.log(response);
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("Duplicate Team Name");
          });
      };
      register();
    },
    getProjectData: function () {
      let self = this;
      axios
        .get("/api/projectname")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            self.projectnameOption.push(
              JSON.parse(JSON.stringify(response.data[i]))
            );
          }
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            console.log(errors);
          }
          this.$router.push("/").catch(() => {});
        });
    },
    getWorkerData: function () {
      let self = this;
      axios
        .get("/api/workername")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            self.workernameOption.push(
              JSON.parse(JSON.stringify(response.data[i]))
            );
          }
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            console.log(errors);
          }
          this.$router.push("/").catch(() => {});
        });
    },
  },
  mounted() {
    this.getProjectData();
    this.getWorkerData();
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmpassword || "Password must match";
    },
  },
  data: () => ({
    valid: false,
    projectnameOption: [],
    workernameOption: [],
    projectlist: [],
    multiValue: null,
    supervisorname: null,
    projectnameRules: [(v) => !!v || "Project is required to be select"],
    teamnameRules: [(v) => !!v || "Team Name & Description is required"],
    workernameRules: [
      (v) => !!v || "At Least 1 Worker is required to be select",
    ],
    input: {
      project_name: null,
      supervisor_name: null,
      worker_name: null,
      team_name: null,
    },
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

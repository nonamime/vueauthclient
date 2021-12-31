<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">
      Assign Supervisor to Team
    </h1>

    <v-spacer></v-spacer>

    <v-form v-model="valid" v-on:submit="register">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="input.team_name"
            :items="teamnameOption"
            :rules="teamnameRules"
            name="teamname"
            item-value="teamid"
            item-text="teamname"
            label="Team Name"
            persistent-hint
            @input="filtersupervisor"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="input.project_name"
            name="projectname"
            label="Project Name"
            item-value="teamid"
            autocomplete="off"
            disabled
          ></v-text-field>
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
            item-text="employeename"
            label="Supervisor Name"
            persistent-hint
            required
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

      let data = {
        projectid: projectid,
        team: team,
        workerid: workerid,
      };
      axios
        .post("/api/assignsupervisor", data)
        .then((response) => {})
        .catch((errors) => {
          console.log(errors);
          alert("Duplicate Team Name");
        });
    },
    filtersupervisor: function () {
      let self = this;
      let teamid = self.input.team_name;
      let filtersupervisor = () => {
        let data = {
          teamid: teamid,
        };
        axios
          .post("/api/filterteamworker", data)
          .then((response) => {
            self.input.project_name = response.data[0].projectname;
            for (let i = 0; i < response.data.length; i++) {
              // console.log(JSON.parse(JSON.stringify(response.data[i])));
              self.workernameOption.push(
                JSON.parse(JSON.stringify(response.data[i]))
              );
            }
          })
          .catch((errors) => {
            alert(
              "No worker found in this team, Please add worker into team at Edit Team page"
            );
          });
      };
      filtersupervisor();
    },
    getTeamData: function () {
      let self = this;
      axios
        .get("/api/teamname")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            self.teamnameOption.push(
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
    //this.getProjectData();
    this.getTeamData();
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
    teamnameOption: [],
    projectlist: [],
    workernameOption: [],
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

<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">Assign Project</h1>

    <v-spacer></v-spacer>

    <v-form v-model="valid" v-on:submit="register">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="input.project_name"
            :items="projectnameOption"
            :rules="projectnameRules"
            name="projectname"
            item-value="projectid"
            item-text="projectname"
            label="Project Name"
            @input="filtersupervisor"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="input.supervisor_name"
            :items="supervisornameOption"
            item-value="teamid"
            item-text="name"
            :rules="supervisornameRules"
            :menu-props="{ maxHeight: '400' }"
            name="supervisorname"
            label="Supervisor Name"
            persistent-hint
            @input="getWorkerData"
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
    <br />
    project id {{ input.project_name }} , team id {{ input.supervisor_name }}
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  methods: {
    register: (e) => {
      e.preventDefault();
      let projectid = e.target.elements.projectname.value;
      let supervisorid = e.target.elements.supervisorname.value;
      let workerid = e.target.elements.workername.value;

      workerid = workerid.split(",");
      console.log(workerid);
      console.log(supervisorid);
      console.log(projectid);
      let register = () => {
        let data = {
          projectid: projectid,
          supervisorid: supervisorid,
          workerid: workerid,
        };
        axios
          .post("/api/assignproject", data)
          .then((response) => {
            console.log("register");
            console.log(response);
            // alert("Success");
            // window.location.reload();
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("Duplicate Project Name");
          });
      };
      register();
    },
    filtersupervisor: function (e) {
      let self = this;
      let projectid = e;
      let filtersupervisor = () => {
        let data = {
          projectid: projectid,
        };
        axios
          .post("/api/filtersupervisor", data)
          .then((response) => {
            self.workernameOption = [];
            self.supervisornameOption = [];
            for (let i = 0; i < response.data.length; i++) {
              console.log(JSON.parse(JSON.stringify(response.data[i])));
              self.supervisornameOption.push(
                JSON.parse(JSON.stringify(response.data[i]))
              );
            }
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("Duplicate Project Name");
          });
      };
      filtersupervisor();
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
      let projectid = this.input.project_name;
      let teamid = this.input.supervisor_name;
      console.log(projectid, teamid);
      let self = this;
      let getWorkerData = () => {
        let data = {
          projectid: projectid,
          teamid: teamid,
        };
        axios
          .post("/api/getworkerdata", data)
          .then((response) => {
            self.workernameOption = [];
            for (let i = 0; i < response.data.length; i++) {
              console.log(JSON.parse(JSON.stringify(response.data[i])));

              self.projectid = JSON.parse(
                JSON.stringify(response.data[i].teamid)
              );
              self.workernameOption.push(
                JSON.parse(JSON.stringify(response.data[i]))
              );
            }
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("Duplicate Project Name");
          });
      };
      getWorkerData();
    },
  },
  mounted() {
    this.getProjectData();
    //this.getWorkerData();
  },
  data: () => ({
    valid: false,
    projectid: "",
    projectnameOption: [],
    workernameOption: [],
    supervisornameOption: [],
    multiValue: null,
    supervisorname: null,
    projectnameRules: [(v) => !!v || "Project is required to be select"],
    supervisornameRules: [(v) => !!v || "Supervisor is required to be select"],
    workernameRules: [
      (v) => !!v || "At Least 1 Worker is required to be select",
    ],
    input: {
      project_name: null,
      supervisor_name: null,
      worker_name: null,
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
</style>

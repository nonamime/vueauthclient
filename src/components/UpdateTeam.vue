<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">
      Update Current Team Information
    </h1>

    <v-spacer></v-spacer>

    <v-form v-model="valid" v-on:submit.prevent="update">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="input.team_name"
            :items="teamnameOption"
            :rules="teamnameRules"
            name="team_name"
            item-value="teamid"
            item-text="teamname"
            label="Select Team Name"
            persistent-hint
            @input="filterteammember"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="input.teamname"
            :rules="teamnameRules"
            name="teamname"
            item-text="teamname"
            label="Edit Team Name"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="input.teamdescription"
            :rules="teamnameRules"
            name="teamdescription"
            item-text="description"
            label="Edit Team Description"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="input.project_name"
            name="projectname"
            label="Display Project Name"
            autocomplete="off"
            :readonly="true"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="input.supervisor_name"
            :items="supervisornameOption"
            :rules="workernameRules"
            name="supervisorname"
            item-value="employeeid"
            item-text="employeename"
            label="Display Supervisor Name"
            multiple
            chips
            persistent-hint
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
            item-text="employeename"
            label="Display Worker Name"
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
    update: function (e) {
      e.preventDefault();
      if (
        e.target.elements.teamname.value !== this.teamname ||
        e.target.elements.teamdescription.value !== this.teamdescription
      ) {
        let updateteamname = () => {
          let data = {
            teamname: e.target.elements.teamname.value,
            teamid: e.target.elements.team_name.value,
            teamdescription: e.target.elements.teamdescription.value,
          };
          console.log(data);
          axios
            .post("/api/updateteamname", data)
            .then((response) => {
              console.log("Update Success");
              console.log(response);
            })
            .catch((errors) => {
              console.log("Cannot Update");
              console.log(errors);
              alert("Duplicate Team Name");
            });
        };
        updateteamname();
      } else {
        console.log("same team name and description");
      }
      this.updateteamsupervisorname(e);
      this.updateteammembername(e);
      window.location.reload();
    },
    updateteamsupervisorname: function (e) {
      let team = e.target.elements.teamname.value;
      let projectid = this.projectid;
      let workerid = JSON.stringify(this.input.supervisor_name.sort());

      if (workerid == JSON.stringify(this.comparesupervisorname.sort())) {
        console.log("Same");
      } else {
        // to check which worker is deleted
        let array1 = this.comparesupervisorname.filter(
          (val) => !workerid.includes(val)
        );
        // to check which worker to insert
        let array2 = this.input.supervisor_name
          .sort()
          .filter((val) => !this.comparesupervisorname.includes(val));
        if (array1.length != 0) {
          workerid = array1.toString().split(",");
          let update = () => {
            let data = {
              projectid: projectid,
              teamid: e.target.elements.team_name.value,
              team: team,
              workerid: workerid,
            };
            console.log(data);
            axios
              .post("/api/deleteteamsupervisor", data)
              .then((response) => {
                console.log("Success");
                console.log(response);
              })
              .catch((errors) => {
                console.log("Cannot Delete Team Member");
                console.log(errors);
                alert("Cannot Delete Team Member");
              });
          };
          update();
        }
        if (array2.length != 0) {
          workerid = array2.toString().split(",");
          let update = () => {
            let data = {
              projectid: projectid,
              teamid: e.target.elements.team_name.value,
              team: team,
              workerid: workerid,
            };
            console.log(data);
            axios
              .post("/api/insertteamsupervisor", data)
              .then((response) => {
                console.log("Success");
                console.log(response);
              })
              .catch((errors) => {
                console.log("Cannot insert Team Member");
                console.log(errors);
                alert("Cannot insert Team Member");
              });
          };
          update();
        }
      }
    },
    updateteammembername: function (e) {
      let team = e.target.elements.teamname.value;
      let projectid = this.projectid;
      let workerid = JSON.stringify(this.input.worker_name.sort());

      if (workerid == JSON.stringify(this.compareworkername.sort())) {
        console.log("Same");
      } else {
        // to check which worker is deleted
        let array1 = this.compareworkername.filter(
          (val) => !workerid.includes(val)
        );
        // to check which worker to insert
        let array2 = this.input.worker_name
          .sort()
          .filter((val) => !this.compareworkername.includes(val));
        if (array1.length != 0) {
          workerid = array1.toString().split(",");

          let update = () => {
            let data = {
              projectid: projectid,
              teamid: e.target.elements.team_name.value,
              team: team,
              workerid: workerid,
            };
            axios
              .post("/api/deleteteammember", data)
              .then((response) => {
                console.log("Success");
                console.log(response);
              })
              .catch((errors) => {
                console.log("Cannot Delete Team Member");
                console.log(errors);
                alert("Cannot Delete Team Member");
              });
          };
          update();
        }
        if (array2.length != 0) {
          workerid = array2.toString().split(",");
          let update = () => {
            let data = {
              projectid: projectid,
              teamid: e.target.elements.team_name.value,
              team: team,
              workerid: workerid,
            };
            axios
              .post("/api/insertteammember", data)
              .then((response) => {
                console.log("Success");
                console.log(response);
              })
              .catch((errors) => {
                console.log("Cannot insert Team Member");
                console.log(errors);
                alert("Cannot insert Team Member");
              });
          };
          update();
        }
      }
    },
    emptyForm: function () {
      //this.input.team_name = null
      this.input.teamname = null;
      this.input.teamdescription = null;
      this.input.project_name = null;
      this.input.supervisor_name = [];
      this.input.worker_name = [];
      this.compareworkername = [];
      this.comparesupervisorname = [];
      this.supervisornameOption = [];
    },
    filterteammember: function (e) {
      let self = this;
      let teamid = self.input.team_name;

      let filterteammember = () => {
        let data = {
          teamid: teamid,
        };
        axios
          .post("/api/filterteamworker", data)
          .then((response) => {
            if (response.data.length != 0) {
              self.input.worker_name = [];
              self.input.supervisor_name = [];
              this.compareworkername = [];
              this.comparesupervisorname = [];
              this.supervisornameOption = [];
              this.getSupervisorData();
              this.getWorkerData();
              self.projectid = response.data[0].projectid;
              self.input.teamname = response.data[0].teamname;
              self.input.project_name = response.data[0].projectname;
              self.input.teamdescription = response.data[0].description;
              self.teamdescription = response.data[0].description;
              self.teamname = response.data[0].teamname;
              console.log(response.data);
              for (let i = 0; i < response.data.length; i++) {
                self.input.worker_name.push(response.data[i].employeeid);
                console.log(self.input.worker_name);
                self.supervisornameOption.push(response.data[i]);
              }
              this.compareworkername = self.input.worker_name;
              //console.log(this.compareworkername)
            } else {
              axios.post("/api/teaminfo", data).then((response) => {
                self.input.worker_name = [];
                self.input.supervisor_name = [];
                this.compareworkername = [];
                this.comparesupervisorname = [];
                this.supervisornameOption = [];
                //this.getSupervisorData();
                this.getWorkerData();
                self.projectid = response.data[0].projectid;
                self.input.teamname = response.data[0].teamname;
                self.input.project_name = response.data[0].projectname;
                self.input.teamdescription = response.data[0].description;
                self.teamdescription = response.data[0].description;
                self.teamname = response.data[0].teamname;
                //console.log(response);
              });
            }
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("Current Worker Name List Error");
          });
      };
      filterteammember();
    },
    getSupervisorData: function () {
      let self = this;
      let filtersupervisor = () => {
        let data = {
          teamid: self.input.team_name,
        };
        axios
          .post("/api/teamsupervisor", data)
          .then((response) => {
            if (response.data.length == 0) {
              alert(
                "This Team does not have Supervisor. Will direct to assign Supervisor page to assign Supervisor"
              );
              this.$router.push("/assignsupervisor").catch(() => {});
            }
            for (let i = 0; i < response.data.length; i++) {
              self.input.supervisor_name.push(response.data[i].employeeid);
            }
            this.comparesupervisorname = self.input.supervisor_name;
          })
          .catch((errors) => {
            console.log("Cannot Register");
            console.log(errors);
            alert("supervisor name list error");
          });
      };
      filtersupervisor();
    },
    getWorkerData: function () {
      let self = this;
      axios
        .get("/api/employeename")
        .then((response) => {
          console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            self.workernameOption.push(response.data[i]);
          }
        })
        .catch((errors) => {
          console.log("Cannot Register");
          console.log(errors);
          alert("worker name list error");
        });
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
    this.getTeamData();
  },
  data: () => ({
    compareworkername: [],
    comparesupervisorname: [],
    valid: false,
    projectid: null,
    teamname: null,
    teamdescription: null,
    workernameOption: [],
    supervisornameOption: [],
    teamnameOption: [],
    supervisorname: null,
    // projectnameRules: [(v) => !!v || "Project is required to be select"],
    teamnameRules: [(v) => !!v || "Team Name & Description is required"],
    workernameRules: [
      (v) => !!v || "At Least 1 Worker is required to be select",
    ],
    input: {
      project_name: null,
      supervisor_name: [],
      worker_name: [],
      team_name: null,
      teamname: null,
      teamdescription: null,
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

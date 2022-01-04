<template>
  <div data-app>
    <v-col>
      <h1>Supervisor Page</h1>
      <br />
      <v-container class="supervisor">
        <v-form v-model="checkvalid" v-on:submit="update">
          <v-row align="center">
            <v-col cols="12" sm="6">
              <div class="d-flex align-content-center">
                <v-icon large color="green darken-2"> mdi-domain </v-icon>
                <v-card-title v-text="'Project Site Name'"></v-card-title>
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="selectedTeam"
                :items="selectOption"
                label="Select"
                hint="Select Project Site"
                persistent-hint
                name="projectsite"
                @input="filterteammember"
                required
              >
                <template slot="item" slot-scope="data">
                  {{ data.item.projectname }} - {{ data.item.teamname }}
                </template>
                <template slot="selection" slot-scope="data">
                  {{ data.item.projectname }} - {{ data.item.teamname }}
                </template>
              </v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="d-flex align-content-center">
                <v-icon large color="green darken-2"> mdi-account-multiple  </v-icon>
                <v-card-title v-text="'Select Worker'"></v-card-title>
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="worker_name"
                :items="workernameOption"
                name="workername"
                item-value="employeeid"
                item-text="employeename"
                label="Display Worker Name"
                multiple
                persistent-hint
              ></v-select>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12" sm="6">
              <div class="d-flex align-content-center">
                <v-icon large color="green darken-2"> mdi-account-arrow-right </v-icon>
                <v-card-title
                  v-text="'Select Start Time'"
                ></v-card-title>
              </div>
            </v-col>

            <v-col cols="12" sm="3" md="3">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :return-value.sync="datein"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="datein"
                    label="Select date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>

                <v-date-picker v-model="datein" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu1 = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu1.save(datein)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-dialog
                ref="dialog1"
                v-model="modal1"
                :return-value.sync="timein"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="timein"
                    label="Select time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="modal1"
                  v-model="timein"
                  full-width
                  format="24hr"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal1 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog1.save(timein)"
                  >
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12" sm="6">
              <div class="d-flex align-content-center">
                <v-icon large color="green darken-2">
                  mdi-account-arrow-left
                </v-icon>
                <v-card-title v-text="'Select End Time'"></v-card-title>
              </div>
            </v-col>

            <v-col cols="12" sm="3" md="3">
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :return-value.sync="dateout"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateout"
                    label="Select date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>

                <v-date-picker v-model="dateout" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu2 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu2.save(dateout)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-dialog
                ref="dialog2"
                v-model="modal2"
                :return-value.sync="timeout"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="timeout"
                    label="Select time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="modal2"
                  v-model="timeout"
                  full-width
                  format="24hr"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal2 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog2.save(timeout)"
                  >
                    OK
                  </v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <br />
          <v-btn class="loginButton" type="submit" value="Register"
            >Submit</v-btn
          >
        </v-form>
      </v-container>
    </v-col>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/header.vue";
import axios from "axios";
import { mdiAccountArrowRight } from "@mdi/js";

export default {
  name: "Supervisor",
  components: {
    Header,
  },
  title: "Supervisor Time in/out Page",
  data() {
    return {
      selectedTeam: null,
      projectid: null,
      multiValue: null,
      select: null,
      worker_name: null,
      checkvalid: false,
      workernameOption: [],
      selectOption: [],
      datein: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateout: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu1: false,
      modal1: false,
      modal2: false,
      menu2: false,
      timein: null,
      timeout: null,
    };
  },
  methods: {
    update: function (e) {
      e.preventDefault();
      var workerid = this.worker_name.toString().split(",");
      let data = {
        teamid: this.selectedTeam.id,
        projectid: this.projectid,
        workerid: workerid,
        datein: this.datein,
        timein: this.timein,
        dateout: this.dateout,
        timeout: this.timeout,
      };
      axios
        .post("/api/insertworkertime", data)
        .then((response) => {})
        .catch((errors) => {
          //console.log("Cannot Update");
          console.log(errors);
          alert("Allow one worker and one project at a time");
        });
    },
    getUserData: function () {
      axios
        .get("/api/getTeam")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.selectOption.push(response.data[i]);
          }
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            console.log(errors);
          }
        });
    },
    filterteammember: function (e) {
      let data = {
        teamid: this.selectedTeam.id,
      };
      axios
        .post("/api/filterteamworker", data)
        .then((response) => {
          this.workernameOption = [];
          this.worker_name = [];
          if (response.data.length != 0) {
            this.projectid = response.data[0].projectid;
            for (let i = 0; i < response.data.length; i++) {
              this.workernameOption.push(response.data[i]);
            }
          }
        })
        .catch((errors) => {
          console.log(errors);
          alert("Fetch Worker Name List Error");
        });
    },
  },
  mounted() {
    this.getUserData(); // router at here
  },
};
</script>

<style>
.supervisor {
  border: 3px solid #ddd;
  padding: 10px;
  font-size: 20px;
  text-align: center;
}
.button {
  background-color: grey; /* Green */
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.submitButton {
  border-radius: 4px;
}
</style>

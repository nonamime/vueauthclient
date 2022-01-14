<template>
  <v-card flat class="pa-4">
    <v-dialog
      ref="dateMenu"
      v-model="reportDateMenuDialog"
      :return-value.sync="reportDate"
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="reportDate"
          label="Select date"
          readonly
          v-bind="attrs"
          v-on="on"
          class="px-16"
        ></v-text-field>
      </template>

      <v-date-picker v-model="reportDate" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="reportDateMenuDialog = false">
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="
            $refs.dateMenu.save(reportDate);
            loadWithNewDate();
            reportDateMenuDialog = false;
          "
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
    <table id="customers">
      <!-- <tr>
        <th style="background-color: black" colspan="3">
          {{ site.projectname }}
        </th>
      </tr> -->
      <tr>
        <th>Site</th>
        <th>Worker Name</th>
        <th>Worker In Time</th>
        <th>Worker Out Time</th>
      </tr>

      <tr v-for="(team, index) in sites" :key="index">
        <td>
          {{ team.projectname }}
        </td>
        <td>
          {{ team.employeename }}
        </td>
        <td v-if="team.clockin">
          {{ team.datein + " " + team.clockin }}
        </td>
        <td v-else>Not set</td>

        <td v-if="team.clockout">
          {{ team.dateout + " " + team.clockout }}
        </td>
        <td v-else>Not set</td>
      </tr>
      <br />
    </table>

    <v-btn class="button my-4">Print the entire page</v-btn>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      sites: [],
      reportDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      reportDateMenuDialog: false
    };
  },
  computed: {},
  watch: {
    reportDate(reportDate) {
      // console.log(reportDate);
      // this.getUserData();
    }
  },
  methods: {
    loadWithNewDate() {
      this.getUserData();
    },
    getUserData: function() {
      let self = this;
      axios
        .post("/api/reportlist", { date: this.reportDate })
        .then(({ data }) => {
          self.sites = data;
        })
        .catch(errors => {
          if ((errors = "Request failed with status code 401")) {
            console.log(errors);
          }
        });
    }
  },
  mounted() {
    this.getUserData(); // router at here
  }
};
</script>

<style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  padding-bottom: 20px;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: green;
  color: white;
}
.printButton {
  border-radius: 4px;
}
</style>

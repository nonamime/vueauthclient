<template>
  <v-card class="pa-4">
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
    };
  },
  methods: {
    getUserData: function () {
      let self = this;
      axios
        .get("/api/reportlist")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            self.sites.push(response.data[i]);
          }
        })
        .catch((errors) => {
          if ((errors = "Request failed with status code 401")) {
            console.log(errors);
          }
        });
    },
  },
  mounted() {
    this.getUserData(); // router at here
  },
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
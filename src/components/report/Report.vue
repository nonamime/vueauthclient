<template>
  <div data-app>
    <v-col style="text-align: center">
      <v-container>
        <h1>Report Page</h1>
        <v-col
          ><h2>
            Date :
            {{ dateOfToday }}
          </h2></v-col
        ></v-container
      >
      <v-container>
        <ReportList />
      </v-container>
    </v-col>
  </div>
</template>

<script>
import ReportList from "@/components/report/ReportList.vue";

export default {
  name: "Report",
  components: {
    ReportList,
  },
  data() {
    return {};
  },
  computed: {
    dateOfToday() {
      return new Date().toLocaleString("en-SG", {
        weekday: "short", // long, short, narrow
        day: "numeric", // numeric, 2-digit
        year: "numeric", // numeric, 2-digit
        month: "long", // numeric, 2-digit, long, short, narrow)
      });
    },
  },
};
</script>

<style>
</style>
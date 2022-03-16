<template>
  <v-container class="my-16">
    <v-sheet elevation="6" class="mt-4 py-6 px-4">
      <v-row justify="space-between">
        <v-col cols="12" style="flex-grow: 100">
          <h1>Worker Time Sheet</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!-- <h2>
            Date :
            {{ dateOfToday }}
          </h2> -->
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <ReportList />
          <whatsapp-report reportDate="2022-01-21" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import ReportList from "@/components/report/ReportList.vue";
import WhatsappReport from './whatsappReport.vue';

export default {
  name: "Report",
  components: {
    ReportList,
    WhatsappReport
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
        month: "long" // numeric, 2-digit, long, short, narrow)
      });
    }
  }
};
</script>

<style></style>

<template>
  <v-btn @click="retrieveReport">Generate whatsapp report</v-btn>
</template>

<script>
import axios from "axios";
export default {
  props: {
    reportDate: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      report: []
    };
  },
  methods: {
    generateReport(data) {
      data.forEach(e => {
        this.report.push(`*${e.key}*\n`);
        e.items.forEach(i => {
          this.report.push(`${i.employeename}\n`);
        });

        this.report.push(`\n`);
      });

      console.log(this.report.join(""));
    },
    retrieveReport() {
      let self = this;
      axios
        .post("/api/reportlist", { date: this.reportDate, whatsapp: "true" })
        .then(({ data }) => {
          this.generateReport(data);
        })
        .catch(errors => {
          if ((errors = "Request failed with status code 401")) {
            console.log(errors);
          }
        });
    }
  }
};
</script>

<style></style>

<template>
  <v-container class="my-16">
    <v-sheet elevation="6" class="mt-4 py-8 px-16">
      <v-row justify="space-between" class="mb-8">
        <v-col cols="12" style="flex-grow: 100">
          <h1>Edit Worker Time Sheet</h1>
        </v-col>
      </v-row>
      <v-text-field
        outlined
        v-model="projectName"
        label="Project"
        disabled
      ></v-text-field>
      <v-text-field
        outlined
        v-model="teamName"
        label="Team"
        disabled
      ></v-text-field>
      <v-text-field
        outlined
        v-model="employeeName"
        label="Employee"
        disabled
      ></v-text-field>
      <v-row justify="space-between">
        <v-col cols="6">
          <v-dialog
            ref="dialog1"
            v-model="modal1"
            :return-value.sync="datein"
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="datein"
                label="Select start date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker v-model="datein" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal1 = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog1.save(datein)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="6">
          <v-dialog
            ref="dialog2"
            v-model="modal2"
            :return-value.sync="clockin"
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="clockin"
                label="Select start time"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>

            <v-time-picker
              v-model="clockin"
              width="290"
              class="mb-3"
              format="24hr"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal2 = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog2.save(clockin)">
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col cols="6">
          <v-dialog
            ref="dialog3"
            v-model="modal3"
            :return-value.sync="dateout"
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateout"
                label="Select end date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker v-model="dateout" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal3 = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.modal3.save(dateout)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="6">
          <v-dialog
            ref="dialog4"
            v-model="modal4"
            :return-value.sync="clockout"
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="clockout"
                label="Select end time"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>

            <v-time-picker
              v-model="clockout"
              width="290"
              class="mb-3"
              format="24hr"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal4 = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog4.save(clockout)">
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-text-field outlined v-model="remark" label="Remark"></v-text-field>
      <v-btn
        color="primary"
        @click="
          () => {
            $router.push('/timesheet');
          }
        "
      >
        Back to timesheet
      </v-btn>
      <v-btn color="primary" @click="editTimesheet">
        Submit
      </v-btn>
    </v-sheet>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      projectName: "",
      teamName: "",
      employeeName: "",
      datein: "",
      clockin: "",
      dateout: "",
      clockout: "",
      remark: "",
      remarkFlag: false,
      valueHasChangedFlag: false,
      afterApiCalled: false,

      oriValue: {
        datein: "",
        clockin: "",
        dateout: "",
        clockout: "",
        remark: ""
      }
    };
  },
  watch: {
    datein(_, oldVal) {
      if (oldVal) {
        this.alertToRemark();
      }
    },
    clockin(_, oldVal) {
      if (oldVal) {
        this.alertToRemark();
      }
    },
    dateout(_, oldVal) {
      if (oldVal) {
        this.alertToRemark();
      }
    },
    clockout(_, oldVal) {
      if (oldVal) {
        this.alertToRemark();
      }
    }
  },
  methods: {
    remindToRemark() {
      this.remarkFlag = false;
      this.alertToRemark();
    },
    alertToRemark() {
      if (!this.afterApiCalled || this.remarkFlag) {
        return;
      }

      this.remarkFlag = true;
      alert(
        "Please fill in the reason for changing existing value in remark column."
      );
    },
    checkIfOriValueHasChanged() {
      for (const prop in this.oriValue) {
        if (this.oriValue[prop] && this.oriValue[prop] != this.$data[prop]) {
          this.remarkFlag = true;
          return;
        }
      }

      this.remarkFlag = false;
    },
    getTimesheet() {
      axios
        .post("/api/gettimesheet", { id: this.$route.params.id })
        .then(({ data }) => {
          this.projectName = data.projectname;
          this.teamName = data.teamname;
          this.employeeName = data.employeename;
          this.datein = this.oriValue.datein = data.datein;
          this.clockin = this.oriValue.clockin = data.clockin;
          this.dateout = this.oriValue.dateout = data.dateout;
          this.clockout = this.oriValue.clockout = data.clockout;
          this.remark = this.oriValue.remark = data.remark;
          this.afterApiCalled = true;
        })
        .catch(errors => {
          console.log(errors);
        });
    },

    editTimesheet() {
      this.checkIfOriValueHasChanged();
      if (this.remarkFlag && !this.remark) {
        this.remindToRemark();
        return;
      } 
      if (!this.remarkFlag) {
        alert("No value has changed, edit and submit again.");
        return; 
      }

      axios
        .post("/api/edittimesheet", {
          id: this.$route.params.id,
          datein: this.datein,
          clockin: this.clockin,
          dateout: this.dateout,
          clockout: this.clockout,
          remark: this.remarkFlag ? this.remark : ""
        })
        .then(({ data }) => {
          alert("Successfully edit timesheet.");
          this.$router.push("/timesheet");
        });
    }
  },
  created() {
    this.getTimesheet();
  }
};
</script>

<style></style>

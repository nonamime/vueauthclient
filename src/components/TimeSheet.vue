<template>
  <v-container class="my-16">
    <v-sheet elevation="6" class="mt-4 py-6 px-4">
      <v-row justify="space-between">
        <v-col cols="12" style="flex-grow: 100">
          <h1>Worker Time Sheet</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer cols="12"></v-spacer>
        <v-col sm="12" md="3">
          <v-btn
            color="primary"
            @click="$router.push({ path: '/addtimesheet' })"
          >
            Create Worker Start time
          </v-btn>
        </v-col>
        <v-col sm="12" md="3">
          <v-btn color="primary" @click="batchUpdateEndTime">
            Batch add end time
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        v-model="selected"
        :single-select="false"
        show-select
        item-key="id"
        :items="timeSheetData"
        :headers="timeSheetTableHeader"
        :items-per-page="15"
        class="ma-4"
        mobile-breakpoint="850"
        calculate-widths
        :item-class="itemRowBackground"
      >
        <template v-slot:[`item.option`]="{ item }">
          <template v-if="item.isSelectable">
            <v-btn
              :disabled="item.snooze"
              class="ma-1"
              color="primary"
              @click="editClick(item.id)"
            >
              Edit
            </v-btn>
            <v-btn
              class="ma-1"
              color="red accent-2"
              @click="(deleteDialog = true), (deleteItemId = item.id)"
            >
              Delete
            </v-btn>
          </template>
        </template>
      </v-data-table>
    </v-sheet>
    <!--  -->
    <v-dialog v-model="deleteDialog">
      <v-card min-height="400" min-width="400" class="pa-6">
        <h1 class="mb-10">Remark for deletion</h1>
        <v-text-field
          outlined
          v-model="deleteRemark"
          label="Remark"
        ></v-text-field>
        <v-btn class="mr-2" color="red accent-2" @click="deleteClick()"
          >Submit Delete</v-btn
        >
        <v-btn class="mr-2" color="amber darken-2" @click="clearDeleteDialog()"
          >Cancel
        </v-btn>
      </v-card>
    </v-dialog>

    <v-dialog v-model="batchEndTimeDialog" max-width="500px">
      <v-stepper v-model="currentStep">
        <v-stepper-header>
          <v-stepper-step :complete="currentStep > 1" step="1">
            Select Date
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="currentStep > 2" step="2">
            Select Time
          </v-stepper-step>

          <v-stepper-step :complete="currentStep > 3" step="3">
            Submit
          </v-stepper-step>
        </v-stepper-header>

        <!--  step 1  -->
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card flat elevation="0" class="mb-12" height="300px">
              <v-date-picker
                v-model="dateout"
                show-adjacent-months
                no-title
                scrollable
                width="290"
              >
              </v-date-picker>
            </v-card>

            <v-btn color="primary" @click="currentStep = 2">
              Select time
            </v-btn>
            <v-btn text @click="clearEndtimeAndDialog">
              Cancel
            </v-btn>
          </v-stepper-content>

          <!--  step 2  -->
          <v-stepper-content step="2">
            <v-card flat class="mb-12" width="300" height="500px">
              <v-time-picker
                v-model="clockout"
                width="290"
                class="mb-3"
                format="24hr"
              >
              </v-time-picker>

              <v-row>
                <v-col cols="12" class="mx-2">
                  <v-btn color="primary" @click="currentStep = 1">
                    Back to select date
                  </v-btn>
                </v-col>
                <v-spacer />

                <v-col cols="12" class="mx-2">
                  <v-btn color="primary" @click="verifyStep">
                    Confirm and submit
                  </v-btn>
                </v-col>

                <v-spacer />

                <v-col cols="12" class="mx-2">
                  <v-btn text @click="clearEndtimeAndDialog">
                    Cancel
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-stepper-content>

          <!--  step3 -->
          <v-stepper-content step="3">
            <v-card flat width="300" height="300">
              Set end time as:
              <h1>{{ dateout }} {{ clockout }}</h1>
              <v-row class="mt-10">
                <v-col cols="12" class="mx-2">
                  <v-btn color="primary" @click="submitBatchEndtime">
                    Submit end time
                  </v-btn>
                </v-col>
                <v-col cols="12" class="mx-2">
                  <v-btn text @click="clearEndtimeAndDialog">
                    Cancel
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      clockout: "",
      dateout: "",
      batchEndTimeDialog: false,
      deleteDialog: false,
      deleteRemark: "",
      deleteItemId: "",
      selected: [],
      timeSheetData: [],
      timeSheetTableHeader: [
        { text: "Site", value: "projectname", width: "10px" },
        { text: "Team", value: "teamname", width: "20px" },
        { text: "Name", value: "employeename" },
        { text: "Start Date", value: "datein", width: "20px" },
        { text: "Start Time", value: "clockin", width: "20px" },
        { text: "End Date", value: "dateout", width: "20px" },
        { text: "End Time", value: "clockout", width: "20px" },
        { text: "Remark", value: "remark", width: "150px" },
        // { text: "Updated by", value: "updated_by" },
        // { text: "Created at", value: "created_at" },
        // { text: "Created by", value: "created_by" },
        { text: "Operation", value: "option", align: "center" }
      ],

      currentStep: 1,
      steps: 3
    };
  },
  watch: {},
  methods: {
    itemRowBackground(item) {
      return item.isSelectable ? "" : "grey-bg";
    },
    verifyStep() {
      if (!this.dateout) {
        this.currentStep = 1;
        return;
      }
      if (!this.clockout) {
        this.currentStep = 2;
        return;
      }
      this.currentStep = 3;
    },
    clearEndtimeAndDialog() {
      this.clockout = "";
      this.dateout = "";
      this.currentStep = 1;
      this.batchEndTimeDialog = false;
    },
    clearDeleteDialog() {
      this.deleteDialog = false;
      this.deleteItemId = "";
      this.deleteRemark = "";
    },

    editClick(id) {
      this.$router.push("/edittimesheet/" + id);
    },
    deleteClick() {
      if (!this.deleteRemark) {
        alert("Please fill in remark to delete.");
        return;
      }
      axios
        .post("/api/deletetimesheet", {
          id: this.deleteItemId,
          remark: this.deleteRemark
        })
        .then(() => {
          this.clearDeleteDialog();
          this.getTimesheetList();
          alert("Successfully delete timesheets.");
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    batchUpdateEndTime() {
      if (this.selected.length < 1) {
        alert("Please select user to batch adding end time.");
        return;
      }
      for (const selectedRow of this.selected) {
        if (selectedRow.dateout) {
          alert(
            "One of the selected row's end date/time has been set, please deselect it and retry again."
          );
          return;
        }
      }
      this.batchEndTimeDialog = true;
    },
    getTimesheetList() {
      axios
        .get("/api/gettimesheetbysupervisor")
        .then(({ data }) => {
          this.timeSheetData = data.map(x => ({
            ...x,
            isSelectable: !x.remark
          }));
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    submitBatchEndtime() {
      axios
        .post("/api/batchupdateendtime", {
          timesheetIds: this.selected.map(x => x.id),
          dateout: this.dateout,
          clockout: this.clockout
        })
        .then(() => {
          this.clearEndtimeAndDialog();
          this.getTimesheetList();
          alert("Successfully update timesheets.");
        })
        .catch(errors => {
          console.log(errors);
        });
    }
  },
  mounted() {
    this.getTimesheetList();
  }
};
</script>

<style>
.grey-bg {
  background-color: #bdbdbd;
}
</style>

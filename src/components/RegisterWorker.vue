<template>
  <v-container>
    <h1 style="padding-top: 100px; padding-bottom: 100px">
      Register User as Worker
    </h1>
    <v-spacer></v-spacer>
    <v-form v-model="valid" v-on:submit="register">
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-text-field
            v-model="nickname"
            :rules="workernameRules"
            label="Nickname"
            autocomplete="off"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-select
            v-model="userid"
            :items="workernameOption"
            :rules="workernameRules"
            name="workername"
            item-value="userid"
            item-text="name"
            label="Display Worker Name"
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
          >Register</v-btn
        >
      </v-row>
    </v-form>
    <br /><br />
  </v-container>
</template>

<script>
import router from "../router";
import axios from "axios";
export default {
  name: "Register",
  data: () => ({
    valid: false,
    nickname: null,
    userid: null,
    workernameOption: [],
    workernameRules: [
      (v) => !!v || "At Least 1 Worker is required to be select",
    ],
  }),
  methods: {
    register: function (e) {
      e.preventDefault();

      let data = {
        nickname: this.nickname,
        userid: this.userid,
      };
      axios
        .post("/api/registeremployee", data)
        .then((response) => {
          console.log("register");
          router.push("/");
        })
        .catch((errors) => {
          console.log("Cannot Register");
          console.log(errors);
          alert("Duplicate User Name");
        });
      console.log(data);
    },
    getWorkerData: function () {
      let self = this;
      axios
        .get("/api/workername")
        .then((response) => {
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
  },
  mounted() {
    this.getWorkerData();
  },
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

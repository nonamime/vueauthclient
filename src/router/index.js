import Vue from "vue"
import Router from "vue-router"
import Login from "@/components/Login"
import Dashboard from "@/components/Dashboard"
import Register from "@/components/Register"
import RegisterProject from "@/components/RegisterProject"
import RegisterWorker from "@/components/RegisterWorker"
import UserDashboard from "@/components/UserDashboard"
import CreateTeam from "@/components/CreateTeam"
import AssignSupervisor from "@/components/AssignSupervisor"
import UpdateTeam from "@/components/UpdateTeam"
import Supervisor from "@/components/supervisor/Supervisor"
import Report from "@/components/report/Report"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Main",
      component: Dashboard
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/userdashboard",
      name: "UserDashboard",
      component: UserDashboard
    },
    {
      path: "/registerproject",
      name: "RegisterProject",
      component: RegisterProject
    },
    {
      path: "/registerworker",
      name: "RegisterWorker",
      component: RegisterWorker
    },
    {
      path: "/createteam",
      name: "CreateTeam",
      component: CreateTeam 
    },
    {
      path: "/assignsupervisor",
      name: "AssignSupervisor",
      component: AssignSupervisor
    },
    {
      path: "/updateteam",
      name: "UpdateTeam",
      component: UpdateTeam
    },
    {
      path: "/supervisor",
      name: "Supervisor",
      component: Supervisor
    },
    {
      path: "/report",
      name: "Report",
      component: Report
    }
  ]
})

import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '@/components/Home'
import Signin from '@/components/users/Signin'
import Signup from '@/components/users/Signup'
import Profile from '@/components/users/Profile'
import Createproject from '@/components/projects/Createproject'
import Projects from '@/components/projects/Projects'
import Project from '@/components/projects/Project'
import Edit from '@/components/users/Edit'
import Calendar from '@/components/Calendar/Calendar'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar
  },
  {
    path: '/profile/edit',
    name: 'edit',
    component: Edit
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/project/:id',
    props: true,
    name: 'Project',
    component: Project
  },
  {
    path: '/createproject/new',
    name: 'Createproject',
    component: Createproject
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

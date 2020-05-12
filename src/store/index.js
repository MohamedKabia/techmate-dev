import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedProjects: null,
    userProjects: null,
    user: null,
    loading: false,
    error: null,
    profile: null,
    message: null,
    likedProjects: [],
    registeredProjects: [],
    calEvent: null

  },
  mutations: {
    createProject (state, payload) {
      state.loadedProjects.push(payload)
    },
    setRegisteredProjects (state, payload) {
      state.registeredProjects.push(payload)
      console.log('commited')
    },
    setLikedProjects (state, payload) {
      state.likedProjects.push(payload)
      console.log(state.likedProjects)
    },
    setUser (state, payload) {
      state.user = payload
    },

    setLoading (state, payload) {
      state.loading = payload
    },

    setError (state, payload) {
      state.error = payload
    },
    setProfile (state, payload) {
      state.profile = payload
    },
    clareError (state) {
      state.error = null
    },
    setUserProject (state, payload) {
      state.userProjects = payload
    },
    setLoadedProjects (state, payload) {
      state.loadedProjects = payload
    },
    setMessage (state, payload) {
      state.message = payload
    },

    // calendar
    setEvents (state, payload) {
      state.calEvent = payload
    }
  },
  actions: {
    getMessage ({ commit }, payload) {
      commit('setMessage', payload)
    },
    likeProject ({ commit }, payload) {
      const id = payload
      const likedProjects = this.state.likedProjects
      const index = likedProjects.indexOf(id)

      if (index > -1) {
        likedProjects.splice(index, 1)
        console.log(this.state.likedProjects)
        firebase.database().ref('projects').child(id).once('value')
          .then(data => {
            let project = data.val()
            let like = project.likes - 1
            update(like, likedProjects)
          })
      } else {
        commit('setLikedProjects', id)
        console.log('in else', this.state.likedProjects)
        firebase.database().ref('projects').child(id).once('value')
          .then(data => {
            let project = data.val()
            let like = project.likes + 1
            update(like, likedProjects)
          })
      }
      function update (like, likedProjects) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            let userId = user.uid
            console.log('try', likedProjects)
            firebase.database().ref('projects').child(userId).update({ likes: like })
            firebase.database().ref('likedProjects').child(userId)
              .update(likedProjects)
              .then(() => {
                commit('setMessage', 'liked sucessfully')
              })
              .catch(error => {
                commit('setMesage', 'error:', error.message)
              })
          }
        })
      }
    },
    updateProfile ({ commit }, payload) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const key = user.uid
          const fileName = payload.profileImage.name
          const ext = fileName.slice(fileName.lastIndexOf('.'))
          const uploadTask = firebase.storage().ref('profilePictures/' + key + '.' + ext).put(payload.profileImage)
          uploadTask.on('state_changed', function (snapshot) {

          },
          error => {
            commit('setMessage', error.message)
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              firebase.database().ref('users').child(key).update({
                name: payload.name,
                userName: payload.userName,
                bio: payload.bio,
                proto: payload.photo,
                gender: payload.gender,
                website: payload.website,
                profileImage: downloadURL
              })
                .then(data => {
                  const profiledata = data
                  commit('setProfile', profiledata)
                  commit('setMessage', 'Done')
                })
                .catch(error => {
                  commit('setMessage', error.message)
                })
            })
          })
        }
      })
    },

    getUser ({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit('setUser', user)
          console.log('confirm')
          const uid = user.uid
          console.log('user is', user, uid)
          if (user === null || user === undefined) {
            commit('setMessage', 'please login')
          }
          firebase.database().ref('calEvents').child(uid).once('value')
            .then(data => {
              let events = []
              const eventsdata = data.val()
              for (let eve in eventsdata) {
                eventsdata[eve].id = eve
                events.push(eventsdata[eve])
              }
              commit('setEvents', events)
            })
            .catch(error => {
              commit('setMessage', error.message)
            })

          // grt user liked and registered projects
          firebase.database().ref('regisreredProjects').child(uid).once('value')
            .then(data => {
              let regisreredProjects = data.val()
              console.log(regisreredProjects)
              for (let project in regisreredProjects) {
                console.log(regisreredProjects[project])
                commit('setRegisteredProjects', regisreredProjects[project])
              }
            })
            .catch(error => {
              console.log('error', error)
            })

          firebase.database().ref('likedProjects').child(uid).once('value')
            .then(data => {
              let likeds = data.val()
              for (let like in likeds) {
                commit('setLikedProjects', likeds[like])
              }
            })
            .catch(error => {
              console.log('error', error)
            })
        }
      })
    },
    getUserProfile ({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userId = user.uid
          firebase.database().ref('users').child(userId).once('value')
            .then(data => {
              const profileData = data.val()
              commit('setProfile', profileData)
            })
            .catch(error => {
              console.log('error', error)
              commit('setMessage', error.message)
            })
        }
      })
    },
    loadedProjects ({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('projects').once('value')
        .then(data => {
          commit('setLoading', false)
          const projects = []
          const obj = data.val()
          for (let key in obj) {
            let creatorId = obj[key].creatorId
            if (creatorId !== undefined) {
              firebase.database().ref('users').child(creatorId).once('value')
                .then(data => {
                  var profileData = data.val()
                  projects.push({
                    creatorName: profileData.userName,
                    creatorImage: profileData.profileImage,
                    id: key,
                    title: obj[key].title,
                    description: obj[key].description,
                    dateCreated: obj[key].dateCreated,
                    coverImage: obj[key].coverImage,
                    creatorId: obj[key].creatorId,
                    maxAttendies: obj[key].maxAttendies
                  })
                })
            }
          }
          commit('setLoadedProjects', projects)
        })
        .catch(error => {
          console.log('error', error)
          commit('setLoading', false)
          commit('setMessage', error.message)
        })
    },

    getUserProject ({ commit }) {
      firebase.database().ref('projects').once('value')
        .then(data => {
          let userProjects = []
          const userId = this.state.user.uid
          const projects = data.val()
          for (let project in projects) {
            projects[project].id = project
            if (userId === projects[project].creatorId) {
              userProjects.push(projects[project])
            }
          }
          commit('setUserProject', userProjects)
        })
        .catch(error => {
          commit('message', error.message)
        })
    },
    registerUser ({ commit }, payload) {
      const id = payload
      const userId = this.state.user.uid
      let registeredProjects = this.state.registeredProjects
      const index = registeredProjects.indexOf(id)
      if (index > -1) {
        let project = this.state.registeredProjects.splice(index, 1)
        console.log(this.state.registeredProjects)
        update(project)
      } else {
        commit('setRegisteredProjects', id)
        console.log('in else', this.state.registeredProjects)
        update(this.state.registeredProjects)
      }
      function update (regproject) {
        console.log(userId)
        console.log('try', registeredProjects)
        firebase.database().ref('regisreredProjects').child(userId)
          .set({ registeredProjects: regproject })
          .then(() => {
            commit('setMessage', 'registerd sucessfully')
          })
          .catch(error => {
            console.log('error', error)
            commit('setMesage', 'error:', error.message)
          })
      }
    },
    updataProject ({ commit }, payload) {
      firebase.database().ref('projects').child(payload.id).update(payload)
        .then(data => {
          commit('setMessage', 'Sucessfully edited')
        })
        .catch(error => {
          commit('setMessage', error.message)
        })
    },
    createProject ({ commit }, payload) {
      let key
      let dataUrl
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const project = {
            title: payload.title,
            location: payload.location,
            description: payload.description,
            dateCreated: payload.dateCreated,
            creatorId: user.uid,
            maxAttendies: payload.maxAttendies
          }
          // reach out to firebase
          firebase.database().ref('projects')
            .push(project).then(data => {
              key = data.key
              return key
            })
            .then(key => {
              const file = payload.coverImage
              const fileName = file.name
              const ext = fileName.slice(fileName.lastIndexOf('.'))
              const uploadTask = firebase.storage().ref('projects/' + key + '.' + ext).put(file)
              uploadTask.on('state_changed', function (snapshot) {

              },
              error => {
                alert(error.message)
              },
              () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                  firebase.database().ref('projects').child(key).update({ coverImage: downloadURL })
                  dataUrl = downloadURL
                  return dataUrl
                })
                  .then((dataUrl) => {
                    commit('createProject', {
                      ...project,
                      id: key,
                      coverImage: dataUrl
                    })
                  })
              })
            })
            .catch(error => {
              commit('setMessage', error.message)
            })
        }
      })
    },
    createUser ({ commit }, payload) {
      commit('setLoading', true)
      firebase.auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('clareError', null)
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredProjects: []
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('clareError', null)
          commit('setLoading', false)
          commit('setError', error)
        })
    },

    logUserIn ({ commit }, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          console.log(user)
          commit('clareError', null)
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredProjects: [],
            projects: []
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('clareError', null)
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    signout ({ commit }) {
      firebase.auth().signOut().then(function () {
        commit('clareError', null)
        commit('setUser', null)
      }).catch(function (error) {
        commit('setError', error)
      })
    },
    clareError ({ commit }) {
      commit('clareError', null)
    },

    // user calendars
    getEvents ({ commit }) {
      const uid = this.state.user.uid
      firebase.database().ref('calEvents').child(uid).once('value')
        .then(data => {
          console.log('fuck')
          let events = []
          const eventsdata = data.val()
          for (let eve in eventsdata) {
            eventsdata[eve].id = eve
            events.push(eventsdata[eve])
          }
          commit('setEvents', events)
        })
        .catch(error => {
          commit('setMessage', error.message)
        })
    },
    deleteCalEvent ({ commit }, payload) {
      const ev = payload
      const uid = this.state.user.uid
      firebase.database().ref('calEvents').child(uid).child(ev.id).remove()
        .then(() => {
          commit('setMessage', 'Deleated')
        })
        .catch(error => {
          commit('setMessage', error.message)
        })
    },

    updateCalEvent ({ commit }, payload) {
      const ev = payload
      const uid = this.state.user.uid
      firebase.database().ref('calEvents').child(uid).child(ev.id).update({
        details: ev.details
      })
        .then(() => {
          commit('setMessage', 'update sucessfully')
        })
        .catch(error => {
          commit('setMessage', error.message)
        })
    },

    addCalEvent ({ commit }, payload) {
      const data = payload
      const uid = this.state.user.uid
      console.log('payload', payload)
      firebase.database().ref('calEvents').child(uid).push(data)
        .then(() => {
          commit('setMessage', 'Added successfully')
        })
        .catch(error => {
          commit('setMessage', 'Please try again', error.message)
        })
    }

  },
  modules: {
  },
  getters: {
    loadedProjects (state) {
      return state.loadedProjects.sort((peojectA, peojectB) => {
        return peojectA.dateCreated > peojectB.dateCreated
      })
    },
    loadedProject (state) {
      return projectId => {
        return state.loadedProjects.find(project => {
          return project.id === projectId
        })
      }
    },
    userProjects (state) {
      return state.userProjects
    },
    error (state) {
      return state.error
    },
    message (state) {
      return state.message
    },
    loading (state) {
      return state.loading
    },

    profile (state) {
      return state.profile
    },
    user (state) {
      return state.user
    },
    getUserProfile (state) {
      if (state.profile === null || state.profile === undefined) {
      }
    },
    getLikedProjects (state) {
      return state.likedProjects
    },
    getEvents (state) {
      return state.calEvent
    },
    getRegisteredProjects (state) {
      return state.registeredProjects
    }

  }
})

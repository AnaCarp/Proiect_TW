import { SERVER } from '../config/global'

export const LOGIN_USER = 'LOGIN_USER'
export const GET_USER = 'GET_USER'
export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

//login user
//adauga user in bd, folosim signup creaza cont => redirectioneaza la home unde are toate experientele
export function loginUser(user){
    return {
      type : LOGIN_USER,
      payload : async () => {
          await fetch(`${SERVER}/users/login`, {
              method : 'post',
              headers : {
                  'Content-Type' : 'application/json'
              },
              body : JSON.stringify(user)
          })
          let response  = await fetch(`${SERVER}/users/${user.id}/experiences`)
          let json = await response.json()
          return json
      }
    }
  }

//afiseaza informatiile userului -> folosim la fila de profil 
export function getUser(UserId) {
    return {
      type: GET_USER,
      payload: async () => {
          let response  = await fetch(`${SERVER}/users/${UserId}`)
          let json = await response.json()
          return json
      }
    }
}

//adauga user in bd, folosim signup creaza cont => redirectioneaza la home unde are toate experientele
export function addUser(user){
  return {
    type : ADD_USER,
    payload : async () => {
        await fetch(`${SERVER}/users/signup`, {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(user)
        })
        let response  = await fetch(`${SERVER}/users/${user.id}/experiences`)
        let json = await response.json()
        return json
    }
  }
}

//editeaza profil
export function updateUser(UserId, user){
  return {
    type : UPDATE_USER,
    payload : async () => {
      await fetch(`${SERVER}/users/${UserId}`, {
        method : 'put',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(user)
      })
      let response  = await fetch(`${SERVER}/users/${UserId}`)
      let json = await response.json()
      return json
    }
  }
}

//sterge cont
export function deleteUser(UserId){
  return {
    type : DELETE_USER,
    payload : async () => {
      await fetch(`${SERVER}/users/${UserId}`, {
        method : 'delete'
      })
      let response  = await fetch(`${SERVER}/`)
      let json = await response.json()
      return json
    }
  }
}
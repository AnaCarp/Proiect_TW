import { SERVER } from '../config/global'

export const GET_ALL_EXPERIENCES = 'GET_ALL_EXPERIENCES'
export const GET_EXPERIENCES = 'GET_EXPERIENCES'
export const GET_EXPERIENCE = 'GET_EXPERIENCE'
export const ADD_EXPERIENCE = 'ADD_EXPERIENCE'
export const UPDATE_EXPERIENCE = 'UPDATE_EXPERIENCE'
export const DELETE_EXPERIENCE = 'DELETE_EXPERIENCE'

//toate experientele tuturor utilizatorilor inregistrati
export function getAllExperiences() {
  return {
    type: GET_ALL_EXPERIENCES,
    payload: async () => {
        let response  = await fetch(`${SERVER}/experiences`)
        let json = await response.json()
        return json
    }
  }
}

//toate experientele unui singur utilizator
export function getAllExperiencesOfUser(UserId) {
    return {
      type: GET_EXPERIENCES,
      payload: async () => {
          let response  = await fetch(`${SERVER}/users/${UserId}/experiences`)
          let json = await response.json()
          return json
      }
    }
}

//o anumita experienta a unui utilizator
export function getExperienceOfUser(UserId,ExperienceId) {
    return {
      type: GET_EXPERIENCE,
      payload: async () => {
          let response  = await fetch(`${SERVER}/users/${UserId}/experiences/${ExperienceId}`)
          let json = await response.json()
          return json
      }
    }
}
//userul adauga o noua experienta
export function addExperience(UserId,experience){
  return {
    type : ADD_EXPERIENCE,
    payload : async () => {
        await fetch(`${SERVER}/users/${UserId}/experiences`, {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(experience)
        })
        let response  = await fetch(`${SERVER}/users/${UserId}/experiences`)
        let json = await response.json()
        return json
    }
  }
}
//userul actualizeaza experienta
export function updateExperience(UserId, ExperienceId,experience){
  return {
    type : UPDATE_EXPERIENCE,
    payload : async () => {
      await fetch(`${SERVER}/users/${UserId}/experiences/${ExperienceId}`, {
        method : 'put',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(experience)
      })
      let response  = await fetch(`${SERVER}/users/${UserId}/experiences`)
      let json = await response.json()
      return json
    }
  }
}

//userul sterge experienta
export function deleteExperience(UserId, ExperienceId,experience){
  return {
    type : DELETE_EXPERIENCE,
    payload : async () => {
      await fetch(`${SERVER}/users/${UserId}/experiences/${ExperienceId}`, {
        method : 'delete'
      })
      let response  = await fetch(`${SERVER}/users/${UserId}/experiences`)
      let json = await response.json()
      return json
    }
  }
}
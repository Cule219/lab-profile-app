import axios from 'axios';;

export const login = (username, password) => {
  axios.post("/api/auth/login", {username, password}).then(
    response => response.data
)}
export const signup = (username, password, campus, course) => {
  axios.post("/api/auth/signup", {username, password, campus, course}).then(
    response => response.data
)}
export const logout = () => {
  axios.post("/api/auth/logout").then(
    response => response.data
)}



const service = axios.create({
  // withCredentials: true // => you might need this when having the users in the app 
});

const errorHandler = err => {
  // console.error(err);
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
    // console.log('file in service: ', theFile)
    return service.post('/api/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewThing (newThing) {
    // console.log('new thing is: ', newThing)
    return service.post('/things/create', newThing)
      .then(res => res.data)
      .catch(errorHandler);
  }
}
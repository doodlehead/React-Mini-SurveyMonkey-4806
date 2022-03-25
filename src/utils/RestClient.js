import axios from "axios";

/**
 * The RestClient will contain all the REST calls the client needs. "Singleton" pattern
 */
class RestClient {
  constructor() {
    let baseURL = (process.env.NODE_ENV !== 'production') ?
      'http://localhost:8080/' : 'https://mini-surveymonkey-4806.herokuapp.com/'

    this.axios = axios.create({
      baseURL,
      timeout: 1000,
      withCredentials: true
    });
  }

  // Surveys
  getSurvey(id) {
    return this.axios.get(`/survey/${id}`)
  }

  getSurveys() {
    return this.axios.get('/survey')
  }

  createSurvey(name) {
    return this.axios.post('/survey', name, { headers: { "Content-Type": "text/plain" } })
  }

  deleteSurvey(id) {
    return this.axios.delete(`/survey/${id}`)
  }

  answerSurvey(id, answer) {
    return this.axios.post(`/answer/`, {
      survey: {
        id
      },
      answer
    })
  }

  getAnswersOfSurvey(id) {
    return this.axios.get(`/survey/${id}/answer`);
  }

  publishSurvey(id) {
    return this.axios.post(`/survey/${id}/publish`);
  }

  closeSurvey(id) {
    return this.axios.post(`/survey/${id}/close`)
  }

  // Questions
  createQuestion(payload) {
    return this.axios.post('/question', payload)
  }

  deleteQuestion(id) {
    return this.axios.delete(`/question/${id}`)
  }

  getQuestions() {
    return this.axios.get('/question')
  }

  // Users
  login(user) {
    return this.axios.post(`/login`, new URLSearchParams(user), { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
  }

  register(user) {
    return this.axios.post(`/user`, user)
  }

  logout(user) {
    return this.axios.post('/logout')
  }
}

const client = new RestClient();

export default client;
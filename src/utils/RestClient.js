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
      // headers: {'X-Custom-Header': 'foobar'}
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

  // Questions
  createQuestion(payload) {
    return this.axios.post('/question', payload)
  }

  deleteQuestion(id) {
    return this.axios.delete(`/question/${id}`)
  }
}

const client = new RestClient();

export default client;
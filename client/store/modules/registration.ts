// import router from '@/router'
import api from '../../api/api'
import { Dictionary } from 'vue-router/types/router'

/* A function that contains default state values
* It helps in resetting the state in store to its default after logging
* out, for example */
const getDefaultRegistrationState = {
  disciplines: [],
  extraOrderServices: [],
  gender: [],
  countries: [],
  citationStyles: [],
  educationLevels: [],
  grammarQuestions: [],
  formsStateSet: false,
  writerRegistrationForm: {
    type: null,
    level: 1,
    email: '',
    termsPoliciesAgreed: false,
    promoMessagesAgreed: false,
    emailSubmitted: false,
    profileFilled: false,
    personalInformation: {
      surname: null,
      otherNames: null,
      gender: null,
      nidFront: null,
      nidBack: null,
      mobileNo: null,
      nationalID: null,
      country: '',
      countyState: null,
      availableNightCalls: null
    },
    writingBackground: {
      citationStyles: [],
      primaryDiscipline: null,
      disciplines: []
    },
    educationBackground: {
      highestAcademicLevel: null,
      certificate: null
    },
    workExperience: {
      workHistory: null,
      yearsExperience: null
    },
    grammarTest: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null,
      12: null,
      13: null,
      14: null,
      15: null,
      16: null,
      17: null,
      18: null,
      19: null,
      20: null,
      21: null,
      22: null,
      23: null,
      24: null,
      25: null
    },
    stepStatus: {
      step1: true,
      step2: true,
      step3: true,
      step4: true
    },
    sampleEssay: {
      notStartedWriting: true,
      startWriting: false,
      essaySubmitted: false,
      theme: null,
      essay: null
    }
  }
}

/* Initializing the state */
const state = () => ({
  disciplines: [],
  extraOrderServices: [],
  gender: [],
  countries: [],
  citationStyles: [],
  educationLevels: [],
  grammarQuestions: [],
  formsStateSet: false,
  writerRegistrationForm: {
    type: null,
    level: 1,
    email: '',
    termsPoliciesAgreed: false,
    promoMessagesAgreed: false,
    emailSubmitted: false,
    profileFilled: false,
    personalInformation: {
      surname: null,
      otherNames: null,
      gender: null,
      nidFront: null,
      nidBack: null,
      mobileNo: null,
      nationalID: null,
      country: '',
      countyState: null,
      availableNightCalls: null
    },
    writingBackground: {
      citationStyles: [],
      primaryDiscipline: null,
      disciplines: []
    },
    educationBackground: {
      highestAcademicLevel: null,
      certificate: null
    },
    workExperience: {
      workHistory: null,
      yearsExperience: null
    },
    grammarTest: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null,
      12: null,
      13: null,
      14: null,
      15: null,
      16: null,
      17: null,
      18: null,
      19: null,
      20: null,
      21: null,
      22: null,
      23: null,
      24: null,
      25: null
    },
    stepStatus: {
      step1: true,
      step2: true,
      step3: true,
      step4: true
    },
    sampleEssay: {
      notStartedWriting: true,
      startWriting: false,
      essaySubmitted: false,
      theme: null,
      essay: null
    }
  }
})

/* The getters. Help to access the state */
const getters = {
  disciplines: (state: any) => state.disciplines,
  gender: (state: any) => state.gender,
  countries: (state: any) => state.countries,
  citationStyles: (state: any) => state.citationStyles,
  educationLevels: (state: any) => state.educationLevels,
  grammarQuestions: (state: any) => state.grammarQuestions,
  formsStateSet: (state: any) => state.formsStateSet,
  writerRegistrationForm: (state: any) => state.writerRegistrationForm
}

/*
 * Actions are similar to mutations, the differences being that:
    - Instead of mutating the state, actions commit mutations.
    - Actions can contain arbitrary asynchronous operations.
*/
const actions = {
  async getDisciplines ({ commit, state }: any) {
    if (state.disciplines.length === 0 || !Array.isArray(state.disciplines)) {
      return await api.getRequest('orders/v1/get_disciplines')
        .then((response: any) => {
          commit('changeDisciplines', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getGender ({ commit, state }: any) {
    if (state.gender.length === 0 || !Array.isArray(state.gender)) {
      return await api.getRequest('orders/v1/get_genders')
        .then((response: any) => {
          commit('changeGender', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getCountries ({ commit, state }: any) {
    if (state.countries.length === 0 || !Array.isArray(state.countries)) {
      return await api.getRequest('orders/v1/get_countries')
        .then((response: any) => {
          commit('changeCountries', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getCitationStyles ({ commit, state }: any) {
    if (state.citationStyles.length === 0 || !Array.isArray(state.citationStyles)) {
      return await api.getRequest('orders/v1/get_citation_styles')
        .then((response: any) => {
          commit('changeCitationStyles', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getEducationLevels ({ commit, state }: any) {
    if (state.educationLevels.length === 0 || !Array.isArray(state.educationLevels)) {
      const educationLevelsDetails = {
        academicInclined: true,
        orderInclined: false
      }
      return await api.postRequest('orders/v1/get_education_levels', educationLevelsDetails)
        .then((response: any) => {
          commit('changeEducationLevels', Array.isArray(response) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  },
  async getGrammarQuestions ({ commit, state }: any) {
    if (state.grammarQuestions.length === 0 || !Array.isArray(state.grammarQuestions)) {
      return await api.getRequest('orders/v1/get_grammar_questions')
        .then((response: any) => {
          commit('changeGrammarQuestions', Array.isArray(response.answers) ? response : [])
          return true
        })
        .catch((error: any) => {
          return Promise.reject(error)
        })
    } else {
      return true
    }
  }
}

/* The only way to change a Vuex state is by committing a mutation */
const mutations = {
  changeDisciplines: (state: any, val: number[]) => {
    state.disciplines = val
  },
  changeGender: (state: any, val: number[]) => {
    state.gender = val
  },
  changeCountries: (state: any, val: number[]) => {
    state.countries = val
  },
  changeCitationStyles: (state: any, val: number[]) => {
    state.citationStyles = val
  },
  changeEducationLevels: (state: any, val: number[]) => {
    state.educationLevels = val
  },
  changeGrammarQuestions: (state: any, val: number[]) => {
    state.grammarQuestions = val
  },
  changeFormsStateSet: (state: any, val: any) => {
    state.formsStateSet = val
  },
  resetWriterRegistrationForm: (state: any) => {
    state.writerRegistrationForm = getDefaultRegistrationState.writerRegistrationForm
  },
  changeWholeWriterRegistrationForm: (state: any, val: any) => {
    state.writerRegistrationForm = val
  },
  changeWriterRegistrationForm: (state: any, { key, subKey, val, option }: any) => {
    if (subKey !== null) {
      state.writerRegistrationForm[key][subKey] = val
    } else {
      state.writerRegistrationForm[key] = val
    }
  },
  resetRegistrationState: (state: any) => {
    const s: Dictionary<any> = getDefaultRegistrationState
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

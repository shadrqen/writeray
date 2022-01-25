/* A function that contains default state values
* It helps in resetting the state in store to its default after logging
* out, for example */
import { Dictionary } from 'vue-router/types/router'

const getDefaultUserState = () => {
  return {
    email: null,
    loginStatus: false,
    accessToken: null,
    refreshToken: null,
    loginDialog: false,
    reportProblemDialog: false,
    loginDialogContents: {
      dialogTitle: 'Log in to your account',
      dialogContent: {
        submitEmail: true,
        login: false,
        notification: false,
        notificationMessage: null,
        loginInfo: null,
        clientLogin: false,
        setPassword: false
      }
    },
    writer: {
      names: null,
      pPic: null,
      applicationDone: false,
      grammarTest: {
        startTestNow: false,
        yetToStartTestNow: true,
        testCompleted: false,
        grammarTestCountdownMinutes: 25,
        grammarTestCountdownSeconds: 0,
        grammarQAsCount: 0,
        grammarTestSucceeded: false,
        grammarTestFailed: false,
        expectedSecond: null,
        expectedMinute: null,
        expectedHour: null,
        countDownDate: null,
        date: null,
        timeElapsed: false
      }
    }
  }
}

const state = () => ({
  email: null,
  loginStatus: false,
  accessToken: null,
  refreshToken: null,
  loginDialog: false,
  loginDialogContents: {
    dialogTitle: 'Log in to your account',
    dialogContent: {
      submitEmail: true,
      login: false,
      notification: false,
      notificationMessage: null,
      loginInfo: null,
      clientLogin: false,
      setPassword: false
    }
  },
  writer: {
    names: null,
    pPic: null,
    applicationDone: false,
    grammarTest: {
      startTestNow: false,
      yetToStartTestNow: true,
      testCompleted: false,
      grammarTestCountdownMinutes: 25,
      grammarTestCountdownSeconds: 0,
      grammarQAsCount: 0,
      grammarTestSucceeded: false,
      grammarTestFailed: false,
      expectedSecond: null,
      expectedMinute: null,
      expectedHour: null,
      countDownDate: null,
      date: null,
      timeElapsed: false
    }
  },
  initialUserState: getDefaultUserState()
})

/* The getters. Help to access the state */
const getters = {
  email: (state: any) => state.email,
  accessToken: (state: any) => state.accessToken,
  refreshToken: (state: any) => state.refreshToken,
  loginStatus: (state: any) => state.loginStatus,
  loginDialog: (state: any) => state.loginDialog,
  reportProblemDialog: (state: any) => state.reportProblemDialog,
  loginDialogContents: (state: any) => state.loginDialogContents,
  writer: (state: any) => state.writer
}

/*
 * Actions are similar to mutations, the differences being that:
    - Instead of mutating the state, actions commit mutations.
    - Actions can contain arbitrary asynchronous operations.
*/
const actions = {

}

/* The only way to change a Vuex state is by committing a mutation */
const mutations = {
  changeLoginStatus: (state: any, val: any) => {
    state.loginStatus = val
  },
  changeEmail: (state: any, val: any) => {
    state.email = val
  },
  changeLoginDialog: (state: any, val: any) => {
    state.loginDialog = val
  },
  changeReportProblemDialog: (state: any, val: any) => {
    state.reportProblemDialog = val
  },
  changeAccessToken: (state: any, val: any) => {
    state.accessToken = val
  },
  changeRefreshToken: (state: any, val: any) => {
    state.refreshToken = val
  },
  changeWriter: (state: any, { key, subKey, val }: any) => {
    if (subKey !== null) {
      state.writer[key][subKey] = val
    } else {
      state.writer[key] = val
    }
  },
  changeLoginDialogContents: (state: any, { key, subKey, val }: any) => {
    if (subKey !== null) {
      state.loginDialogContents[key][subKey] = val
    } else {
      state.loginDialogContents[key] = val
    }
  },
  resetUserState: (state: any) => {
    const s: Dictionary<any> = getDefaultUserState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
    // router.push('/login').then(() => {})
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

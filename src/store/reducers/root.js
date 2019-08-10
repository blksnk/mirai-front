import * as types from 'store/types'
const {
  INDICATOR_INCREMENT,
  INDICATOR_DECREMENT,
  INDICATOR_SET,
  INDICATOR_SET_CURRENT,
  INDICATOR_SET_TOTAL,
  TITLE_SET,
  DARK_MODE_SET,
  DARK_MODE_TOGGLE,
  UPDATE_FORM,
} = types

const initState = {
  pageTitle: window.location.pathname.split('/')[1],
  pageIndicator: {
    current: 1,
    total: 4,
  },
  form: {
    name: '',
    subject: '',
    message: '',
    clientEmail: '',
    phoneNumber: '',
  },
  darkMode: false,
  userDarkMode: false,
}



const rootReducer = (state = initState, action) => {
  switch(action.type) {
    case INDICATOR_INCREMENT: {
      let { current, total } = state.pageIndicator
      if(current < total) {
        current++ 
      }
      return {
        ...state,
        pageIndicator: {
          ...state.pageIndicator,
          current
        }
      }
    }
    case INDICATOR_DECREMENT: {
      let { current } = state.pageIndicator
      if(current > 0) {
        current--
      }
      return {
        ...state,
        pageIndicator: {
          ...state.pageIndicator,
          current
        }
      }
    }
    case INDICATOR_SET_CURRENT: {
      const { current } = action
      const { total } = state.pageIndicator
      if(current <= total) {
        return {
          ...state,
          pageIndicator: {
            ...state.pageIndicator,
            current
          }
        }
      } else {
        return state
      }
    }
    case INDICATOR_SET_TOTAL: {
      const { total } = action
      const { current } = state.pageIndicator
      if(total >= current) {
        return {
          ...state,
          pageIndicator: {
            ...state.pageIndicator,
            total
          }
        }
      } else {
        return state
      }
    }
    case INDICATOR_SET: {
      const { total, current } = action
      if(current <= total && total > 0) {
        return {
          ...state,
          pageIndicator: {
            current,
            total
          }
        }
      } else {
        return state
      }
    }
    case TITLE_SET: {
      const { title } = action
      document.title = `Mirai - ${title}.`
      return {
        ...state,
        pageTitle: title
      }
    }
    case DARK_MODE_SET: {
      const { active } = action
      return {
        ...state,
        darkMode: active
      }
    }
    case DARK_MODE_TOGGLE: {
      return {
        ...state,
        darkMode: !state.darkMode
      }
    }
    case UPDATE_FORM: {
      return {
        ...state,
        form: action.form
      }
    }
    default: return state
  }
}

export default rootReducer
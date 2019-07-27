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
} = types

const createActionBasic = (type) => ({
  type
})

const createAction1Param = (type, f, v) => ({
  type,
  [f]: v
})

const createAction2Param = (type, f1, v1, f2, v2) => ({
  type,
  [f1]: v1,
  [f2]: v2
})

export const indicatorIncrement = () => createActionBasic(INDICATOR_INCREMENT)
export const indicatorDecrement = () => createActionBasic(INDICATOR_DECREMENT)
export const indicatorSet = (current, total) => createAction2Param(INDICATOR_SET, 'current', current, 'total', total)
export const indicatorSetTotal = (total) => createAction1Param(INDICATOR_SET_TOTAL, 'total', total)
export const indicatorSetCurrent = (current) => createAction1Param(INDICATOR_SET_CURRENT, 'current', current)
export const pageTitleSet = (title) => createAction1Param(TITLE_SET, 'title', title)
export const darkModeSet = (bool) => createAction1Param(DARK_MODE_SET, 'active', bool)
export const darkModeToggle = () => createActionBasic(DARK_MODE_TOGGLE)
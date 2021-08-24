// type

const DECREMENT_DOTCOUNT = 'DECREMENT_DOTCOUNT'


// action

function decrementDotCountAction(payload) {
  return {
    type: DECREMENT_DOTCOUNT,
    payload
  }
}

export {
  DECREMENT_DOTCOUNT,
  decrementDotCountAction
}
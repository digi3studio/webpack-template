export default function inViewportElementReducer(defaultState = null){
  return function(state = defaultState, action){
    switch(action.type){
      case "HOT_RELOAD":
        return Object.assign({}, state, {hmr: Math.random()});

      case 'CHANGE_IN_VIEWPORT':
        return Object.assign({}, state, {inViewport : action.payload});
      default:
        return state;
    }
  }
}
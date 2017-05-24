export default function sampleReducer(defaultState = null){
  return function(state = defaultState, action){
    switch(action.type){
      case "HOT_RELOAD":
        return Object.assign({}, state, {hmr: Math.random()});

      case 'CHANGE_HELLO':
        if(state.hello == action.payload)return state;
        return Object.assign({}, state, {hello : action.payload});
      default:
        return state;
    }
  }
}
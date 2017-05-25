export default function chartRingReducer(defaultState = null){
  return function(state = defaultState, action){
    switch(action.type){
      case "HOT_RELOAD":
        return Object.assign({}, state, {hmr: Math.random()});

      case 'CHANGE_VALUE_0':
        return Object.assign({}, state, {data :
          [
            Object.assign({}, state.data[0], {value: action.payload}),
            state.data[1],
            state.data[2],
            state.data[3]
          ]
        });

      case 'CHANGE_VALUE_1':
        return Object.assign({}, state, {data :
          [
            state.data[0],
            Object.assign({}, state.data[1], {value: action.payload}),
            state.data[2],
            state.data[3]
          ]
        });

      case 'CHANGE_VALUE_2':
        return Object.assign({}, state, {data :
          [
            state.data[0],
            state.data[1],
            Object.assign({}, state.data[2], {value: action.payload}),
            state.data[3]
          ]
        });

      case 'CHANGE_VALUE_3':
        return Object.assign({}, state, {data :
          [
            state.data[0],
            state.data[1],
            state.data[2],
            Object.assign({}, state.data[3], {value: action.payload}),
          ]
        });

      default:
        return state;
    }
  }
}
export default function pageEditReducer(defaultState = null){
  return function(state = defaultState, action){
    switch(action.type){
      case "HOT_RELOAD":
        return Object.assign({}, state, {hmr: Math.random()});

      case 'CHANGE_TYPE':
        if(state.hello == action.payload)return state;
        return Object.assign({}, state, {hello : action.payload});

      case 'CHANGE_EDITING_LANGUAGE':
        if(state.editingLanguage == action.pagetype)return state;
        return Object.assign({}, state, {editingLanguage: action.payload});

      case 'CHANGE_FIELD_INPUT':
        const oldValue = state.fields[state.editingLanguage][action.payload.name];
        if(oldValue == action.payload.value)return state;

        if(action.payload.name.indexOf('field') == 0){
          return Object.assign({}, state, copyMultiLanguageField(state, state.editingLanguage, action.payload.name, action.payload.value));
        }else if(action.payload.name.indexOf('count') == 0){
          return Object.assign({}, state, copyMultiLanguageField(state, state.masterLanguage,  action.payload.name, action.payload.value));
        }
        return state;

      case 'CHANGE_PROPERTIES_INPUT':
        if(state.properties[action.payload.name] == action.payload.value)return state;

        let prop = Object.assign({}, state.properties);
        prop[action.payload.name] = action.payload.value;

        return Object.assign({}, state, {properties: prop});

      case 'CHANGE_PAGE_SETTING':
        if(state[action.payload.name] == action.payload.value)return state;

        let setting = {};
        setting[action.payload.name] = action.payload.value;

        return Object.assign({}, state, setting);
      default:
        return state;
    }
  }
}

function copyMultiLanguageField(state, language, key, value){
  let translate = Object.assign({}, state.fields[language]);
  translate[key] = value;

  let obj = Object.assign({}, state.fields);
  obj[language] = translate;

  return {fields: obj};
}
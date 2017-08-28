export default function pageEditReducer(defaultState = null){
  return function(state = defaultState, action){
    switch(action.type){
      case "HOT_RELOAD":
        return {...state, hmr: Math.random()};

      case 'CHANGE_EDITING_LANGUAGE':
        if(state.editingLanguage === action.pagetype)return state;
        return {...state, editingLanguage: action.payload};

      case 'CHANGE_FIELD_INPUT':
        const oldValue = state.fields[state.editingLanguage] && state.fields[state.editingLanguage][action.payload.name];
        if(oldValue === action.payload.value)return state;

        if(action.payload.name.indexOf('field') === 0){
          //update field in corresponding language.
          const field = copyMultiLanguageField(state, state.editingLanguage, action.payload.name, action.payload.value);
          return Object.assign({}, state, field);
        }else if(action.payload.name.indexOf('count') === 0){
          //count
          const field = copyMultiLanguageField(state, state.masterLanguage, action.payload.name, action.payload.value);
          return Object.assign({}, state, field);
        }
        return state;

      case 'CHANGE_PROPERTIES_INPUT':
        if(state.properties[action.payload.name] === action.payload.value)return state;

        let prop = Object.assign({}, state.properties);
        prop[action.payload.name] = action.payload.value;

        return {...state, properties: prop};

      case 'CHANGE_PAGE_SETTING':
        if(state.page[action.payload.name] === action.payload.value)return state;

        let setting = Object.assign({}, state);
        setting.page[action.payload.name] = action.payload.value;

        return setting;

      case 'UPDATE_PAGE_ID':
        if(state.page['id'] === action.payload)return state;
        return {...state, page : {...state.page, id : action.payload}};
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
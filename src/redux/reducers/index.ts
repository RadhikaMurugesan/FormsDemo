import { combineReducers } from 'redux';
import detailsReducer from './detailsReducer';

const rootReducer = combineReducers({
    details: detailsReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import NewsReducer from './reducer_news';
import SourcesReducer from './reducer_default_sources';

const rootReducer = combineReducers({
  news: NewsReducer,
  sources: SourcesReducer
});

export default rootReducer;

import { FETCH_NEWS, SEARCH_NEWS, SEARCH_NEWS_BY_SOURCE } from '../actions';

const INITIAL_STATE = { default: {}, searched: {}, bySource: {} };

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case FETCH_NEWS:
			return { default: action.payload.data};
		case SEARCH_NEWS:
			return { default: state.default, searched: action.payload.data };
		case SEARCH_NEWS_BY_SOURCE:
			return { default: state.default, bySource: action.payload.data };
		default:
			return state;
	}
}
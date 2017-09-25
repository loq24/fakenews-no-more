import axios from 'axios';

const APIKEY = '?apiKey=abe024f04eae469f86ca8152cbdc2426';
const LANGUAGE = '&language=en';
const ROOTURL_TH = `http://beta.newsapi.org/v2/top-headlines${APIKEY}`;
const ROOTURL_EVERYTHING = `http://beta.newsapi.org/v2/everything${APIKEY}&sortBy=popularity`;

export const FETCH_NEWS = 'FETCH_NEWS';
export const SEARCH_NEWS = 'SEARCH_NEWS';
export const SEARCH_NEWS_BY_SOURCE = 'SEARCH_NEWS_BY_SOURCE';

export function fetchNews(sourceStr){
	const request = axios.get(`${ROOTURL_TH}&sources=${sourceStr}`);
	return {
		type: FETCH_NEWS,
		payload: request
	};
}

export function searchNews(term, sourceStr){
	let request = {};
	if(term){
		request = axios.get(`${ROOTURL_EVERYTHING}&sources=${sourceStr}&q=${term}${LANGUAGE}`);	
	}
	return{
		type: SEARCH_NEWS,
		payload: request
	};
}

export function searchNewsBySource(source){
	const request = axios.get(`${ROOTURL_TH}&sources=${source}`);
	return{
		type: SEARCH_NEWS_BY_SOURCE,
		payload: request
	};
}
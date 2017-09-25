import React, { Component } from 'react';
import SearchBar from './search_bar';
import {connect} from 'react-redux';
import { fetchNews } from '../actions';
import RenderNews from './render_news';
import mapSources from './helpers/map_sources';
import { Link } from 'react-router-dom';

class NewsIndex extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoading: false
		};
	}

	componentDidMount(){
		const sourceStr = mapSources(this.props.sources);
		this.props.fetchNews(sourceStr);
	}

	handlePageLoading(isLoading){
		this.setState({ isLoading });
	}

	renderSourcesTags(){
		const srcs = this.props.sources;
		return srcs.map( (source) => {
			return (
					<div className="control" key={source.id}>
						<Link to={`/source/${source.id}`}>
						    <div className="tags has-addons">
						      <span className="tag hover-tag">&nbsp;</span>
						      <span className="tag is-success">{source.id}</span>
						    </div>
					    </Link>
				  </div>
				 );
		});
	}

	render(){
		const { defaultNews, searched } = this.props;
		let current_news = defaultNews;
		if(searched) {
			current_news = searched;
		}
		return(
			<div className="columns is-centered">
				{ this.state.isLoading ? <div className="loading"></div> : '' }
				<div className="column is-three-quarters is-narrow">
					<SearchBar isLoading={this.handlePageLoading.bind(this)} />
					<h2 style={{margin:'20px 0'}} className="subtitle">Showing headlines from different sources...</h2>
					<div style={{marginBottom:"20px"}} className="field is-grouped is-grouped-multiline">
						<span style={{marginRight:'15px'}}>Read headlines by source:</span>
						{this.renderSourcesTags()}
					</div>
					{!current_news.articles || current_news.articles.length === 0 ? <div>Loading...</div> : '' }
					<RenderNews allNews={current_news} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		defaultNews: state.news.default,
		searched: state.news.searched,
		sources: state.sources
	};
}

export default connect(mapStateToProps, { fetchNews })(NewsIndex);
import React, { Component } from 'react';
import { searchNewsBySource } from '../actions';
import {connect} from 'react-redux';
import RenderNews from './render_news';
import { Link } from 'react-router-dom';

class NewsSource extends Component{
	componentDidMount(){
		const { id } = this.props.match.params;
		this.props.searchNewsBySource(id);
	}
	render(){
		const { news } = this.props;
		if(!news || !news.articles){
			return <div className="loading"></div>;
		}
		return(
			<div className="columns is-centered">
				<div className="column is-three-quarters is-narrow">
					<div className="level">
						<div className="level-left">
							<Link to="/" className="button is-primary">&laquo; Go Back to Mainpage</Link>
						</div>
						<div className="level-right">
							<div className="tags has-addons">
							  <span className="tag">Source</span>
							  <span className="tag is-info">{news.articles[0].source.name}</span>
							</div>			
						</div>
					</div>
					<RenderNews allNews={news} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		news: state.news.bySource
	};
}

export default connect(mapStateToProps,{ searchNewsBySource })(NewsSource);
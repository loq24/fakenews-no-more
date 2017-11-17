import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';

export default class RenderNews extends Component {
	renderNews(allNews){
		let uniqueNews = _.uniqBy(allNews.articles, 'title');
		return _.map(uniqueNews, article => {
			return (
				<div className="box" key={article.title}>
				  <div className="media">
				    <div className="media-left">
				     { article.urlToImage &&
				      <figure className="image is-custom-size">
				        <img src={article.urlToImage.replace("http://", "//")} alt={article.title} />
				      </figure>
				  	}
				    </div>
				    <div className="media-content">
				      <div className="content">
				        <p>
				          <a target="_blank" href={article.url}><strong>{article.title}</strong></a>
				          <span className="meta-tags"><Link to={`/source/${article.source.id}`}><span className="tag is-light">{article.source.name}</span></Link> <span className="tag is-white">{article.publishedAt}</span></span>
				          <Truncate lines={3} ellipsis={<span>...</span>}>
				                {article.description}
				          </Truncate>
				        </p>
				      </div>
				    </div>
				  </div>
				</div>
			);
		});
	}
	render(){
		const allNews = this.props.allNews;
		return (
			<div>
				{this.renderNews(allNews)}
			</div>
		);
	}
}
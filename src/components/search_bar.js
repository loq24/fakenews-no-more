import React, { Component } from 'react';
import { searchNews, fetchNews } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import mapSources from './helpers/map_sources';

class SearchBar extends Component{
	constructor(props){
		super(props);
		this.state = {
			term: '',
			isLoading: false
		};
	}

	componentDidMount(){
		this.searchInput.focus(); 
	}

	componentWillMount(){
        this.inputCallback = _.debounce(function (e) {
        	const sourceStr = mapSources(this.props.sources);
          	if(e.target.value){
          		this.props.searchNews(e.target.value, sourceStr)
			    .then(() => { 
			    	this.setState({ isLoading: false }); 
			    	this.props.isLoading(false);
			    });
        	}
        	else{
        		this.props.searchNews(e.target.value, sourceStr);
        		this.setState({ isLoading: false }); 
			    this.props.isLoading(false);
			}
			
        }, 500);
    }

	handleSearch (e) {
		e.persist();
		this.setState({ term: e.target.value, isLoading: true });
		this.props.isLoading(true);
		this.inputCallback(e);
	}

	render(){
		return(
			<div className={this.state.isLoading ? `control is-loading` : `control` }>
				<input 
				value={this.state.term} 
				onChange={ this.handleSearch.bind(this) } 
				ref={(input) => { this.searchInput = input; }} 
				className="input is-primary is-medium" 
				placeholder="Search news here..." />
			</div>
		);
	}
}

function mapStateToProps({sources}){
	return { sources }
}

export default connect(mapStateToProps, { searchNews, fetchNews })(SearchBar);
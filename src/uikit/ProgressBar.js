import React, { Component } from 'react';
import Progress from 'react-progressbar';
import _ from 'underscore';
import $ from 'jquery';

export default class ProgressBar extends Component {
	constructor(props) {
		super(props);
		this.state = {progress: 0};
	}

	componentDidMount() {
		const parent = $(`.${this.props.parentElement}`);
		const parentHTML = document.querySelector(`.${this.props.parentElement}`);
		parentHTML.addEventListener('scroll', this.debounceScroll.bind(this), {passive: true});
		this.setState({parent: parentHTML, scrollHeight: parentHTML.scrollHeight, parentHeight: parent.height()});
	}

	componentWillUnmount() {
    	this.state.parent.removeEventListener('scroll', this.handleScroll);
	}

	debounceScroll(event) {
		_.debounce(this.handleScroll(event), 
		200,
		false);
	}

	handleScroll(event) {
		//get current and total scroll
    	let currentScroll = Math.min(Math.max(parseInt(Math.ceil((event.target.scrollTop + event.target.clientHeight)/event.target.scrollHeight*100)), 0), 100);
    	if(currentScroll === 99) {
    		currentScroll = 100;
    	};
    	this.setState({progress: currentScroll});
	}

	render() {
		return (
			<Progress completed={this.state.progress}/>
		);
	}
}

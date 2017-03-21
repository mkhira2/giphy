import React from 'react'

import Banner from './components/banner'
import {TrendingCollection} from '../models/gifModels'
import ACTIONS from '../actions'
import STORE from '../store'


var StripView = React.createClass({
	componentWillMount : function() {
		ACTIONS.fetchTrending()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	// the state of this component will always be an exact copy of whatever is in STORE.data
	getInitialState : function() {
		return STORE.data
	},
	render : function() {
		console.log('state on stripView', this.state)
		return (
			<div className="strip-view">
				<Banner />	
				<Strip 
				gifCollection = {this.state.trendingColl}
				activeID = {this.state.activeID}
				/>
			</div>
			)
	}
})

var Strip = React.createClass({
	// input is an array element 
	_makeGif : function(singleModel) {
		return (
			<GifComponent 
			gifData = {singleModel}
			activeID = {this.props.activeID}
			/>
			)
	},
	render : function() {
		console.log('console log props on strip', this.props)
		return (
			<div className="strip">
				{this.props.gifCollection.map(this._makeGif)}
			</div>
			)
	}
})

var GifComponent = React.createClass({
	_handleClick : function() {
		ACTIONS.setActiveID(this.props.gifData.get('id'))
	},
	render : function() {
		// these are the classes for when the gif is rendered in the strip. it's not active, and it has
			// no close button, and no left-right buttons
		var gifClass = 'single-gif',
			buttonClass = 'hidden'
		if (this.props.activeID === this.props.gifData.get('id')) {
		// by contrast, these are the classes for the focus gif.
			gifClass += ' active'
			buttonClass = 'butts'
		}
		return (
			<div className={gifClass}>
				<div className="image-wrapper">
					<div className="imageAndButtons" >
						<img onClick={this._handleClick} src={this.props.gifData.get('images').original.url}/>
						<div className={buttonClass}>
							<button className="close-button" onClick={ACTIONS.unsetActiveID}>X</button>
							<span className="previous arrow" onClick={ACTIONS.moveLeft}>&lt;</span>
							<span className="next arrow" onClick={ACTIONS.setNextID}>&gt;</span>
						</div>
					</div>
				</div>
			</div>
			)
	}
})


export default StripView
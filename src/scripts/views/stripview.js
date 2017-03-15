import React from 'react'
import Banner from './components/banner'
import {TrendingCollection} from '../models/gifmodels'
import STORE from '../store'
import ACTIONS from '../actions'

var StripView = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchTrending()
		STORE.on('dataUpdated', ()=> {
			this.setState(STORE.data)
		})
	},

	getInitialState: function() {
		// the state of this component will ALWAYS be an exact copy of whatever is in STORE.data
		return STORE.data
	},

	render: function() {
		console.log(this.state)
		return (
			<div className='strip-view'>
				<Banner />
				<Strip 
				gifCollection = {this.state.trendingColl}/>
			</div>
		)
	}
})

var Strip = React.createClass({

	_makeGif: function(singleModel) {
		console.log('this is a single model', singleModel)
		return <GifComponent 
				gifData = {singleModel} />
	},

	render: function() {
		return (
			<div className='strip'>
				{this.props.gifCollection.map(this._makeGif)}
			</div>
		)
	}
})

var GifComponent = React.createClass({
	render: function() {
		return (
			<div className='singleGif'>
				<img src={this.props.gifData.get('images').original.url} />
			</div>
		)
	}
})

export default StripView
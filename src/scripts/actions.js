import {TrendingCollection} from './models/gifModels'
import STORE from './store'

var ACTIONS = {
	fetchTrending : function() {
		var trendingInstance = new TrendingCollection()
		var promise = trendingInstance.fetch()
		promise.then(() => {
			STORE.set({
				trendingColl : trendingInstance,
				activeID: trendingInstance.models[0].get('id')
			})
		})
	},
	setActiveID : function(gifID) {
		STORE.set({
			activeID : gifID
		})
	},
	unsetActiveID: function() {
		STORE.set({
			activeID: null
		})
	},
	setNextID: function() {
		// find index in collection of model w/ currentID
		var activeModel = STORE.data.trendingColl.get(STORE.data.activeID)
		var nextIndex = (STORE.data.trendingColl.models.indexOf(activeModel) + 1) % STORE.data.trendingColl.length
		console.log(nextIndex)
		STORE.set({
			activeID: STORE.data.trendingColl.at(nextIndex).get('id')
		})
	}
}

export default ACTIONS
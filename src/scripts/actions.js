import {TrendingCollection} from './models/gifmodels'
import STORE from './store'

var ACTIONS = {
	fetchTrending: function() {
		var trendingInstance = new TrendingCollection
		var promise = trendingInstance.fetch()
		promise.then(function() {
			// .set will broadcast that data has been changed
			// it triggers a dataUpdated event
			STORE.set({
				trendingColl: trendingInstance
			})
		})
	}
}

export default ACTIONS
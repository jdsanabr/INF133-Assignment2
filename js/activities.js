function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	my_array = tweet_array.forEach(element => {
		if(element.activityType === "ski" || element.activityType === "run" || element.activityType === "walk"
		|| element.activityType === "swim" || element.activityType === "bike") {
			//console.log("activity type: " + element.activityType); //for debugging purposes
			return new Tweet(element.text, element.created_at);
		}
	});
	//

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  }, //comma needed as part of syntax
	  //TODO: Add mark and encoding
	  //
	  mark: "point",
	  encoding: {
		  x: {field: "time", timeUnit: "day"},
		  y: {field: "distance", aggregate: "quantitative"}
	  }
	  //
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
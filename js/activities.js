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
	var my_array = [];
	for(var index = 0; index < tweet_array.length; index++) {
		//This means that the activity type will be ski, run, walk, swim, or bike, refer to activityType() from tweet.ts
		if(tweet_array[index].activityType !== "unknown" && tweet_array[index].activityType !== "") {
			my_array.push(tweet_array[index]);
		}
	}
	console.log("length of my array: " + my_array.length); //debugging purposes
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
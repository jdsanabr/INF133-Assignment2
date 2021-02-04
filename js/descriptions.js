function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	//
	//Need all tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//Will save tweets that have user written stuff
	var writtenTweets_array = [];
	for(var i = 0; i < tweet_array.length; i++) {
		if(tweet_array[i].written == true) {
			writtenTweets_array.push(tweet_array[i]);
			//console.log(tweet_array[i].written); //for debugging purposes
		}
	}
	//Written tweets have been filtered
	//
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});
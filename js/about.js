function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;


	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	//Update 'firstDate' tag
	document.getElementById('firstDate').innerText = 'September 23, 2018';
	//

	//Update 'lastDate' tag
	document.getElementById('lastDate').innerText = 'September 30, 2018';
	//


	//Update 'completedEvents' tag
	//

	//Update 'completedEventsPct' tag
	//


	//Update 'liveEvents' tag
	//

	//Update 'liveEventsPct' tag
	//


	//Update 'achievenemts' tag
	//

	//Update 'achievementsPct' tag
	//


	//Update 'miscellaneous' tag
	//

	//Update 'miscellaneousPct' tag
	//


	//Update 'written' tag
	//

	//Update 'writtenPct tag
	//
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
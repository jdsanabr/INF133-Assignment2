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


	//Update 'firstDate' Id tag
	document.getElementById('firstDate').innerText = 'September 23, 2018';
	//

	//Update 'lastDate' Id tag
	document.getElementById('lastDate').innerText = 'September 30, 2018';
	//


	//Update 'completedEvents' class tag
	//document.getElementsByClassName('completedEvents')[0].innerText = ;
	//

	//Update 'completedEventsPct' class tag
	//document.getElementsByClassName('completedEventsPct')[0].innerText = ;
	//


	//Update 'liveEvents' class tag
	//document.getElementsByClassName('liveEvents')[0].innerText = ;
	//

	//Update 'liveEventsPct' class tag
	//document.getElementsByClassName('liveEventsPct')[0].innerText = ;
	//


	//Update 'achievements' class tag
	//document.getElementsByClassName('achievements')[0].innerText = ;
	//

	//Update 'achievementsPct' class tag
	//document.getElementsByClassName('achievementsPct')[0].innerText = ;
	//


	//Update 'miscellaneous' class tag
	//document.getElementsByClassName('miscellaneous')[0].innerText = ;
	//

	//Update 'miscellaneousPct' class
	//document.getElementsByClassName('miscellaneousPct')[0].innerText = ;
	//


	//Update 'written' class tag
	//document.getElementsByClassName('written')[0].innerText = ;
	//

	//Update 'writtenPct class tag
	//document.getElementsByClassName('writtenPct')[0].innerText = ;
	//
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
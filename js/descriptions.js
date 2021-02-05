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

	for(var i = 0; i < tweet_array.length; i++) {
		if(tweet_array[i].written == true) {
			writtenTweets_array.push(tweet_array[i]);
				//console.log(tweet_array[i].written); //for debugging purposes
		}
	}
	//Written tweets have been filtered
	//
}

//Global variables:
var writtenTweets_array = []; //Will save tweets that have user written stuff
var input, textValue;
var count = 0;
//

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table

	//Remember:
	//"searchCount" and "searchText" Id's should also update
	input = document.getElementById('textFilter');

	//This is how I get user input
	//code snippet is from: https://www.youtube.com/watch?v=SWkPXbQXArk
	input.addEventListener('input', (event) => {
		textValue = event.target.value;
		console.log(textValue); //for debugging purposes
		//Next line is what updates: ...Tweets contain the text ''
		document.getElementById('searchText').innerText = textValue;

		// for(var index = 0; index < writtenTweets_array.length; index++) {
		// 	if(writtenTweets_array[index].writtenText.includes(textValue)) {
		// 		//console.log(writtenTweets_array[index].writtenText);
		// 		count++;
		// 		console.log(count);
		// 	}
		// }
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});
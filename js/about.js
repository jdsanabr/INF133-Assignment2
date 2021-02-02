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


	//This will contain the very first tweet from the json file
	var firstTweet = tweet_array[tweet_array.length - 1].time;
	//This will contain the very last tweet from the json file
	var lastTweet = tweet_array[0].time;
	//I found the following concept by further researching "toLocaleDateString()" suggested by the Prof.
	//Naming convention is also taken from the link provided by the Prof.
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	console.log("first tweet: " + firstTweet.toLocaleDateString('en-US', options)); //print date to console for debugging
	console.log("last tweet: " + lastTweet.toLocaleDateString('en-US', options)); //print date to console for debugging


	//Updates 'firstDate' Id tag
	document.getElementById('firstDate').innerText = firstTweet.toLocaleDateString('en-US', options);
	//document.getElementById('firstDate').innerText(firstTweet.toLocaleDateString('en-US', options));
	
	//Updates 'lastDate' Id tag
	document.getElementById('lastDate').innerText = lastTweet.toLocaleDateString('en-US', options);
	//


	//NOTE: in order to correctly update each class tag,
	//we need counters to keep track of each category (completed event, live event, etc.)
	var liveEvents = 0;
	var achievements = 0;
	var completedEvents = 0;
	var miscellaneousPosts = 0;
	var writtenCounter = 0;

	//Here, we need to increment each counter according to the source of the post
	tweet_array.forEach(element => {
		if(element.source === "live-event") {
			liveEvents++;
		} else if(element.source === "achievement") {
			achievements++;
		} else if(element.source === "completed-event") {
			completedEvents++;
		} else if(element.source === "miscellaneous") {
			miscellaneousPosts++;
		}
	});
	//for debugging purposes
	console.log("live events: " + liveEvents);
	console.log("achievements: " + achievements);
	console.log("completed events: " + completedEvents);
	console.log("miscellaneous posts: " + miscellaneousPosts);
	//


	//Updates 'completedEvents' class tag
	//Second line of text on "About the data" page
	document.getElementsByClassName('completedEvents')[0].innerText = completedEvents;
	//Last line of text on "About the data" page
	document.getElementsByClassName('completedEvents')[1].innerText = completedEvents;
	//

	//Updates 'completedEventsPct' class tag
	if(completedEvents == 0) {
		document.getElementsByClassName('completedEventsPct')[0].innerText = completedEvents + "%";
	} else {
		//I got the concept of the following code from the link provided by the Prof (so we could use math.format())
		var completedEventsPercentage = math.format(100 * (completedEvents / tweet_array.length), {notation: 'fixed', precision: 2});
		document.getElementsByClassName('completedEventsPct')[0].innerText = completedEventsPercentage + "%";
	}
	//


	//Updates 'liveEvents' class tag
	document.getElementsByClassName('liveEvents')[0].innerText = liveEvents;
	//

	//Updates 'liveEventsPct' class tag
	if(liveEvents == 0) {
		document.getElementsByClassName('liveEventsPct')[0].innerText = liveEvents + "%" ;
	} else {
		var liveEventsPercentage = math.format(100 * (liveEvents / tweet_array.length), {notation: 'fixed', precision: 2});
		document.getElementsByClassName('liveEventsPct')[0].innerText = liveEventsPercentage + "%" ;
	}
	//


	//Updates 'achievements' class tag
	document.getElementsByClassName('achievements')[0].innerText = achievements;
	//

	//Updates 'achievementsPct' class tag
	if(achievements == 0) {
		document.getElementsByClassName('achievementsPct')[0].innerText = achievements + "%";
	} else {
		var achievementsPercentage = math.format(100 * (achievements / tweet_array.length), {notation: 'fixed', precision: 2});
		document.getElementsByClassName('achievementsPct')[0].innerText = achievementsPercentage + "%";
	}
	//


	//Updates 'miscellaneous' class tag
	document.getElementsByClassName('miscellaneous')[0].innerText = miscellaneousPosts;
	//

	//Updates 'miscellaneousPct' class
	if(miscellaneousPosts == 0) {
		document.getElementsByClassName('miscellaneousPct')[0].innerText = miscellaneousPosts + "%";
	} else {
		var miscellaneousPercentage = math.format(100 * (miscellaneousPosts / tweet_array.length), {notation: 'fixed', precision: 2});
		document.getElementsByClassName('miscellaneousPct')[0].innerText = miscellaneousPercentage + "%";
	}
	//

	//Count how many of the posts include user written text
	tweet_array.forEach(element => {
		if(element.written == true) {
			writtenCounter++;
		}
	});
	//for debugging purposes
	console.log("written counter: " + writtenCounter);
	//

	//Updates 'written' class tag
	document.getElementsByClassName('written')[0].innerText = writtenCounter;
	//

	//Updates 'writtenPct class tag
	var writtenPercentage = math.format(100 * (writtenCounter / tweet_array.length), {notation: 'fixed', precision: 2});
	document.getElementsByClassName('writtenPct')[0].innerText = writtenPercentage + "%";
	//
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
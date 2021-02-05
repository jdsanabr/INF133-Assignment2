class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        
        //ex: "Watch my run right now with @Runkeeper Live https://t.co/5bL8ZPdped #RKLive #Runkeeper"
        //text starts with "Watch my ", return "live-event"
        if(this.text.startsWith("Watch my ")) { //I removed "contains/includes "#RKlive"" since it produced 0 results
            return "live_event";
        }

        //ex: "text": "Achieved a new personal record with #Runkeeper: Distance... https://t.co/90lcXPp6SO #FitnessAlerts"
        //text starts with "Achieved a new personal record with ", return "achievement"
        if(this.text.startsWith("Achieved a new personal record with ")) {
            return "achievement";
        }

        //ex: "Just completed a 5.02 km run with @Runkeeper. Check it out! https://t.co/98hGkyBCkz #Runkeeper"
        //text contains/includes "completed " or "posted" (because otherwise it would be less than 90%), return "completed-event"
        if(this.text.includes("completed") || this.text.includes("posted")) {
            return "completed_event";
        }

        //if none of the above, then return 'miscellaneous'
        //return "unknown";
        return "miscellaneous";
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        //
        //note: I think that user-written tweets are those that contain a '-' followed by comments or hashtags
        //      since not all texts contain a '-' followed by more text
        //ex:
        //
        //"text": "Just completed a 7.03 km run - Note to self. Phone calls mid run, ruin runs https://t.co/HO4G1Oki1F #Runkeeper",
        if(this.text.includes("-")) {
            return true;
        } else {
            //Again, if I understood this correctly, an example of no user-written tweets would be:
            //"text": "Just completed a 4.08 mi run with @Runkeeper. Check it out! https://t.co/dG1u0Omco5 #Runkeeper",
            return false;
        }
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        //return "";
        //text ex: "text": "Just posted a 10.34 km run - New PB on this route \ud83d\ude42 https://t.co/7cGHlhEIlW #Runkeeper",
        //code below would return "New PB on this route \ud83d\ude42 https://t.co/7cGHlhEIlW #Runkeeper"
        //assuming I understood what the prompt is asking and I got the syntax correct
        return this.text.substring(this.text.indexOf('-')+2);
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }

        //TODO: parse the activity type from the text of the tweet
        //
        if(this.text.includes("ski")) {
            return "ski";
        }
        if(this.text.includes("run")) {
            return "run";
        }
        if(this.text.includes("walk")) {
            return "walk";
        }
        if(this.text.includes("swim")) {
            return "swim";
        }
        if(this.text.includes("bike")) {
            return "bike"
        }
        if(this.text.includes("elliptical workout")){
            return "elliptical workout"
        }
        if(this.text.includes("hike")) {
            return "hike";
        }
        if(this.text.includes("skate")) {
            return "skate";
        }
        if(this.text.includes("row")) {
            return "row";
        }
        //

        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }

        //TODO: parse the distance from the text of the tweet
        //
        //will used these to skim current text and retrieve distance
        var index1 = 0, index2 = 0;
        //this will contain the distance stated in the current text
        var dist:number = 0;
        var tempStr = this.text;

       // console.log("temp: " + tempStr);

        //to zone in closer to the float value in the current text
        index1 = tempStr.indexOf(" a ") + 2;
        if(this.text.includes(" km ")) {
            index2 = tempStr.indexOf(" km ") + 1;
        } else if(this.text.includes(" mi ")) {
            index2 = tempStr.indexOf(" mi ") + 1;
        }
        tempStr = this.text.substring(index1, index2);

        //I chose parseFloat() to extract the distance since the it will be a double (km or mi)
        dist = parseFloat(tempStr);

        //if distance is in km, convert to mi
        if(this.text.includes(" km ")) {
           dist = dist / 1.609;
        }

        //round to 2 decimal places
        dist = Number(dist.toFixed(2));

        //console.log("distance = " + dist + " in miles");

        //just in case dist = NaN (for whatever reason, *sigh*)
        if(dist != NaN) {
            return dist; //distance returned in miles
        }
        //

        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}
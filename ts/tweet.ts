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
            return "live-event";
        }

        //ex: "text": "Achieved a new personal record with #Runkeeper: Distance... https://t.co/90lcXPp6SO #FitnessAlerts"
        //text starts with "Achieved a new personal record with ", return "achievement"
        if(this.text.startsWith("Achieved a new personal record with ")) {
            return "achievement";
        }

        //ex: "Just completed a 5.02 km run with @Runkeeper. Check it out! https://t.co/98hGkyBCkz #Runkeeper"
        //text contains/includes "completed " or "posted" (because otherwise it would be less than 90%), return "completed-event"
        if(this.text.includes("completed") || this.text.includes("posted")) {
            return "completed-event";
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
        //

        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }

        //TODO: parse the distance from the text of the tweet
        //
        var myNum = 0;
        //For ex: "Just completed a 8.82 km run with @Runkeeper. Check it out! https://t.co/eo0KBQpKXk #Runkeeper"
        //Need to return 8.82/1.609 (to convert to miles)
        //or ex: "Just posted a 11.40 mi bike with @Runkeeper. Check it out! https://t.co/r0SEVy0COh #Runkeeper"
        //Need to return 11.40
        if(this.text.includes(" mi ") || this.text.includes(" km ")) {
            //find the index of the distance in the text
            //I chose parseFloat() to extract the distance since the it will be a double (km or mi)
            myNum = parseFloat(this.text);

            //Need to determine if distance is in kilometers. If so, convert to miles.
            if(this.text.includes(" km ")) {
                myNum = myNum / 1.609;
                console.log("myNum is now " + myNum + " miles."); //for debugging
            } else {
                console.log("myNum is " + myNum + " miles. *Was always in miles*"); //for debugging
            }
        }
        //


        //NOTE TO SELF: commented out but left here in case I need to come back to it
                // if(this.text.includes("run") || this.text.includes("walk")) {
        //     //I chose parseFloat() to extract the distance since the it will be a double (km or mi)
        //     myNum = parseFloat(this.text);
        //     return myNum;
        // }

        return myNum;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}
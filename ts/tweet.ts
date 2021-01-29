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
        //
        //if text contains/includes 'live', then return 'live-event'
        if(this.text.includes("RKlive")) {
            //text will contain: "...#RKLive #Runkeeper"
            return "live-event";
        }

        //if text contains/includes 'achieve', then return 'achievement'
        if(this.text.includes("achieve")) {
            //text will start with: "Achieved a new..."
            return "achievement";
        }

        //if text contains/includes 'completed', then return 'completed-event'
        if(this.text.includes("completed")) {
            //text will contain: "Just completed a X mi/km run/walk..."
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
        //"completed" implies various activity types (i.e. run, walk, swim, etc)
        if(this.text.includes("completed")) {
            if(this.text.includes("run")) {
                return "run";
            }

            if(this.text.includes("walk")) {
                return "walk";
            }

            if(this.text.includes("swim")) {
                return "swim";
            }

            if(this.text.includes("ski")) {
                return "ski";
            }

            if(this.text.includes("bike")) {
                return "bike"
            }
        }

        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }

        //TODO: parse the distance from the text of the tweet
        //
        //For ex, "text": "Just completed a 8.82 km run with @Runkeeper. Check it out! https://t.co/eo0KBQpKXk #Runkeeper"
        //Extract 8.82
        if(this.text.includes("run") || this.text.includes("walk")) {
            //I chose parseFloat() to extract the distance since the it will be a double (km or mi)
            var myNum = parseFloat(this.text);
            return myNum;
        }

        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}
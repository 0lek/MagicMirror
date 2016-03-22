var config = {
    lang: 'pl',
    time: {
        timeFormat: 24,
        displaySeconds: true,
        digitFade: false,
    },
    weather: {
        //change weather params here:
        //units: metric or imperial
        params: {
            q: 'Krakow',
            units: 'metric',
            // if you want a different lang for the weather that what is set above, change it here
            lang: 'pl',
            APPID: 'f28c59fcbb18192a3621c0b20f9fdccb'
        }
    },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
        	'Dzień dobry, przystojniaku!',
        	'Miłego dnia!',
        	'Jak się spało?',
        	'Dzisiaj jest ten dzień!',
        ],
        afternoon: [
        	'Cześć, piękności!',
        	'Wyglądasz seksownie!',
        	'Wow, dobrze dzisiaj wyglądasz!'
        ],
        evening: [
			'Wyglądasz super!',
			'Hej, seksi!',
			'Dobrze wyglądasz!'
        ]
    },
    calendar: {
        maximumEntries: 10, // Total Maximum Entries
		displaySymbol: true,
		defaultSymbol: 'calendar', // Fontawsome Symbol see http://fontawesome.io/cheatsheet/
        urls: [
		{
			//symbol: 'calendar-plus-o', 
			//url: 'https://calendar.google.com/calendar/ical/hello%40aleksanderjarosz.pl/private-259bdebc13875622234e5303cd7f8d1b/basic.ics'
		},
		{
			//symbol: 'soccer-ball-o',
			//url: 'https://www.google.com/calendar/ical/akvbisn5iha43idv0ktdalnor4%40group.calendar.google.com/public/basic.ics',
		},
		// {
			// symbol: 'mars',
			// url: "https://server/url/to/his.ics",
		// },
		// {
			// symbol: 'venus',
			// url: "https://server/url/to/hers.ics",
		// },
		// {
			// symbol: 'venus-mars',
			// url: "https://server/url/to/theirs.ics",
		// },
		]
    },
    news: {
        //feed: 'http://www.tvn24.pl/krakow,50.xml'
    },
    smog: {
    	smogStation: 'Kraków, Al. Krasińskiego',
    	// This only applies to PM10 measurements
    	smogMessageNormExceeded: 'Smog atakuje. Lepiej zostań na kawę!',
    	smogMessageNormNotExceeded: 'Powietrze w porządku. Bierz kawę na wynos!',
    	smogMessageNormExceededEN: '(Smog is attacking. Better stay indoors for coffee.)',
    	smogMessageNormNotExceededEN: '(Air is ok. Take a coffee and enjoy the outside!)',
    	// Norms from powietrze.gios.gov.pl
    	normCO: 10000,
    	normNO2: 200,
    	normPM10: 50,
    	normPM25: 25,
    	// Defines the threshold (in percentage of the norm) after which the norm exceeded msg is shown
    	PM10Threshold: 100
    }
}

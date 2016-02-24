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
			symbol: 'calendar-plus-o', 
			url: 'https://p01-calendarws.icloud.com/ca/subscribe/1/n6x7Farxpt7m9S8bHg1TGArSj7J6kanm_2KEoJPL5YIAk3y70FpRo4GyWwO-6QfHSY5mXtHcRGVxYZUf7U3HPDOTG5x0qYnno1Zr_VuKH2M'
		},
		{
			symbol: 'soccer-ball-o',
			url: 'https://www.google.com/calendar/ical/akvbisn5iha43idv0ktdalnor4%40group.calendar.google.com/public/basic.ics',
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
        feed: 'http://www.tvn24.pl/krakow,50.xml'
    }
}

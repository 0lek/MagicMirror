var smog = {
	smogStation: config.smog.smogStation,
	smogLocation: '.smog',
	smogMsgLocation: '.smogmsg',
	smogMsgLocationEN: '.smogmsgen',
	smogMessageNormExceeded: config.smog.smogMessageNormExceeded,
	smogMessageNormNotExceeded: config.smog.smogMessageNormNotExceeded,
	smogMessageNormExceededEN: config.smog.smogMessageNormExceededEN,
	smogMessageNormNotExceededEN: config.smog.smogMessageNormNotExceededEN,
	normCO: config.smog.normCO,
    normNO2: config.smog.normNO2,
    normPM10: config.smog.normPM10,
    normPM25: config.smog.normPM25,
    PM10Threshold: config.smog.PM10Threshold,
	updateInterval: config.compliments.interval || 30000,
	fadeInterval: config.compliments.fadeInterval || 4000,
	intervalId: null
}

smog.updateSmog = function () {
	var smogStation = this.smogStation;
	var smogMessageNormExceeded = this.smogMessageNormExceeded;
	var smogMessageNormNotExceeded = this.smogMessageNormNotExceeded;
	var smogMessageNormExceededEN = this.smogMessageNormExceededEN;
	var smogMessageNormNotExceededEN = this.smogMessageNormNotExceededEN;
	var normCO = this.normCO;
	var normNO2 = this.normNO2;
	var normPM10 = this.normPM10;
	var normPM25 = this.normPM25;
	var PM10Threshold = this.PM10Threshold;
	var maxDate = new Date('1/1/1900');
	var _smog = '<table class="forecast-table"><tr>';
    var _smogmsg = "";
    var _smogmsgen = "";
    
    var response = $.ajax( {
    	type: "GET",
    	//url: "http://localhost/sample.xml",
    	//url: "http://www.malopolska.pl/_layouts/WrotaMalopolski/XmlData.aspx?data=2",
    	url: "http://localhost/MagicMirror/proxy.php?url=http%3A%2F%2Fwww.malopolska.pl%2F_layouts%2FWrotaMalopolski%2FXmlData.aspx%3Fdata%3D2",
    	dataType: 'xml',
    	context: document.body,
    	global: false,
    	async:false,
    	success: function(data) {
        	return data;
    	}
	}).responseText;
	
	$(response).find("Item").each(function() {
		var station = $(this).find("City").text();
		var concentration = $(this).find("Concentration").text();
		
		// Get the max date
		if (station == smogStation && concentration == "24h") {
			var date = parseDate($(this).find("Date").text());
				
			if(date > maxDate) {
				maxDate = date;
			}
		}
	})
	
	$(response).find("Item").each(function() {
		var station = $(this).find("City").text();
		var concentration = $(this).find("Concentration").text();	
		
		if (station == smogStation && concentration == "24h") {
			var pollutant = $(this).find("Pollutant").text();
			var value = $(this).find("Value").text();
			var date = parseDate($(this).find("Date").text());	
			
			// Check for dates
			if(compareDates(date, maxDate) == true) {
				// Calculate the norm percentage for each pollutant
				
				var flVal = parseFloat(value.replace(',','.'));
				
				switch(pollutant){
					case "CO": {
						var norm = Math.round((flVal/normCO)*100);
						var pollutantText = "CO";
						var pollutantUnit = "&micro;g/m<sup>3</sup>";
						break;
					};
					case "NO2": {
						var norm = Math.round((flVal/normNO2)*100);
						var pollutantText = "NO<sub>2</sub>";
						var pollutantUnit = "&micro;g/m<sup>3</sup>";
						break;
					};
					case "PM10": {
						var norm = Math.round((flVal/normPM10)*100);
						var pollutantText = "PM<sub>10</sub>";
						var pollutantUnit = "&micro;g/m<sup>3</sup>";
					
						// Add a special msg to the bottom of the mirror
						if( norm > PM10Threshold ) {
							_smogmsg = "<span>" + smogMessageNormExceeded + "</span>";
							_smogmsgen = "<span>" + smogMessageNormExceededEN + "</span>";
						}
						else {
							_smogmsg = "<span>" + smogMessageNormNotExceeded + "</span>";
							_smogmsgen = "<span>" + smogMessageNormNotExceededEN + "</span>";
						}
						break;
					};
					case "PM2.5": {
						var norm = Math.round((flVal/normPM25)*100);
						var pollutantText = "PM<sub>2.5</sub>";
						var pollutantUnit = "&micro;g/m<sup>3</sup>";
						break;
					};
				}
				
				// Let's just round it to an integer...
				var roundedVal = Math.round(flVal);
				
				// Construct the table and format stuff
				_smog += '<td class="xxsmall xdimmed">' + pollutantText + ':   </td>';
				_smog += '<td class="small dimmed">' + norm + '% </td>';
				_smog += '<td class="xxxsmall xdimmed">' + ' (' + roundedVal + pollutantUnit + ')</td></tr>';
			}
		}
	})
	
	
	TUTAJ
	
	_smog += '</table>';
	
	// Write to the page
	$(this.smogLocation).updateWithText(_smog, 1000);
	$(this.smogMsgLocation).updateWithText(_smogmsg, 1000);
	$(this.smogMsgLocationEN).updateWithText(_smogmsgen, 1000);
}

function parseDate(myDate) {
    var parts, date, time, dt, ms;

    parts = myDate.split(/[T ]/); // Split on `T` or a space to get date and time
    date = parts[0];
    time = parts[1];

    dt = new Date();

    parts = date.split(/[-\/]/);  // Split date on - or /
    dt.setFullYear(parseInt(parts[0], 10));
    dt.setMonth(parseInt(parts[1], 10) - 1); // Months start at 0 in JS
    dt.setDate(parseInt(parts[2], 10));

    parts = time.split(/:/);    // Split time on :
    dt.setHours(parseInt(parts[0], 10));
    dt.setMinutes(parseInt(parts[1], 10));
    dt.setSeconds(parseInt(parts[2], 10));

    return dt;
}

// Somehow the same timestamps have a millisecond difference that's greater than 0
// Due to this, all JS built-in comparison mechanisms fail
// Function takes input as YYYY-MM-DD HH:MM:SS
// Returns true, if dates are the same, false if dates are not the same
// Compares down to seconds
function compareDates(inpDate1, inpDate2) {
	var bResult;
	
	// Prepare error indicator
	bResult = true;
	
	if(inpDate1.getYear() != inpDate2.getYear()) {
		// Years do not match
		bResult = false;
	}
	if(inpDate1.getMonth() != inpDate2.getMonth()) {
		// Months do not match
		bResult = false;
	}
	if(inpDate1.getDay() != inpDate2.getDay()) {
		// Days do not match
		bResult = false;
	}
    if(inpDate1.getHours() != inpDate2.getHours()) {
		// Hours do not match
		bResult = false;
	}
	if(inpDate1.getMinutes() != inpDate2.getMinutes()) {
		// Minutes do not match
		bResult = false;
	}
	if(inpDate1.getSeconds() != inpDate2.getSeconds()) {
		// Seconds do not match
		bResult = false;
	}

    return bResult;
}

smog.init = function () {

	this.updateSmog();
	
	this.intervalId = setInterval(function () {
		this.updateSmog();
	}.bind(this), this.updateInterval)


}
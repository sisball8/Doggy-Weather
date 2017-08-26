//set-up global variables
var lat, lon, url, temp, cTemp, farenheit, city, weather, description, icon, HI, HIADJ;
var button = document.querySelector("#changeBtn");



$(document).ready(function() {
 
  //use geolocation from FCC
  if (navigator.geolocation) {
    //Return the user's longitude and latitude on page load using HTML5 geolocation API
  navigator.geolocation.getCurrentPosition(function(position) {
  //store in local variables to be usedto concatonate api url
  lat = position.coords.latitude;
  lon = position.coords.longitude;
    // apend 'https://cors-anywhere.herokuapp.com/' to api as a work around on codepen http vs https issue. 
    url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=316c14b2df746d89f9bd753c238dc362&units=metric";
      // get current weather
    $.getJSON(url, function(data) {
      local = data.name;
      temp = data.main.temp;
      cTemp = Math.round(temp)+ "º";
      fTemp = Math.round(data.main.temp*1.8 + 32) + " ºF";
      fTemp2= Math.round(data.main.temp*1.8 + 32);
      weather = data.weather[0].main;
      description = data.weather[0].description;
      icon = data.weather[0].icon;
      hum = data.main.humidity;
      // console.log(hum);
      press = Math.round(data.main.pressure/34.433);
      pressMbr = data.main.pressure;
      $("#weather").text(cTemp);
      $("#weather2").text(fTemp);


      $("#local").text(local);
       $('#icon').attr('class', 'wi wi-owm-' + data.weather[0].id);
      $("#description").text(description);
       // $('#icon2').html('<img src='+'http://openweathermap.org/img/w/' + data.weather[0].icon+ '.png' +'>'+ description);

       $("#hum").text(hum);
       $("#press").text(press + "in Hg");
       // $("#press").text(press + "/ " + pressMbr);
HI = -42.379 + 2.04901523*fTemp2 + 10.14333127*hum - .22475541*fTemp2*hum - .00683783*fTemp2*fTemp2 - .05481717*hum*hum + .00122874*fTemp2*fTemp2*hum + .00085282*fTemp2*hum*hum - .00000199*fTemp2*fTemp2*hum*hum;
    
  if (hum < 13 && fTemp2 > 80 && fTemp2 < 112) {
  var g = ((13 - hum)/4) * (Math.sqrt(17-Math.abs(fTemp2-95)/17));
  HIADJ = HI - g;
      console.log("subtracted g=" + g + "so HIADJ is " + HIADJ);
  } else if (hum > 85 && fTemp2 > 80 && fTemp2 < 87) {
  var i = ((hum - 85)/10)*((87-fTemp2)/5);
  HIADJ = HI + i;
    console.log("added i=" + i + "so HIADJ is " + HIADJ);
  } else {
  HIADJ = HI;
  } 
  $("#HIADJ").text(Math.round((HIADJ-32)*5/9) + "º");
      
      if (HIADJ > 95) {
  codeScale = .15;
  codeColor = '#F0694E';
  text = "Life threatening. Avoid prolonged outdoor activity, no more than 15 minutes.";
} else if (HIADJ > 90 && HIADJ < 94) {
  codeScale = .14;
  text = "Life threatening. Avoid prolonged outdoor activity, no more than 15 minutes.";
  codeColor = '#F46B50';
} else if (HIADJ > 85 && HIADJ < 89) {
  codeScale = .33;
  codeColor = '#FEC13F';
  text = "Dangerous weather. Use caution.";
} else if (HIADJ > 80 && HIADJ < 84) {
  codeScale = .54;
  codeColor = '#F9ED3A';
  text = "Unsafe potential for certain breeds when outside.";
  } else if (HIADJ > 75 && HIADJ < 79) {
  codeScale = .53;
  codeColor = '#FFF639';
  text = "Unsafe potential for certain breeds when outside.";
} else if (HIADJ > 70 && HIADJ < 74) {
  codeScale = .73;
  codeColor = '#BCD663';
  text = "Risk unlikely. Have fun outside but be careful.";
} else if (HIADJ > 65 && HIADJ < 69) {
  codeScale = .93;
  codeColor = '#79C069';
  text = "No evidence of risk. Have fun outside!";
} else if (HIADJ > 60 && HIADJ < 64) {
  codeScale = .92;
  codeColor = '#7DC76D';
  text = "No evidence of risk. Have fun outside!";
} else if (HIADJ > 55 && HIADJ < 59) {
  codeScale = .91;
  text = "No evidence of risk. Have fun outside!";
  codeColor = '#79C069';
} else if (HIADJ > 50 && HIADJ < 54) {
  codeScale = .90;
  codeColor = '#75B966';
  text = "No evidence of risk. Have fun outside!";
} else if (HIADJ > 45 && HIADJ < 49) {
  codeScale = .70;
  codeColor = '#BCD663';
  text = "Risk unlikely. Have fun outside but be careful.";
} else if (HIADJ > 40 && HIADJ < 44) {
  codeScale = .52;
  codeColor = '#FFF639';
} else if (HIADJ > 35 && HIADJ < 39) {
  codeScale = .51;
  codeColor = '#F9ED3A';
  text = "Unsafe potential for certain breeds when outside.";
} else if (HIADJ > 30 && HIADJ < 34) {
  codeScale = .50;
  codeColor = '#F1E539';
  text = "Unsafe potential for certain breeds when outside.";
} else if (HIADJ > 25 && HIADJ < 29) {
  codeScale = .32;
  codeColor = '#FEC13F';
  } else if (HIADJ > 20 && HIADJ < 24) {
  codeScale = .31;
  codeColor = '#F5BB3E';
  text = "Dangerous weather. Use caution.";
} else if (HIADJ > 15 && HIADJ < 19) {
  codeScale = .30;
  codeColor = '#ECB43D';
  text = "Dangerous weather. Use caution.";
} else if (HIADJ > 10 && HIADJ < 14) {
  codeScale = .13;
  codeColor = '#F46B50';
  text = "Life threatening. Avoid prolonged outdoor activity, no more than 15 minutes.";
} else if (HIADJ > 5 && HIADJ < 9) {
  codeScale = .12;
  codeColor = '#F0694E';
  text = "Life threatening. Avoid prolonged outdoor activity, no more than 15 minutes.";
} else if (HIADJ > 0 && HIADJ < 4) {
  codeScale = .10;
  codeColor = '#E3634A';
  text = "Life threatening. Avoid prolonged outdoor activity, no more than 15 minutes.";
} else {
  codeScale = 1.;
  codeColor = '';
  text = "Magic ball is broken. Can't read your weather right now. Try again later. :)";
}
      
// text; 
$("#text").text(text);

     });
      

   $("#changeBtn").on("click", function(){
  if (button.textContent === "ºF") {
    $("#weather").text(fTemp);
    $("#changeBtn").text("ºC");
  } else {
    $("#weather").text(cTemp);
    $("#changeBtn").text("ºF");
  }
});

      
      
      
      
      
      
     });
  }
});

//a46705ec87c60130c853bf9faef0a7d4828f02ca
//http://api.openweathermap.org/data/2.5/weather?lat=31&lon=121&appid=316c14b2df746d89f9bd753c238dc362

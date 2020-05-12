$(document).ready(function() {

    //on click
    $("#search-btn").on("click", function() {

    //search value
    const searchValue = $("#search-value").val().trim();
    

    //call search weather function
    searchWeather(searchValue);
    })

    //function to search for current weather
    function searchWeather (cityName){


     //clear today div
     $("#today").empty();
        


                //query api

                 $.ajax({
                type: "GET",
                 url: 'https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b212bd879bf90b0bc8810198dd55ad6e'
                }).then(function(response){
                console.log(response);

                //extract data from response
                const name = response.name;
                const wind = response.wind.speed;
                const humidity = response.main.humidity;
                const temperature = response.main.temperature;
                const img = 'https://openweathermap.org/img/w/${response.weather[0].icon}.png';

                console.log(name, wind, humidity, temperature, img);

                //card title
                const titleEl =$("<h2>").addClass("card-title").text('${name} (${new Date().toLocalDateString()})');


                //create card
                const card = $("<div>").addClass("card");

                //create card body
                const cardBody = $("<div>").addClass("card-body");


                //data to insert into card
                const windEl = $("<p>").addClass("card-text").text('Wind Speed: ${wind} MPH');
                const humidEl = $("<p>").addClass("card-text").text('humidity:');
                const tempEl = $("<p>").addClass("card-text").text('Temperature: ${temperature}');
                const imgEl = $("<img>").attr("src", img);

                //combine data into card
                titleEl.append(imgEl);

                //append data into card body
                cardBodyEl.append(titleEl, tempEl, hummidEl, windEl);

                //append card body
                cardEl.append(cardBodyEl);

                //append onto html page
                $("#today").append(cardEl);



                //get latitude
                const latitude = response.coord.lat;


                //get longitude
                const longitude = response.coord.lon;
            })
         }

                function getUVIndex(lat,lon) {

                //call api to get UV index
                $.ajax({
                    type: "GET",
                    url: 'http://api.openweathermap.org/data/2.5/uvi?appid=b212bd879bf90b0bc8810198dd55ad6e&lat=${lat}&lon=${lon}'
                }).then(function(response){

                    const uvValue = response.value;

                    const uvEl = $("<p>").text('UV Index: ');
                    const btnEl = $("<span>").addClass("btn btn-sm").text(uvValue);

                    //change color of btn based on uv value

                    if(uvValue < 3){
                        btnEl.addClass("btn-success");

                    }

                    else if(uvValue < 7){
                        btnEl.addClass("btn-warning");
                    }
                    
                    else{
                        btnEl.addClass("btn-danger");
                    }

                    //append the btnEl to uvEl
                    uvEl.append(btnEl);

                    //append to card body
                    $("today .card-body").appened(uvEl);



                })
            }

                    function getForecast(cityName) {

                        $.ajax({
                            type: "GET" ,
                            url: 'api.openweathermap.org/data/2.5/forecast?q=#{cityName}&appid=b212bd879bf90b0bc8810198dd55ad6e'
                        }).then(function(response) {
            
                        $("#forecast").html("<h4> class=\"mt-3\">5-Day Forecast: </h4>").append("<div class=\"row\">");   


                        //loop over all forecasts
                        for(var i = 0; i< response.list.length; i+=8 {

                    
                        //create column
                        const colEl = $("<div>").addClass("col-md-2");

                        //create card
                        const cardEl = $("<div>").addClass("card bg-primary text-white");

                        //card body
                        const cardBodyEl = $("<div>").addClass("card-body p-2");

                        //extract data from current element
                        const title = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt.toLocaleDateString()));

                        const img = $("<img>").attr("src", 'https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png'  )

                        const tempEL = $("<p>").addClass("card-text").text('Temp: ${response.list[i].main.temp_max} ');

                        const humidityEL = $("<p>").addClass("card-text").text('Humidity: ${response.list[i].main.humidity} ');

                        //append all data to card

                        cardBodyEl.append(titleEl, imgEl, tempEl, humidityEl);
                        cardEl.append(cardBodyEl);

                        //once card is finished, append to column
                        colEl.append(cardEl);


                        //append the column onto the row
                        $("#forecast .row").append(colEl);



                            
                    
                    
                    
                            }
                        })
                     }
                    
                })


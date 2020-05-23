$(document).ready(function(){

    //create an array of cities
    const cities =["Sacramento", "Denver" , "New York City"];

    //listen for on click for search button
    $("#search-btn").on("click", function (){

        //get search value
        const searchValue = $("#search-value").val().trim();

        //push new button to array
        cities.push(searchValue);

        //call the search weather function
        searchWeather(searchValue);

        //render new button
        renderButtons();

    })


    //function that searches for current weather
    function searchWeather (cityName) {

        //clear today div
        $("#today").empty();

        //query the API
        $.ajax({
            type:"GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b212bd879bf90b0bc8810198dd55ad6e`
        }).then(function(response){
            console.log(response);


            //extract data from response
            const name = response.name;
            const wind = response.wind.speed;
            const humidity = response.main.humidity;
            const temperature = response.main.temp;
            const img = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`;

            console.log(name, wind, humidity, temperature, img);

            
            //create card title
            const titleEl = $("<h2>").addClass("card-title").text(`${name} (${new Date().toLocaleDateString()})`);

            //create the card
            const cardEl = $("<div>").addClass("card");

            //create the card body
            const cardBodyEl = $("<div>").addClass("card-body");

            //data to insert into card
            const windEl = $("<p>").addClass("card-text").text(`Wind Speed: ${wind} MPH`);
            const humidEl = $("<p>").addClass("card-text").text(`Humidity: ${humidity}`);
            const tempEl = $("<p>").addClass("card-text").text(`Temperature ${temperature}`);
            const imgEl = $("<img>").attr("src", img);

            //combine data into our card
            titleEl.append(imgEl);

            //append all data into card body section
            cardBodyEl.append(titleEl, tempEl, humidEl, windEl);

            //append the card body onto card element
            cardEl.append(cardBodyEl);

            //append onto HTML page
            $("#today").append(cardEl);

            //get lat
            const latitude = response.coord.lat;

            //get lon
            const longitude = response.coord.lon;

            

            getUVIndex(latitude, longitude)
            getForecast(name);


        })
    }


            function getUVIndex (lat, lon){

                //call API
                $.ajax({
                    type:"GET",
                    url: `https://api.openweathermap.org/data/2.5/uvi?appid=b212bd879bf90b0bc8810198dd55ad6e&lat=${lat}&lon=${lon}`
                }).then(function(response){
                    
                    const uvValue = response.value;

                    const uvEl = $("<p>").text(`UV Index: `);
                    const btnEl = $("<span>").addClass("btn btn-sm").text(uvValue);

                    //change color of the btn based UV index

                    if(uvValue < 3){
                        btnEl.addClass("btn-success");
                    }

                    else if (uvValue < 7){
                        btnEl.addClass("btn-warning");
                    }

                    else{
                        btnEl.addClass("btn-danger");
                    }

                    //append the btnEl to uvEl
                    uvEl.append(btnEl);

                    //append to card body
                    $("#today .card-body").append(uvEl);




                    

                })


            }
                    function getForecast(cityName) {

                        $.ajax({
                            type:"GET",
                            url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=b212bd879bf90b0bc8810198dd55ad6e`
                        }).then(function(response){
                            console.log(response);

                            $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast: </h4>").append("<div class=\"row\">");

                            //loop over all forecasts
                            for (var i = 0; i < 5; i++){
                               
                                // create column
                                const colEl = $("<div>").addClass("col-md-2");

                                //create a card
                                const cardEl = $("<card>").addClass("card bg-primary text-white");

                                //create card body
                                const cardBodyEl = $("<div>").addClass("card-body p-2");

                                //extract out data from current element that we are on
                                const titleEl = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt.toLocaleDateString()));
                                const imgEl = $("<img>").attr("src", `https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`);
                                const tempEl = $("<p>").addClass("card-text").text(`Temp: ${response.list[i].main.temp_max}`);
                                const humidityEl = $("<p>").addClass("card-text").text(`Humidity: ${response.lsit[i].main.humidity}`);

                                //append all data to card element
                                cardBodyEl.append(titleEl, imgEl, tempEl, humidityEl);
                                cardEl.append(cardBodyEl);


                                //append to column
                                colEl.append(cardEl)

                                //apppend column to row
                                $("#forecast .row").append(colEl);


                            }
                        })

                    }


                            function renderButtons () {

                                $(".cities").empty();
                                for(let i = 0; i < cities.length; i++){
                                    //create list item
                                    const listItem = $("<li>").addClass("current-city list-group-item list-group-item-action").attr("data-city", cities[i]).text(cities[i]);
                                    $(".cities").append(listItem)


                            }
                }


                            $(document).on("click", "current-city", function(){

                            //get city name from the one clicked
                            const cityName = $(this).attr("data-city");
                            searchWeather(cityName);


                                

                            })

                            //on page load

                            renderButtons();
})
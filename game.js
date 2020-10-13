//Capital City Quiz lab. This program uses world bank API to get capital city of the randomly selected country from country.js.
//TODO add room for error on user spelling. currently the user answer must match exactly as its spelled in world bank API
//Jacob Tyson 10/13/2020


let randomCountryElement = document.querySelector('#random-country')    // selects doc element
let userAnswerElement = document.querySelector("#user-answer")  //  selects doc element
let submitButton = document.querySelector("#submit-answer")   // selects submit button

function play_game(){
  let number_of_countries = countriesAndCodes.length;   //  Gets the length of countries and code array
  let random_country_number = Math.floor(Math.random() * number_of_countries);   //  selects random number from 0 - total number of countries in array

  let random_country_display = document.querySelector('#random-country');   //  Selects DOM element of random Country
  let random_country_object = countriesAndCodes[random_country_number];   //  Selects the object based from random number of countries in array
  let country_name = random_country_object.name;
  random_country_display.innerHTML = country_name;   //  Displays the name of country in the selected object in html element
  let country_Abr = random_country_object['alpha-2'];


    let url = `https://api.worldbank.org/v2/country/${country_Abr}?format=json`   //  get world bank api. uses country abbr from randomly selected country
    let capital_name    //  delcares var for country name

    fetch(url)       //  declares variable for array object from world bank api contains country info.
    .then( (response) =>{
      let json_data = response.json();    //  gets the json data promise
      return json_data;
    }).catch( (err) => {
      alert('API Error. Please try again later!')   //  sends alert if api error occurs.
    }).then( (country_array) =>{    //  uses json data to get capital name fromrandomly generated country.
      let get_array_object = country_array[1];
      let capital_name

      function get_capital_name(get_array_object){    //  Creates function with selected array object of random country. to get capital name
        let capital_name
        for (let i = 0; i < get_array_object.length; i++){    //    loops through array add name value to country_name
          capital_name = get_array_object[i].capitalCity   // access capital name from json data
        }return capital_name    // returns randomly selected country.
      }

      capital_name = get_capital_name(get_array_object)   //  gets randomly generated country's capital name.
      return capital_name
    }).then( (capital_name) =>{
         //  displays the reults
      let submit_button = document.querySelector('#submit-answer');
      submit_button.addEventListener('click', ()=>{
        let user_input = document.querySelector('#user-answer');    //  selects html input element
        let user_answer = user_input.value;
      if (user_answer == capital_name){
        let result_display = document.querySelector('#result')
        result_display.innerHTML ='Correct! The capital of ' +country_name+' is '+ capital_name   // right answer display
      }else{
        let result_display = document.querySelector('#result')
        result_display.innerHTML ='Wrong. The capital of ' +country_name+' is '+ capital_name   //  wrong answer display
        }
      })
    })
  }

play_game()   //  Starts game when page loads.

let play_again_button =  document.querySelector('#play-again')

play_again_button.addEventListener('click', () => {   //  resets game with new random country.
  document.getElementById('user-answer').value=''
  play_game()
})

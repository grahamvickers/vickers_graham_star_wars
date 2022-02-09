// this is the main javascript file where the backend functionality will happen

// created a component to show the data on the front-end
Vue.component('character-list', {
    // this is the template that will display on the front end html
    template: 
    `<form>
        <div id="searchCon">
            <input type="text" placeholder="ex. R2D2" v-model="searchResult" id="search"/>
        </div>
        <ul id="characterList">
            <li v-for="character in filteredCharacters">
                <!-- toggle the onclick between mockup() and disabled to see how the app works when functional -->
                <a onclick="mockup()" v-on:click="">{{character.name}}</a>
            </li>
        </ul>
    </form>`,

    data: function() {
        return {
            searchResult: "",
            selected: ""
        }
    },

    // methods: {
    //     clicked: function(event) {
    //         console.log(event.currentTarget.id);
    //         // characterId = e.currentTarget.id;
    //     }
    // },

    props: ['thecharacters', 'thefilms'],
    computed: {
        filteredCharacters: function() {
            let characters_array = this.thecharacters;
            let searchResult = this.searchResult;

            if(searchResult==="") {
                return characters_array;
            }
            searchResult = searchResult.trim().toLowerCase();
            // searching array and displaying results
            characters_array = characters_array.filter(function(droid) {
                //console.log(droid.name.toLowerCase().indexOf(searchResult));
                if(droid.name.toLowerCase().indexOf(searchResult) !== -1) {
                    return droid;
                }
            })
            return characters_array;
        },
        displayFilm: function(){

        }
    }
});

// create the clicked character component to display the film

Vue.component('character-clicked', {
    template:
    `<div id="filmCon">
        <div id="filmDetails">
            <img v-bind:filmposter="film">
            <div id="moreDetails">
                <h3>{{films.title}}</h3>
                <p>Director: {{film.director}}</p>
                <p>Year: {{film.release_date}}</p>
            </div>
        </div>    
        <p>{{films.opening_crawl}}</p>
    </div>`,

    props: ['thefilms'],
    computed: {
        // filmOptions: function() {
        //     let film_array = this.film;
        //     return film_array;
        // }
        displayFilm: function() {
            let film_array = this.films;
            let selected = this.selected;


        }
    }
});

Vue.component('film-poster', {
    template: 
    `<img v-bind:src="filmNames">`,
    props: ['filmposter'],
    computed: {
        filmNames: function() {
            let path = this.filmposter.url;
            let img = path.substring(10).slice(0,-1);
            console.log(img)
            return `images/${img}.png`
        }
    }
})

// create a new vue model
let vm = new Vue({
    el: "#app",
    data: {
        characters: [],
        films: []
    },
    // fetch all the characters from the api
    created: function() {
        fetch('https://swapi.dev/api/people/')
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            //console.log(data)
            vm.characters = data.results;
        })
    },
    selected: function() {
        fetch('https://swapi.dev/api/films/')
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            //console.log(data)
            vm.films = data.results;
        })
    },  
}); 

let clickedVM = new Vue({
    el: "#filmCon2",
    data: {
        films: []
    },
    created: function() {
        fetch('https://swapi.dev/api/films/')
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            //console.log(data)
            vm.films = data.results;
        })
    },
    
})

// to try and make this work replace with the variable in onclick listener in the template above 
// function showFilm() {
//     let url = "https://swapi.dev/api/films/";

//     fetch(url).then(function(response) {
//         return response.json();
//     }).then (function(films){
//         document.querySelector("#container").innerHTML += `<div id="filmsCon"></div>`;
//         let displayFilm = document.querySelector("#filmsCon");

//         films.result(result=> {
//             displayFilm.innerHTML =+ `
//             <div id="filmDetails">
//                 <img src="images/0.png" alt="A New Hope - movie poster">
//                 <div id="moreDetails">
//                     <h3>${result.title}</h3> 
//                     <p>Director: ${result.director}</p>
//                     <p>Year: ${result.release_date}</p>
//                 </div>
//             </div>
//             <p>${result.opening_crawl}</p>
//             `
//         });
//     })
// }

function lightsaber(){
    var soundEffect = new Audio('./audio/lightsaber.mp3');
    soundEffect.play();
}

function mockup() {
    var filmMockup = document.getElementById("filmCon");
    if (filmMockup.style.display === "none") {
        filmMockup.style.display = "flex";
    } else {
        filmMockup.style.display = "none";
    }
  }
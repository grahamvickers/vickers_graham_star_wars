// this is the main javascript file where the backend functionality will happen

// created a component to show the data on the front-end
Vue.component('character-list', {
    template: 
    `<form>
        <div id="searchCon">
            <input type="text" placeholder="ex. R2D2" v-model="searchResult" id="search"/>
        </div>
        <ul id="characterList">
            <li v-for="character in filteredCharacters">
                <a v-on:click="">{{character.name}}</a>
            </li>
        </ul>
    </form>`,

    data: function() {
        return {
            searchResult: ""
        }
    },
    props: ['thecharacters'],
    computed: {
        filteredCharacters: function() {
            let characters_array = this.thecharacters;
            let searchResult = this.searchResult;

            if(searchResult==="") {
                return characters_array;
            }

            searchResult = searchResult.trim().toLowerCase();

            characters_array = characters_array.filter(function(droid) {
                //console.log(droid.name.toLowerCase().indexOf(searchResult));
                if(droid.name.toLowerCase().indexOf(searchResult) !== -1) {
                    return droid;
                }
            })

            return characters_array;
        }
    }
});
// create a new vue model
let vm = new Vue({
    el: "#app",
    data: {
        characters: []
    },
    created: function() {
        fetch('https://swapi.dev/api/people/')
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            //console.log(data)
            vm.characters = data.results;
        })
    }

}); 
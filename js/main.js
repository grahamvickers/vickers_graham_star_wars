// this is the main javascript file where the backend functionality will happen

// created a component to show the data on the front-end
Vue.component('character-list', {
    template: 
    `<form>
        
    </form>`
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
            console.log(data)
            vm.characters = data.results;
        })
    }
}); 
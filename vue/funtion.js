import { createApp, ref , reactive} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'



createApp({

setup() {

let llista=reactive({zapatillas:[]});

fetch('./data.json')
.then(response => response.json())  
.then(data => {


llista.zapatillas=data.zapatillas;

 
    
    })
 


return {

        llista, 
        
        }


}

}).mount('#appVue')
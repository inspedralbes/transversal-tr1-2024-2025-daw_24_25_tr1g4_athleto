    import { createApp, ref , reactive} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'



    createApp({

    setup() {

    let llista=reactive({zapatillas:[]});

    fetch('./data.json')
    .then(response => response.json())  
    .then(data => {


    llista.zapatillas=data.zapatillas;




        })

    const visibleProd=ref(false);
    const visiblePort=ref(true);
    

    return {

            llista, visibleProd,visiblePort 
            
            }


    }

    }).mount('#appVue')
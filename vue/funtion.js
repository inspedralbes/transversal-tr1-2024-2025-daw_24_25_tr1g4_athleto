    import { createApp, ref , reactive} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'



    createApp({

    setup() {

    let llista=reactive({zapatillas:[]});

    fetch('./data.json')
    .then(response => response.json())  
    .then(data => {


    llista.zapatillas=data.productes;

        


        })

    const visibleProd=ref(false);
    const visiblePort=ref(true);
    const visibleActual=ref(false);
    const actual=reactive({nom:"",preu:"",imatge:"", })
    function mostrar(data){

        actual.nom=llista.zapatillas[data].nom;
        actual.preu=llista.zapatillas[data].preu;
        actual.imatge=llista.zapatillas[data].imatge;
        actual.descripcio=llista.zapatillas[data].descripcio;
        console.log(actual)
        visibleActual.value=true;
        visibleProd.value=false;
    }

    return {

            llista, visibleProd,visiblePort,visibleActual,mostrar,actual 
            
            }


    }

    }).mount('#appVue')
    import { createApp, ref, onBeforeMount, reactive} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
    import { getProductes } from './communicationManager.js';


    createApp({

    setup() {

    let llista=reactive({zapatillas:[]});

    onBeforeMount ( async () => {
        const data = await getProductes();
        llista.zapatillas=data;
        console.log(llista.zapatillas)
    });
     
    const visibleProd=ref(false);
    const visiblePort=ref(true);
    const visibleActual=ref(false);
    let genero=ref("all");
    const actual=reactive({nom:"",preu:"",imatge:"",genero:"", })
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

            llista, visibleProd,visiblePort,visibleActual,mostrar,actual,genero 
            
            }


    }

    }).mount('#appVue')
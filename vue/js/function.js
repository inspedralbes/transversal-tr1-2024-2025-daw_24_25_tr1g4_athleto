    import { createApp, ref, onBeforeMount, reactive} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
    import { getProductes } from './communicationManager.js';





    createApp({

    setup() {

    let llista=reactive({zapatillas:[]});

    onBeforeMount ( async () => {
        const data = await getProductes();
        llista.zapatillas=data;
       
    });
     
    const visibleProd=ref(false);
    const visiblePort=ref(true);
    const visibleActual=ref(false);
    const visibleCar=ref(false);
   
    let genero=ref("all");
    const actual=reactive({nom:"",preu:"",imatge:"",genero:"", })

    function mostrarProducte(data){
        actual.nom=llista.zapatillas[data].nom;
        actual.preu=llista.zapatillas[data].preu;
        actual.imatge=llista.zapatillas[data].imatge;
        actual.descripcio=llista.zapatillas[data].descripcio;
        actual.genero=llista.zapatillas[data].genero;
        console.log(actual.genero)
        visibleActual.value=true;
        visibleProd.value=false;
    }

    function mostrarProductes(){
        visibleProd.value=true;
        visibleActual.value=false;
    }

    function alternarCestella(){
        cestaVisible.value=!cestaVisible.value;
        console.log('Cesta alternada:', cestaVisible.value);
    }

    return {

        llista, visibleProd, visiblePort, visibleActual,visibleCar  , mostrarProducte, mostrarProductes, alternarCestella, actual, genero 
            
            }


    }

    }).mount('#appVue')
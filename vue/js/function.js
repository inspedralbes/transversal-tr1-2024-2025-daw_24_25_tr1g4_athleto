    import { createApp, ref, onBeforeMount, reactive, toRaw } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
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
    const carList=ref([]);
    const preuCar=ref(0);
    let genero=ref("all");
    const actual=reactive({nom:"",preu:"",imatge:"",genero:"", })
    //const cestella = ref(null);

    function mostrarProducte(data){
        actual.nom=llista.zapatillas[data].nom;
        actual.preu=llista.zapatillas[data].preu;
        actual.imatge=llista.zapatillas[data].imatge;
        actual.descripcio=llista.zapatillas[data].descripcio;
        actual.genero=llista.zapatillas[data].genero;
        console.log(actual.nom);
        visibleActual.value=true;
        visibleProd.value=false;
    }

    function mostrarProductes(){
        visibleProd.value=true;
        visibleActual.value=false;
    }

    function alternarCestella(){
        visibleCar.value=!visibleCar.value;
        console.log('Cesta alternada:', visibleCar.value);
        //console.log(cestella.value);
        //if(cestella.className===cestella.id) cestella.className="cart-obert";
        //else cestella.className=cestella.id;
    }

    function afegirProducte(){
        carList.value.push({...toRaw(actual)});
        preuCarrito();
        alternarCestella();
    }

    function preuCarrito(){
        preuCar.value=0;

        carList.value.forEach(producte => {
            console.log(producte);
            preuCar.value+=parseFloat(producte.preu);
            console.log(preuCar.value);
        });
    }

    return {

        llista, visibleProd, visiblePort, visibleActual, visibleCar, preuCar, actual, genero, carList, mostrarProducte, mostrarProductes, alternarCestella, preuCarrito, afegirProducte 
            
            }


    }

    }).mount('#appVue')
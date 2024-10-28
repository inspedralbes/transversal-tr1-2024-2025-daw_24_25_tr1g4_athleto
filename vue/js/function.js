import { createApp, ref, onBeforeMount, reactive, toRaw } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { getProductes } from './communicationManager.js';




// Creación de la instancia de la aplicación Vue
createApp({

  setup() {

    // `llista`contiene una lista de productos 
    let llista = reactive({ zapatillas: [] });

    // Se ejecuta antes del mount(montar)
    onBeforeMount(async () => {
      // Obtenemos los productos 
      const data = await getProductes();
      // Guardar los productos obtenidos
      llista.zapatillas = data;
      // Mostrar datos obtenidos en la consola
      });

      // Propiedades reactivas que controlan la visibilidad de diferentes secciones
      const visibleProd = ref(false); // Controla la visibilidad de la lista de productos
      const visiblePort = ref(true); // Controla la visibilidad de la portada
      const visibleActual = ref(false); // Controla la visibilidad del detalle de un producto
      const visibleCar = ref(false); // Controla la visibilidad del carrito de compras
      const visibleCheck = ref(false);
      const visiblePagament = ref(false);
      const carList = ref([]); // Contiene los productos dentro del carrito
      const preuCompra = ref(0); // Preu de la compra
      let genero = ref("all"); // Variable para el filtro de género, muestra todos los generos
      const actual = reactive({ nom: "", preu: "", imatge: "", genero: "", mida: "", }); // `actual` almacena la información del producto seleccionado

      // Función que se ejecuta cuando se selecciona un producto de la lista
      function mostrarProducte(data) {
        // Actualiza el objeto `actual` con los detalles del producto seleccionado
        actual.nom = llista.zapatillas[data].nom;
        actual.preu = llista.zapatillas[data].preu;
        actual.imatge = llista.zapatillas[data].imatge;
        actual.descripcio = llista.zapatillas[data].descripcio;
        actual.genero = llista.zapatillas[data].genero;
        // Muestra el producto seleccionado y oculta la lista de productos
        visibleActual.value = true;
        visibleProd.value = false;
      }

      // Función que vuelve a mostrar la lista de productos y oculta el producto actual
      function mostrarProductes() {
        visibleProd.value = true;
        visibleActual.value = false;
      }

      // Función que alterna la visibilidad del carrito de compras
      function alternarCestella() {
        visibleCar.value = !visibleCar.value;
      }

      function trobarProducte(){
        return carList.value.find(prod => prod.nom==actual.nom);//meterle && y comparar size(talla bamba)

        //cuando añada las tallas quizas deberia cambiar esta parte y tambien comparar la talla
        //hacer un with en el controllador para pillar tmb la talla y que seleccione que talla tiene con input, 
        /*let valor = undefined;
        carList.value.forEach(productsd=>{
          console.log(productsd);
          console.log(actual);
          if (productsd==actual) {
            valor=productsd; 
          }
        });
        return valor;*/
      }

      //Serveix per afegir el producte actual al carrito, actualitzar el preu i tancar el carrito
      function afegirProducte() {
        let producte = trobarProducte();
        if (producte) producte.quantitat++;
        else carList.value.push({ ...toRaw(actual), quantitat: 1 });
        preuCarrito();
        alternarCestella();
        visibleProd.value=true;
        visibleActual.value=false;
      }

      function modificarQuantitat(index){
        if (carList.value[index].quantitat==0) carList.value.splice(index, 1);
        //añadir else para si la cantidad es mayor al stock
        
        preuCarrito();
      }

      function eliminarProducte(index){
        carList.value.splice(index, 1);
        preuCarrito();
      }

      //Serveix per actualitzar el preu del carrito segons els productes dins de carList
      function preuCarrito() {
        preuCompra.value = 0;

        carList.value.forEach(producte => {
          console.log(producte.quantitat);
          preuCompra.value += parseFloat(producte.preu)*producte.quantitat;
          console.log(preuCompra.value);
        });
      }

      function procesCheckout(){
        visibleCheck.value=true;
        visibleCar.value=false;
        visibleProd.value=false;
      }

      function pagament(){
        visibleCheck.value=false;
        visiblePagament.value=true;
      }

      function compraFeta(){
        alert("Compra feta!!!");
        visiblePagament.value=false;
        visiblePort.value=true;
      }

      // funcionalidad vue buscador

      const searchVisible = ref(false);  // Controla si el campo de búsqueda está visible o no
    const searchQuery = ref('');       // Almacena la consulta de búsqueda
    const searchResults = ref([]);     // Almacena los resultados de búsqueda

    // Alterna la visibilidad del campo de búsqueda
    function toggleSearch() {
      searchVisible.value = !searchVisible.value;
    }

    // Ejecuta la búsqueda al presionar Enter
    async function performSearch() {
      if (searchQuery.value.trim()) {
        try {
          // Realiza la petición al backend para buscar productos
          const response = await axios.get(`/search`, {
            params: { query: searchQuery.value },
          });
          searchResults.value = response.data; // Guarda los resultados
        } catch (error) {
          console.error("Error al buscar productos:", error);
        }
      }
    }

    // Retornar las variables y métodos necesarios para el buscador
    return {
      searchVisible,
      searchQuery,
      searchResults,
      toggleSearch,
      performSearch
    };
      
      // Retornamos las variables y funciones 
      return {
        llista,
        visibleProd,
        visiblePort,
        visibleActual,
        visibleCar,
        visibleCheck,
        preuCompra,
        actual,
        genero,
        carList,
        visiblePagament,
        mostrarProducte,
        mostrarProductes,
        alternarCestella,
        modificarQuantitat,
        afegirProducte,
        eliminarProducte,
        procesCheckout,
        pagament,
        compraFeta
      }



      

    }
    
    
    

    }).mount('#appVue'); // Monta la aplicación en el elemento con id 'appVue'
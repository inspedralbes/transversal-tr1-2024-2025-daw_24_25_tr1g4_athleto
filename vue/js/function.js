import { createApp, ref, onBeforeMount, reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
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
      console.log(llista.zapatillas);
    });
     
    // Propiedades reactivas que controlan la visibilidad de diferentes secciones
    const visibleProd = ref(false);  // Controla la visibilidad de la lista de productos
    const visiblePort = ref(true);   // Controla la visibilidad de la portada
    const visibleActual = ref(false); // Controla la visibilidad del detalle de un producto
    const cestaVisible = ref(false);  // Controla la visibilidad del carrito de compras

    // Variable para el filtro de género
    let genero = ref("all");  // Inicialmente muestra todos los géneros

    // `actual` almacena la información del producto seleccionado
    const actual = reactive({
      nom: "", 
      preu: "", 
      imatge: "", 
      genero: "", 
    });

    // Función que se ejecuta cuando se selecciona un producto de la lista
    function mostrarProducte(data) {
      // Actualiza el objeto `actual` con los detalles del producto seleccionado
      actual.nom = llista.zapatillas[data].nom;
      actual.preu = llista.zapatillas[data].preu;
      actual.imatge = llista.zapatillas[data].imatge;
      actual.descripcio = llista.zapatillas[data].descripcio;

      // Muestra el producto seleccionado y oculta la lista de productos
      visibleActual.value = true;
      visibleProd.value = false;
      console.log(actual); // Imprime el producto actual en la consola
    }

    // Función que vuelve a mostrar la lista de productos y oculta el producto actual
    function mostrarProductes() {
      visibleProd.value = true;
      visibleActual.value = false;
    }

    // Función que alterna la visibilidad del carrito de compras
    function alternarCestella() {
      cestaVisible.value = !cestaVisible.value; // Alterna el valor booleano de `cestaVisible`
      console.log('Cesta alternada:', cestaVisible.value); // Imprime en consola el estado del carrito
    }

    // Retornamos las variables y funciones 
    return {
      llista,           
      visibleProd,      
      visiblePort,      
      visibleActual,    
      cestaVisible,     
      mostrarProducte,  
      mostrarProductes, 
      alternarCestella, 
      actual,           
      genero            
    };
  }

}).mount('#appVue'); // Monta la aplicación en el elemento con id 'appVue'

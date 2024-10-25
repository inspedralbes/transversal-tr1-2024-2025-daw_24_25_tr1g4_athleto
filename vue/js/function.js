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
      console.log(llista.zapatillas);
      });

      // Propiedades reactivas que controlan la visibilidad de diferentes secciones
      const visibleProd = ref(false); // Controla la visibilidad de la lista de productos
      const visiblePort = ref(true); // Controla la visibilidad de la portada
      const visibleActual = ref(false); // Controla la visibilidad del detalle de un producto
      const visibleCar = ref(false); // Controla la visibilidad del carrito de compras
      const carList = ref([]); // Contiene los productos dentro del carrito
      const preuCar = ref(0); // Precio del carrito
      let genero = ref("all"); // Variable para el filtro de género, muestra todos los generos
      const actual = reactive({ nom: "", preu: "", imatge: "", genero: "", }); // `actual` almacena la información del producto seleccionado

      // Función que se ejecuta cuando se selecciona un producto de la lista
      function mostrarProducte(data) {
        // Actualiza el objeto `actual` con los detalles del producto seleccionado
        actual.nom = llista.zapatillas[data].nom;
        actual.preu = llista.zapatillas[data].preu;
        actual.imatge = llista.zapatillas[data].imatge;
        actual.descripcio = llista.zapatillas[data].descripcio;
        actual.genero = llista.zapatillas[data].genero;
        console.log(actual.nom);
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
        console.log('Cesta alternada:', visibleCar.value);
        //console.log(cestella.value);
        //if(cestella.className===cestella.id) cestella.className="cart-obert";
        //else cestella.className=cestella.id;
      }

      //Serveix per afegir el producte actual al carrito, actualitzar el preu i tancar el carrito
      function afegirProducte() {
        carList.value.push({ ...toRaw(actual) });
        preuCarrito();
        alternarCestella();
      }

      //Serveix per actualitzar el preu del carrito segons els productes dins de carList
      function preuCarrito() {
        preuCar.value = 0;

        carList.value.forEach(producte => {
          console.log(producte);
          preuCar.value += parseFloat(producte.preu);
          console.log(preuCar.value);
        });
      }

      // Retornamos las variables y funciones 
      return {
        llista,
        visibleProd,
        visiblePort,
        visibleActual,
        visibleCar,
        preuCar,
        actual,
        genero,
        carList,
        mostrarProducte,
        mostrarProductes,
        alternarCestella,
        preuCarrito,
        afegirProducte
      }


    }

    }).mount('#appVue'); // Monta la aplicación en el elemento con id 'appVue'
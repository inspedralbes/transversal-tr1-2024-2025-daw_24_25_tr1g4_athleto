import { createApp, ref, onBeforeMount, reactive, toRaw } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { getProductes, postMail, login, obtenirDadesUser } from './communicationManager.js';

// Creación de la instancia de la aplicación Vue
createApp({

  setup() {
    // `llista`contiene una lista de productos 
    let llista = reactive({ zapatillas: [] });
    const dadesUser = ref();
    const mailExisteix = ref();
    // Se ejecuta antes del mount(montar)
    onBeforeMount(async () => {
      //obtenim les dades si hi ha l'access token a les cookies
      if (getCookie('access_token')) {
        dadesUser.value=await obtenirDadesUser(getCookie('access_token'));
        mailExisteix.value=3;
      }
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
    const visibleOpcUsuari = ref(false);
    const visibleProSes = ref(false);
    const mailEscrit = ref(false);
    const showPass = ref(false);
    const userMail = ref("");
    const userPass = ref("");
    const carList = ref([]); // Contiene los productos dentro del carrito
    const preuCar = ref(0); // Preu del carrito
    const compraList = ref([]); // Conte els productes que es compraran al checkout
    const preuCompra = ref(0); // Preu de la compra
    let genero = ref("all"); // Variable para el filtro de género, muestra todos los generos
    let actual = ref();
    //const actual = reactive({ nom: "", preu: "", imatge: "", genero: "", mida: "", }); // `actual` almacena la información del producto seleccionado

    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    function titulo(){
      return dadesUser.value?dadesUser.value.nom:"Iniciar sessió";
    }

    function mostrarAccionsUsuari() {
      visibleOpcUsuari.value = true;
    }

    function ocultarAccionsUsuari() {
      visibleOpcUsuari.value = false;
    }

    function mostrarDadesUsuari(){
      visibleOpcUsuari.value = false;
      visibleProSes.value=true;
    }

    async function verificarMailExisteix() {
      mailEscrit.value = true;

      const resp = await postMail(userMail.value);
      mailExisteix.value = resp.user ? 1 : 2;
    }

    async function loginUsuari() {
      try{
        const accessToken= await login(userMail.value, userPass.value);
        document.cookie = `access_token=${accessToken}; path=/; max-age=900; SameSite=Strict; Secure`;
        await infoUser();
      }catch(error){
        console.log("error iniciant sessió"); 
        dadesUser.value="error";
      }

      /*document.cookie = `usuari_id=${dadesUser.value.usuari.id}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_nom=${dadesUser.value.usuari.nom}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_cognom=${dadesUser.value.usuari.cognom}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_userName=${dadesUser.value.usuari.nom_usuari}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_email=${dadesUser.value.usuari.email}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_rol=${dadesUser.value.usuari.rol}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_actiu=${dadesUser.value.usuari.actiu}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_adreca=${dadesUser.value.usuari.adreca}; path=/; max-age=3600; SameSite=Strict; Secure`;*/
      if (dadesUser.value!="error") mailExisteix.value = 3;
    }

    function cancelarFuncioUsuari(){
      mailExisteix.value=null;
      userPass.value ="";
    }

    function mostrarLandingPage(){
      visiblePort.value=true;
      visibleProd.value=false;
      visibleActual.value=false;
      visibleCar.value=false;
      visibleCheck.value=false;
      visiblePagament.value=false;
      visibleOpcUsuari.value=false;
      visibleProSes.value=false;
    }

    async function infoUser() {
      dadesUser.value=await obtenirDadesUser(getCookie('access_token'));
      console.log(dadesUser.value);
    }

    // Función que se ejecuta cuando se selecciona un producto de la lista
    function mostrarProducte(data) {
      actual.value = llista.zapatillas[data];

      /*actual.nom = llista.zapatillas[data].nom;
      actual.preu = llista.zapatillas[data].preu;
      actual.imatge = llista.zapatillas[data].imatge;
      actual.descripcio = llista.zapatillas[data].descripcio;
      actual.genero = llista.zapatillas[data].genero;*/

      // Muestra el producto seleccionado y oculta la lista de productos
      visibleActual.value = true;
      visibleProd.value = false;
    }

    // Función que vuelve a mostrar la lista de productos y oculta el producto actual
    function mostrarProductes() {
      visibleActual.value = false;
      visibleCheck.value = false;
      visibleProd.value = true;
    }

    // Función que alterna la visibilidad del carrito de compras
    function alternarCestella() {
      visibleCar.value = !visibleCar.value;
    }

    function trobarProducte() {
      return carList.value.find(prod => prod.nom == actual.value.nom);//meterle && y comparar size(talla bamba)

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
      else carList.value.push({ ...toRaw(actual.value), quantitat: 1 });
      preuCarrito();
      alternarCestella();
      visibleProd.value = true;
      visibleActual.value = false;
    }

    function revisarQuantitat(index) {
      if (carList.value[index].quantitat == 0) eliminarProducte(index);
      //añadir else para si la cantidad es mayor al stock

      preuCarrito();
    }

    function revisarQuantitatCompra(index) {
      if (compraList.value[index].quantitat == 0) eliminarProducteCompra(index);
      //añadir else para si la cantidad es mayor al stock

      actualitzarPreuCompra();
    }

    function eliminarProducte(index) {
      carList.value.splice(index, 1);
      preuCarrito();
    }

    function eliminarProducteCompra(index) {
      compraList.value.splice(index, 1);
      actualitzarPreuCompra();
    }

    //Serveix per actualitzar el preu del carrito segons els productes dins de carList
    function preuCarrito() {
      preuCar.value = 0;

      carList.value.forEach(producte => {
        preuCar.value += parseFloat(producte.preu) * producte.quantitat;
      });
    }

    function actualitzarPreuCompra(){
      preuCompra.value = 0;

      compraList.value.forEach(producte => {
        console.log(producte.quantitat);
        preuCompra.value += parseFloat(producte.preu) * producte.quantitat;
        console.log(preuCompra.value);
      });
    }



    function procesCheckout() {
      compraList.value = carList.value.map(product => ({ ...product }));
      preuCompra.value = preuCar.value;
      obrirCheckout();
    }

    function pagament() {
      visibleCheck.value = false;
      visiblePagament.value = true;
    }

    function compraFeta() {
      actualitzarCarritoCompra();
      alert("Compra feta, s'ha actualitzat el carrito!!!");
      visiblePagament.value = false;
      visiblePort.value = true;
    }

    function actualitzarCarritoCompra(){
      compraList.value.forEach(producte => {
        carList.value.splice(carList.value.findIndex(prod => prod.id==producte.id), 1);
      });
    }


    function obrirCheckout() {
      visibleCheck.value = true;
      visiblePort.value = false;
      visibleActual.value = false;
      visibleCar.value = false;
      visibleProd.value = false;
    }

    function compraRapida() {
      compraList.value = [{ ...toRaw(actual.value), quantitat: 1 }];
      //compraList.value.push({ ...toRaw(actual.value), quantitat: 1 });
      preuCompra.value = actual.value.preu;
      obrirCheckout();
    }

    function mostrarProcesSessio() {
      visibleOpcUsuari.value = false;
      visibleProSes.value = true;
    }

    // Retornamos las variables y funciones 
    return {
      userMail,
      userPass,
      dadesUser,
      mailEscrit,
      mailExisteix,
      llista,
      visibleProd,
      visiblePort,
      visibleActual,
      visibleCar,
      visibleCheck,
      visibleOpcUsuari,
      visibleProSes,
      showPass,
      preuCar,
      preuCompra,
      actual,
      genero,
      carList,
      compraList,
      visiblePagament,
      mostrarLandingPage,
      cancelarFuncioUsuari,
      verificarMailExisteix,
      titulo,
      loginUsuari,
      mostrarDadesUsuari,
      mostrarProducte,
      mostrarProductes,
      alternarCestella,
      revisarQuantitat,
      revisarQuantitatCompra,
      afegirProducte,
      eliminarProducte,
      eliminarProducteCompra,
      procesCheckout,
      pagament,
      compraFeta,
      compraRapida,
      mostrarAccionsUsuari,
      ocultarAccionsUsuari,
      mostrarProcesSessio,
      infoUser
    }


  }

}).mount('#appVue'); // Monta la aplicación en el elemento con id 'appVue'
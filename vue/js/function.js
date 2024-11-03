import { createApp, ref, onBeforeMount, reactive, toRaw } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { getProductes, postMail, register, login, obtenirDadesUser, postNomUsuari ,getProductesFiltre, getProductesFiltre2 } from './communicationManager.js';

// Creación de la instancia de la aplicación Vue
createApp({

  setup() {
    // `llista`contiene una lista de productos 
    const llista = reactive({ zapatillas: [] });
    const dadesUser = ref();
    const mailExisteix = ref();
    // Se ejecuta antes del mount(montar)
    onBeforeMount(async () => {
      //obtenim les dades si hi ha l'access token a les cookies
      if (getCookie('access_token')) {
        dadesUser.value=await obtenirDadesUser(getCookie('access_token'));
        console.log(dadesUser.value);
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
    const user = reactive({nom: "", cognom: "", nomUsuari: "", mail: "", pass: ""});
    const carrito = reactive({list: [], preu: 0});
    const compra = reactive({list: [], preu: 0});
    const showPass = ref(false);
    const nomExisteix = ref(false);
    let genero = ref("all"); // Variable para el filtro de género, muestra todos los generos
    let actual = ref();
    //const actual = reactive({ nom: "", preu: "", imatge: "", genero: "", mida: "", }); // `actual` almacena la información del producto seleccionado

   async function filtrar(param){
       // Obtenemos los productos 
       const data = await getProductesFiltre(param);
       // Guardar los productos obtenidos
       llista.zapatillas = data;
      

    }
    
    async  function filtrar2(id1,id2){
     // Obtenemos los productos 
   const data = await getProductesFiltre2(id1,id2);
    // Guardar los productos obtenidos
    llista.zapatillas = data;
 
    }


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
      const resp = await postMail(user.mail);
      mailExisteix.value = resp.user ? 1 : 2;
    }

    async function registrarUsuari() {
      try {
        console.log(user);
        const resp = await register(user);
        console.log("creo");
        if (resp.registrat) {
          console.log("creat");
          await loginUsuari(user.mail, user.pass);
        }
      } catch (error) {
        console.log("error registrant usuari");
      }
    }

    async function loginUsuari() {
      try{
        const accessToken= await login(user.mail, user.pass);
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
      user.pass ="";
      dadesUser.value=undefined;
    }

    async function verificarNomUnic(){
      if (user.nomUsuari!='') {
        const resp = await postNomUsuari(user.nomUsuari);
        nomExisteix.value = resp;
      }
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
      return carrito.list.find(prod => prod.nom == actual.value.nom);//meterle && y comparar size(talla bamba)

      //cuando añada las tallas quizas deberia cambiar esta parte y tambien comparar la talla
      //hacer un with en el controllador para pillar tmb la talla y que seleccione que talla tiene con input, 
      /*let valor = undefined;
      carrito.list.forEach(productsd=>{
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
      else carrito.list.push({ ...toRaw(actual.value), quantitat: 1 });
      actualitzarPreuCarrito();
      alternarCestella();
      visibleProd.value = true;
      visibleActual.value = false;
    }

    function revisarQuantitat(index) {
      if (carrito.list[index].quantitat == 0) eliminarProducte(index);
      //añadir else para si la cantidad es mayor al stock

      actualitzarPreuCarrito();
    }

    function revisarQuantitatCompra(index) {
      if (compra.list[index].quantitat == 0) eliminarProducteCompra(index);
      //añadir else para si la cantidad es mayor al stock

      actualitzarPreuCompra();
    }

    function eliminarProducte(index) {
      carrito.list.splice(index, 1);
      actualitzarPreuCarrito();
    }

    function eliminarProducteCompra(index) {
      compra.list.splice(index, 1);
      actualitzarPreuCompra();
    }

    //Serveix per actualitzar el preu del carrito segons els productes dins de carList
    function actualitzarPreuCarrito() {
      carrito.preu = 0;

      carrito.list.forEach(producte => {
        carrito.preu += parseFloat(producte.preu) * producte.quantitat;
      });
    }

    function actualitzarPreuCompra(){
      compra.preu = 0;

      compra.list.forEach(producte => {
        compra.preu += parseFloat(producte.preu) * producte.quantitat;
      });
    }

    function procesCheckout() {
      compra.list = carrito.list.map(product => ({ ...product }));
      compra.preu = carrito.preu;
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
      compra.list.forEach(producte => {
        carrito.list.splice(carrito.list.findIndex(prod => prod.id==producte.id), 1);
      });
      actualitzarPreuCarrito();
    }


    function obrirCheckout() {
      visibleCheck.value = true;
      visiblePort.value = false;
      visibleActual.value = false;
      visibleCar.value = false;
      visibleProd.value = false;
    }

    function compraRapida() {
      compra.list = [{ ...toRaw(actual.value), quantitat: 1 }];
      //compra.list.push({ ...toRaw(actual.value), quantitat: 1 });
      compra.preu = actual.value.preu;
      obrirCheckout();
    }

    function mostrarProcesSessio() {
      visibleOpcUsuari.value = false;
      visibleProSes.value = true;
    }

    // Retornamos las variables y funciones 
    return {
      visibleProd,
      visiblePort,
      visibleActual,
      visibleCar,
      visibleCheck,
      visibleOpcUsuari,
      visibleProSes,
      visiblePagament,
      user,
      carrito,
      compra,
      dadesUser,
      mailExisteix,
      nomExisteix,
      llista,
      showPass,
      actual,
      genero,
      mostrarLandingPage,
      cancelarFuncioUsuari,
      verificarMailExisteix,
      titulo,
      loginUsuari,
      registrarUsuari,
      verificarNomUnic,
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
      infoUser,
      filtrar,
      filtrar2,
    }


  }

}).mount('#appVue'); // Monta la aplicación en el elemento con id 'appVue'
import { createApp, ref, onBeforeMount, reactive, toRaw } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { getProductes, enviarCorreo,getmevesComandes, enviarCompra, postMail, register, login, obtenirDadesUser, postNomUsuari, getProductesFiltre, getProductesFiltre2, verificarPassUsuari, actualitzarDadesUsuari, actualitzarPassword } from './communicationManager.js';
// Creación de la instancia de la aplicación Vue
createApp({

  setup() {
    // `llista`contiene una lista de productos 
    const llista = reactive({ zapatillas: [], totalPaginas:"", paginaZapatillas: [] });
    const dadesUser = ref();
    const mailExisteix = ref();
    // Se ejecuta antes del mount(montar)
    onBeforeMount(async () => {
      //obtenim les dades si hi ha l'access token a les cookies
      try {
        if (getCookie('access_token')) {
          dadesUser.value = await obtenirDadesUser(getCookie('access_token'));
          console.log(dadesUser.value);
          mailExisteix.value = 3;
        }
      } catch (error) {
        logout();
      }
      // Obtenemos los productos 
      const data = await getProductes();
      // Guardar los productos obtenidos
      llista.zapatillas = data;

       // paginas totales  
     
      llista.paginaActual=1;
      generarPagina();
      alternarPagina(llista.paginaActual);

    });

    function generarPagina(){
      llista.totalPaginas= Math.ceil(llista.zapatillas.length/6);
    }

    //quizas seria mejor meter todas las variables de vision en una reactiva

    // Propiedades reactivas que controlan la visibilidad de diferentes secciones
    const visibleProd = ref(false); // Controla la visibilidad de la lista de productos
    const visiblePort = ref(true); // Controla la visibilidad de la portada
    const visibleActual = ref(false); // Controla la visibilidad del detalle de un producto
    const visibleCar = ref(false); // Controla la visibilidad del carrito de compras
    const visibleCheck = ref(false);
    const visiblePagament = ref(false);
    const visibleMevesComandes = ref(false);
    const visibleOpcUsuari = ref(false);
    const visibleProSes = ref(false);
    const mostrarDades = ref(false);
    const mostrarActCont = ref(false);
    const mComandes=reactive( {compras:[]}); 
    
    const menuAdmin = ref(false);
    let comprar=reactive({ id_user:"", preu:"", productes:[] = ""})
    const user = reactive({nom: "", cognom: "", nomUsuari: "", mail: "", pass: ""});
    const carrito = reactive({list: [], productesComprar: [], preu: 0});
    const compra = reactive({list: [], preu: 0});
    const showPass = ref(false);
    const nomExisteix = ref(false);
    let genero = ref("all"); // Variable para el filtro de género, muestra todos los generos
    let actual = ref();
    //const actual = reactive({ nom: "", preu: "", imatge: "", genero: "", mida: "", }); // `actual` almacena la información del producto seleccionado

   



    function alternarMenuAdmin(){
      menuAdmin.value=!menuAdmin.value;
    }

    function alternarPagina(num){
      llista.paginaZapatillas=[];
      const n=6;
      let bucle=n;
      let aux=num*bucle;
      
      if(num==Math.ceil(llista.zapatillas.length/n)){
        bucle=llista.zapatillas.length-(aux-n);  
        aux=llista.zapatillas.length
      }
     
      for (let index = 0; index < bucle; index++) {
        
        llista.paginaZapatillas.push(llista.zapatillas[aux-1]);
        aux--;
      }
    }

    function mostrarSeccioProductes() {
      ocultarTot();
      visibleProd.value = true;
    }

    async function obtenirProductes() {
      const data = await getProductes();
       // Guardar los productos obtenidos
       llista.paginaZapatillas = data;
       llista.zapatillas= data;    
       generarPagina();
       alternarPagina(1);
      mostrarSeccioProductes();
    }

     async function filtrar(param){
       // Obtenemos los productos 
       const data = await getProductesFiltre(param);
       // Guardar los productos obtenidos
       llista.paginaZapatillas = data;
       llista.zapatillas= data;    
     generarPagina();
     alternarPagina(1);
     mostrarSeccioProductes();
    }
    
    async function filtrar2(id1,id2){
     // Obtenemos los productos 
   const data = await getProductesFiltre2(id1,id2);
    // Guardar los productos obtenidos
    llista.paginaZapatillas = data;
    llista.zapatillas=data;
    generarPagina();
    alternarPagina(1);
    mostrarSeccioProductes();
    }


    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
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

    function titulo() {
      return dadesUser.value ? dadesUser.value.nom_usuari : "Iniciar sessió";
    }

    function mostrarAccionsUsuari() {
      visibleOpcUsuari.value = true;
    }

    function ocultarAccionsUsuari() {
      visibleOpcUsuari.value = false;
    }

    async function mostrarDadesUsuari() {
      Swal.fire({
        title: "Introdueix la teva contrasenya",
        input: "password",
        showCancelButton: true,
        confirmButtonText: "Verificar",
        showLoaderOnConfirm: true,
        preConfirm: (password) => {
          return verificarContrasenyaCorrecta(password);
        }
      });
      visibleOpcUsuari.value = false;
    }
    
    async function verificarContrasenyaCorrecta(password){
      try {
        const resp = await verificarPassUsuari(password, getCookie('access_token'));
        if (resp) {
          visibleProSes.value = true;
          mostrarActCont.value=false;
          mostrarDades.value=false;
        }else Swal.showValidationMessage(`Contrasenya incorrecta`);
      } catch (error) {
        alert("Error verificant");
        logout();
      }
    }

    async function verificarMailExisteix() {
      const resp = await postMail(user.mail);
      mailExisteix.value = resp.user ? 1 : 2;
    }

    async function registrarUsuari() {
      try {
        const resp = await register(user);
        if (resp.registrat) {
          await loginUsuari(user.mail, user.pass);
        }
      } catch (error) {
        console.log("error registrant usuari");
      }
    }

    async function loginUsuari() {
      try {
        const accessToken = await login(user.mail, user.pass);
        document.cookie = `access_token=${accessToken}; path=/; max-age=900; SameSite=Strict; Secure`;
        await infoUser();
      } catch (error) {
        console.log("error iniciant sessió");
        dadesUser.value = "error";
      }

      /*document.cookie = `usuari_id=${dadesUser.value.usuari.id}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_nom=${dadesUser.value.usuari.nom}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_cognom=${dadesUser.value.usuari.cognom}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_userName=${dadesUser.value.usuari.nom_usuari}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_email=${dadesUser.value.usuari.email}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_rol=${dadesUser.value.usuari.rol}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_actiu=${dadesUser.value.usuari.actiu}; path=/; max-age=3600; SameSite=Strict; Secure`;
      document.cookie = `usuari_adreca=${dadesUser.value.usuari.adreca}; path=/; max-age=3600; SameSite=Strict; Secure`;*/
      if (dadesUser.value != "error") mailExisteix.value = 3;
      user.pass = "";
    }

    function logout() {
      document.cookie = `access_token=; max-age=0; path=/;`;
      esborrarDades();
      user.mail = "";
      carrito.list = [];
      carrito.preu = 0;
      compra.list = [];
      compra.preu = 0;
      mostrarLandingPage();
    }

    function esborrarDades() {
      mailExisteix.value = null;
      user.nom = "";
      user.cognom = "";
      user.nomUsuari = "";
      user.pass = "";
      user.newPass = "";
      dadesUser.value = undefined;
    }

    async function verificarNomUnic() {
      if (user.nomUsuari != '') {
        const resp = await postNomUsuari(user.nomUsuari, user.mail);
        nomExisteix.value = resp;
      }
    }

    function ocultarTot() {
      visiblePort.value = false;
      visibleProd.value = false;
      visibleActual.value = false;
      visibleCar.value = false;
      visibleCheck.value = false;
      visiblePagament.value = false;
      visibleOpcUsuari.value = false;
      visibleProSes.value = false;
      mostrarDades.value = false;
      visibleMevesComandes.value=false;
    }

    function mostrarLandingPage() {
      ocultarTot();
      visiblePort.value = true;
    }

    async function infoUser() {
      try {
        dadesUser.value = await obtenirDadesUser(getCookie('access_token'));
        console.log(dadesUser.value);
      } catch (error) {
        logout();
        throw error;
      }
    }


    // Función que se ejecuta cuando se selecciona un producto de la lista
    function mostrarProducte(data) {
      actual.value = llista.paginaZapatillas[data];

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
   

   async function mevesComandes(){
      if(dadesUser.value==undefined){
        alert("Registrate primero")

      }else{
     
      ocultarTot();
      mComandes.compras = await getmevesComandes(dadesUser.value.id);
      console.log(mComandes.compras) 
      visibleMevesComandes.value=true;
      }
    }

    function mostrarDetalles(index){

      mComandes.compras[index].mostrar= ! mComandes.compras[index].mostrar;
    }
    
    
    function afegirProducte() {
      
      if(dadesUser.value==undefined){
        alert("Registrate primero")

      }else{


      let producte = trobarProducte();
      if (producte) producte.quantitat++;
      else carrito.list.push({ ...toRaw(actual.value), quantitat: 1 });
      actualitzarPreuCarrito();
      alternarCestella();
      visibleProd.value = true;
      visibleActual.value = false;
  
    }
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
      let car;

      if (carrito.productesComprar.length > 0) car = carrito.productesComprar;
      else car = carrito.list;

      car.forEach(producte => {
        carrito.preu += parseFloat(producte.preu) * producte.quantitat;
      });
    }

    function actualitzarPreuCompra() {
      compra.preu = 0;

      compra.list.forEach(producte => {
        compra.preu += parseFloat(producte.preu) * producte.quantitat;
      });
    }

    function procesCheckout() {
      if (carrito.productesComprar.length > 0) compra.list = carrito.productesComprar.map(product => ({ ...product }));
      else compra.list = carrito.list.map(product => ({ ...product }));
      compra.preu = carrito.preu;
      comprar=reactive(
        {
          id_user:dadesUser.value.id,
          preu:carrito.preu,
          productes:[] = carrito.list
         

        }
      )
      obrirCheckout();
    }

    function pagament() {
      visibleCheck.value = false;
      visiblePagament.value = true;
      
    }

    function reiniciarProductesComprar() {
      carrito.productesComprar = [];
    }




    function compraFeta() {

      enviarCompra(comprar)

      alert("Compra rebuda!!!");
      visiblePagament.value = false;
      visiblePort.value = true;
      reiniciarProductesComprar();
      actualitzarCarritoCompra();
      actualitzarPreuCarrito();
     
     


      


    }

    function actualitzarCarritoCompra() {
      compra.list.forEach(producte => {
        carrito.list.splice(carrito.list.findIndex(prod => prod.id == producte.id), 1);
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

      if(dadesUser.value==undefined){
        alert("Registrate primero")

      }else{


      compra.list = [{ ...toRaw(actual.value), quantitat: 1 }];
      //compra.list.push({ ...toRaw(actual.value), quantitat: 1 });
      compra.preu = actual.value.preu;   
      
      comprar=reactive(
        {
          id_user:dadesUser.value.id,
          preu:compra.preu,
          productes:[] = compra.list
         

        }
      )
      obrirCheckout();

    }
    }

    function mostrarProcesSessio() {
      ocultarTot();
      visibleOpcUsuari.value = false;
      visibleProSes.value = true;
    }

    function butoMostrarDades() {
      user.nom = dadesUser.value.nom;
      user.cognom = dadesUser.value.cognom;
      user.nomUsuari = dadesUser.value.nom_usuari;
      user.mail = dadesUser.value.email;
      user.adreca = dadesUser.value.adreca || "";
      mostrarDades.value = true;
      mostrarActCont.value = false;
    }

    async function actualitzarDades(){
      if (!user.nom || !user.cognom || !user.nomUsuari || !user.mail || !user.adreca) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      try {
        await actualitzarDadesUsuari(user, getCookie('access_token'), dadesUser.value.id);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        Toast.fire({
          icon: "success",
          title: "Dades actualitzades"
        });
        dadesUser.value = await obtenirDadesUser(getCookie('access_token'));
      } catch (error) {
        logout();
        console.log("error actualitzant les dades");
      }
    }

    function butoActualitzarContrasenya(){
      mostrarActCont.value=true;
      mostrarDades.value = false;
      user.pass="";
      user.newPass="";
    }

    async function actualitzarPass(){
      if (!user.pass || !user.newPass) {
        alert("Els camps no poden estar buits");
        return;
      }
      try {
        const resp = await actualitzarPassword(user.pass, user.newPass, getCookie('access_token'));
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        if (resp.updated) {
          Toast.fire({
            icon: "success",
            title: "Contrasenya actualitzada"
          });
        }else {
          Toast.fire({
            icon: "error",
            title: "Contrasenya incorrecta"
          });
        }
      } catch (error) {
        logout();
        console.log("Error en actualitzar contrasenya");
      }
    }

    async function redirigirCrud(crud){
      try {
        await infoUser();
        window.location.href = `http://localhost:8000/${crud}`;
      } catch (error) {
        alert("torna a iniciar sessió");
      }
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
      visibleMevesComandes,
      menuAdmin,
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
      mostrarDades,
      mComandes,
      mostrarActCont,
      mostrarDetalles,
      alternarMenuAdmin,
      obtenirProductes,
      alternarPagina,
      mostrarLandingPage,
      esborrarDades,
      verificarMailExisteix,
      titulo,
      registrarUsuari,
      loginUsuari,
      logout,
      verificarNomUnic,
      mostrarDadesUsuari,
      mostrarProducte,
      mostrarProductes,
      alternarCestella,
      revisarQuantitat,
      revisarQuantitatCompra,
      afegirProducte,
      eliminarProducte,
      actualitzarPreuCarrito,
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
      butoMostrarDades,
      verificarContrasenyaCorrecta,
      actualitzarDades,
      butoActualitzarContrasenya,
      actualitzarPass,
      ocultarTot,
      mevesComandes,
      redirigirCrud,
    }


  }

}).mount('#appVue'); // Monta la aplicación en el elemento con id 'appVue'
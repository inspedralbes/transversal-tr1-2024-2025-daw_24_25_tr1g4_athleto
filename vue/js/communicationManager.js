const laravel = {URL: "http://localhost:8000/api"}

export async function getProductes() {
    const URL=`${laravel.URL}/productes`;
    const response = await fetch(URL);
    const data = await response.json();
    
    return data;
}


export async function getProductesFiltre(param) {
    const URL=`${laravel.URL}/categoria/${param}`;
    const response = await fetch(URL);
    const data = await response.json();
    
    return data;
}

export async function getProductesFiltre2(id1,id2) {
    const URL=`${laravel.URL}/categorias??ids[]=${id1}&ids[]=${id2}`;
    const response = await fetch(URL);
    const data = await response.json();
    
    return data;
}

export async function postMail(correu) {
    const URL=`${laravel.URL}/buscarMail`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({correu})
    });

    const data = await response.json();

    return data;
}

export async function register(dades) {
    const URL=`${laravel.URL}/register`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({nom: dades.nom, cognom: dades.cognom, nom_usuari: dades.nomUsuari, email: dades.mail, password: dades.pass}),
    });

    if (!response.ok) throw new Error("Register failed");
    const data = await response.json();

    return data;
}

export async function login(email, password){
    const URL=`${laravel.URL}/login`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });

    if (!response.ok) throw new Error("Login failed");
    const data = await response.json();

    return data.access_token;
}

export async function obtenirDadesUser(access_token) {
    const URL = `${laravel.URL}/user`;
    const response = await fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        },
    });

    if (!response.ok) throw new Error("No autenticado");
    const data = await response.json();
    
    return data.usuari;
}

export async function postNomUsuari(username, email) {
    const URL = `${laravel.URL}/username`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, email}),
    });

    if (!response.ok) throw new Error("Error en la comprovacio");

    const data = await response.json();
    return data.existeix;
}

export async function actualitzarDadesUsuari(dades, access_token, idUser) {
    const URL=`${laravel.URL}/actualitzar`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
        },
        body: JSON.stringify({nom: dades.nom, cognom: dades.cognom, nom_usuari: dades.nomUsuari, email: dades.mail, adreca: dades.adreca, id: idUser}),
    });

    if (!response.ok) throw new Error("Update failed");
    const data = await response.json();

    return data;
}
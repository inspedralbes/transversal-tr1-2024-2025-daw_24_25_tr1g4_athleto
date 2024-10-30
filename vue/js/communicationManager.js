
const laravel = {URL: "http://localhost:8000/api"}

export async function getProductes() {
    const URL=`${laravel.URL}/productes`;
    const response = await fetch(URL);
    const data = await response.json();
    
    return data;
}

export async function postMail(correu) {
    console.log(correu);
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

export async function login(email, password){
    ///console.log({email, password});
    const URL=`${laravel.URL}/login`;
    const response = await fetch(URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });

    if (!response.ok) return "error";
    const data = await response.json();

    return data.usuari;
}

export async function obtenirDadesUser() {
    const URL = `${laravel.URL}/user`;
    const response = await fetch(URL, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data.usuari;
    } else {
        throw new Error('No autenticado');
    }
}
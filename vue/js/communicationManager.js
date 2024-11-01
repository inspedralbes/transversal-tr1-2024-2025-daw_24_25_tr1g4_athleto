const laravel = {URL: "http://localhost:8000/api"}

export async function getProductes() {
    const URL=`${laravel.URL}/productes`;
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

export async function login(email, password){
    ///console.log({email, password});
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
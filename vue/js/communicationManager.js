
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

export async function login(correu, contrasenya){
    console.log({correu, contrasenya});
    const URL=`${laravel.URL}/buscarMail`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({correu, contrasenya})
    });
    const data = await response.json();

    return data;
}
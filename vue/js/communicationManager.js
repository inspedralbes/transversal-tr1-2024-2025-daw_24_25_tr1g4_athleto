export async function getProductes() {
    const URL="http://localhost:8000/api/productes";
    const response = await fetch(URL);
    const data = await response.json();
    
    return data;
}

export async function postMail(correu) {
    console.log(correu);
    const URL="http://localhost:8000/api/buscarMail";
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
export async function getProductes() {
    const URL="http://localhost:8000/api/productes";
    const response = await fetch(URL);
    const data = await response.json();
    
    return data;
}
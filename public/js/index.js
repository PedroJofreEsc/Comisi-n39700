console.log("sssad")
const socket = io();
const containerProducts = document.getElementById("body")
socket.on("update", (data) => {
    containerProducts.innerHTML = ""
    console.log(data)
    data.forEach(element => {
        console.log(element.title)
        containerProducts.innerHTML +=
            `
        <li>
            <p><b>${element.title}</b></p>
            <p>Precio: $ ${element.price}</p>
            <p>Descripción: ${element.description}</p>
            <p>Stock: ${element.stock}</p>
            <p>Categoría: ${element.id}</p>
            <p>Code: ${element.id}</p>
        </li>
        `
    });

})
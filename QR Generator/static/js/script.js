
document.getElementById('generate').addEventListener('click', function() {

    // Obtiene el texto ingresado
    const inputText = document.getElementById('inputText').value;

    // Accede al div donde se mostrará el QR y lo limpia si había un código previo
    const qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = ''; 

    // Si el usuario ha ingresado texto
    if (inputText) {

        // Hacer la solicitud al servidor para generar el código QR
        fetch('/generate_qr', {
            method: 'POST', // enviar datos al servidor
            headers: {
                'Content-Type': 'application/json', // los datos enviados son de tipo json
            },
            body: JSON.stringify({ text: inputText }), // convierte el texto a json
        })

        // transforma la respuesta del servidor a json
        .then(response => response.json())

        // usando la data recibida, la transforma a una imagen y muestra por html
        .then(data => {
            const img = document.createElement('img');
            img.src = 'data:image/png;base64,' + data.qr_code;
            qrCodeContainer.appendChild(img);
        })

        // Manejo de errores
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Por favor, ingresa un texto.');
    }
});
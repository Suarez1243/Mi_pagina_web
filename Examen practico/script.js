document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    if (username) {
        showMainContent();
    } else {
        document.getElementById('login-container').style.display = 'flex';
    }

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;

        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('age', age);
        localStorage.setItem('gender', gender);

        showMainContent();
    });

    document.getElementById('show-password').addEventListener('change', function() {
        const passwordInput = document.getElementById('password');
        if (this.checked) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });

    fetchNews();
});

function showMainContent() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';

    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const age = localStorage.getItem('age');
    const gender = localStorage.getItem('gender');

    document.getElementById('username-display').textContent = username;

    document.getElementById('display-username').textContent = username;
    document.getElementById('display-email').textContent = email;
    document.getElementById('display-age').textContent = age;
    document.getElementById('display-gender').textContent = gender;

    updateClock();
    setInterval(updateClock, 1000);
    updateCounter();
    getLocation();
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        sendEmail(event);
    });
}

function updateClock() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Mexico_City'
    };
    const timeString = now.toLocaleString('es-MX', options);
    document.getElementById('clock').textContent = timeString;
}

function updateCounter() {
    let counter = localStorage.getItem('visitCounter') || 0;
    counter++;
    localStorage.setItem('visitCounter', counter);
    document.getElementById('counter').textContent = counter;
}

function searchTopic() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const topics = [
        { id: 1, name: "historia de la fórmula 1" },
        { id: 2, name: "equipos y pilotos" },
        { id: 3, name: "calendario de carreras" },
        { id: 4, name: "reglamento" },
        { id: 5, name: "estadísticas" },
        { id: 6, name: "circuitos" },
        { id: 7, name: "tecnología" },
        { id: 8, name: "análisis de carreras" }
    ];
    const results = topics.filter(topic => topic.name.includes(searchInput));
    displayResults(results);
}

function displayResults(results) {
    const searchResultDiv = document.getElementById('search-result');
    searchResultDiv.innerHTML = '';
    if (results.length > 0) {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.innerHTML = `El tema "${result.name}" está en el botón número ${result.id}`;
            searchResultDiv.appendChild(resultItem);
        });
    } else {
        searchResultDiv.innerHTML = `No se encontraron resultados para "${document.getElementById('search-input').value}".`;
    }
}

function goToTopic(topicNumber) {
    window.location.href = `tema${topicNumber}.html`;
}

function toggleCurriculum() {
    const curriculumContent = document.getElementById('curriculum-content');
    curriculumContent.style.display = curriculumContent.style.display === 'none' ? 'block' : 'none';
}

function goToHome() {
    window.location.href = 'index.html';
}

function scrollToCurriculum() {
    document.getElementById('curriculum').scrollIntoView({ behavior: 'smooth' });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('location-info').textContent = "La geolocalización no es soportada por este navegador.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            const locationInfo = `${data.address.road}, ${data.address.city}, ${data.address.state}, ${data.address.country}`;
            document.getElementById('location-info').textContent = `Ubicación: ${locationInfo}`;
        })
        .catch(error => {
            document.getElementById('location-info').textContent = `Latitud: ${lat}, Longitud: ${lon}`;
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location-info').textContent = "El usuario denegó la solicitud de geolocalización.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location-info').textContent = "La información de la ubicación no está disponible.";
            break;
        case error.TIMEOUT:
            document.getElementById('location-info').textContent = "La solicitud para obtener la ubicación ha caducado.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location-info').textContent = "Se ha producido un error desconocido.";
            break;
    }
}

function toggleUserDetails() {
    const userDetails = document.getElementById('user-details');
    userDetails.style.display = userDetails.style.display === 'none' ? 'block' : 'none';
}

function resetData() {
    localStorage.clear();
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('login-container').style.display = 'flex';
}

function sendEmail(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:sricardoubaldo@gmail.com?subject=Mensaje%20de%20${name}&body=Correo%20Electrónico:%20${email}%0A%0AMensaje:%0A${message}`;

    window.location.href = mailtoLink;
}

function fetchNews() {
    const newsList = document.getElementById('news-list');
    // Simulación de noticias
    const news = [
        { title: "Última carrera: Gran Premio de Mónaco", date: "2024-05-21", content: "Resumen de la última carrera en Mónaco." },
        { title: "Nuevas reglas para la temporada 2024", date: "2024-05-18", content: "Cambios importantes en el reglamento para esta temporada." },
        { title: "Análisis: ¿Quién ganará el campeonato?", date: "2024-05-15", content: "Predicciones sobre los posibles ganadores del campeonato." }
    ];

    news.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${item.title}</strong> - ${item.date}<br>${item.content}`;
        newsList.appendChild(listItem);
    });
}















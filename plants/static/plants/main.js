// ---------- Favoritos ----------
document.querySelectorAll('.btn.favorite').forEach(btn => {
    const plantId = btn.closest('.card').dataset.name;
    if (localStorage.getItem(`favorite_${plantId}`) === 'true') {
        btn.classList.add('favorited');
    }
    btn.addEventListener('click', () => {
        btn.classList.toggle('favorited');
        localStorage.setItem(`favorite_${plantId}`, btn.classList.contains('favorited'));
        btn.animate([{ transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 200 });
    });
});

// ---------- Búsqueda y filtros ----------
const searchInput = document.getElementById('searchInput');
const speciesFilter = document.getElementById('speciesFilter');
const sortFilter = document.getElementById('sortFilter');

searchInput?.addEventListener('input', filterPlants);
speciesFilter?.addEventListener('change', filterPlants);
sortFilter?.addEventListener('change', filterPlants);

// ---------- Registro de riegos ----------
document.querySelectorAll('.card').forEach(card => {
    const wateringBtn = document.createElement('button');
    wateringBtn.textContent = '💧 Regado';
    wateringBtn.classList.add('btn', 'watering');
    card.querySelector('.card-buttons').appendChild(wateringBtn);

    wateringBtn.addEventListener('click', () => {
        const plantId = card.dataset.name;
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(`watering_${plantId}`, today);

        const interval = parseInt(card.dataset.watering);
        const nextWatering = new Date();
        nextWatering.setDate(nextWatering.getDate() + interval);
        localStorage.setItem(`nextWatering_${plantId}`, nextWatering.toISOString().split('T')[0]);

        alert(`Has regado a ${plantId} hoy 🌱. Próximo riego el ${nextWatering.toLocaleDateString()}.`);
        wateringBtn.animate([{ transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 200 });
    });
});

// ---------- Comparativa ----------
const compareBtn = document.getElementById('compareBtn');
compareBtn?.addEventListener('click', () => {
    const selected = document.querySelectorAll('.card input.compare:checked');
    if (selected.length < 2) return alert('Selecciona al menos 2 plantas para comparar');
    let comparison = '';
    selected.forEach(input => {
        const card = input.closest('.card');
        comparison += `🌱 ${card.dataset.name} - Especie: ${card.dataset.species}, Precio: $${card.dataset.price}, Riego cada ${card.dataset.watering} días\n`;
    });
    alert('Comparativa de plantas:\n\n' + comparison);
});

// ---------- Filtrado ----------
function filterPlants() {
    const searchValue = searchInput?.value.toLowerCase() || '';
    const speciesValue = speciesFilter?.value || '';
    const sortValue = sortFilter?.value || '';
    let cards = Array.from(document.querySelectorAll('.card'));

    cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const species = card.dataset.species.toLowerCase();
        card.style.display = (name.includes(searchValue) && (speciesValue === '' || species === speciesValue.toLowerCase())) ? 'block' : 'none';
    });

    cards = cards.filter(c => c.style.display !== 'none');
    cards.sort((a, b) => {
        if (!sortValue) return 0;
        if (sortValue === 'name') return a.dataset.name.localeCompare(b.dataset.name);
        if (sortValue === 'price') return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
        if (sortValue === 'watering_interval') return parseInt(a.dataset.watering) - parseInt(b.dataset.watering);
    });

    const container = document.querySelector('.plant-cards');
    cards.forEach(card => container?.appendChild(card));
}

// ---------- Modo oscuro ----------
document.querySelectorAll('#theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
});

// Inicializar tema
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');

// ---------- Filtros de especie dinámicos ----------
(function populateSpeciesFilter() {
    const speciesSet = new Set();
    document.querySelectorAll('.card').forEach(card => speciesSet.add(card.dataset.species));
    speciesSet.forEach(species => {
        const option = document.createElement('option');
        option.value = species;
        option.textContent = species;
        speciesFilter?.appendChild(option);
    });
})();

// ---------- Notificaciones de riego ----------
function checkWateringNotifications() {
    document.querySelectorAll('.card').forEach(card => {
        const plantId = card.dataset.name;
        const nextWatering = localStorage.getItem(`nextWatering_${plantId}`);
        if (nextWatering) {
            const today = new Date().toISOString().split('T')[0];
            if (today >= nextWatering) {
                card.style.border = '2px solid #f00';
                card.animate([{ transform: 'scale(1.05)' }, { transform: 'scale(1)' }], { duration: 500 });
            }
        }
    });
}
setInterval(checkWateringNotifications, 60000);
checkWateringNotifications();
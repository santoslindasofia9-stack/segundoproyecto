document.addEventListener('DOMContentLoaded', () => {
    const characterImages = document.querySelectorAll('.imagenes-container .imagen img');
    const selectedList = document.getElementById('lista-seleccionados');
    let selectedCharacters = new Set(); 

    function updateSelectedList() {
        selectedList.innerHTML = '';

        if (selectedCharacters.size === 0) {
            const placeholder = document.createElement('li');
            placeholder.classList.add('placeholder-item'); // Necesitará estilos básicos para no verse feo
            placeholder.textContent = '¡Haz clic en un personaje para añadirlo!';
            selectedList.appendChild(placeholder);
        } else {
            selectedCharacters.forEach(characterName => {
                const listItem = document.createElement('li');
                listItem.textContent = characterName;
                listItem.dataset.name = characterName;
                selectedList.appendChild(listItem);
            });
        }
    }

    characterImages.forEach(image => {
        image.addEventListener('click', (event) => {
            const characterName = event.target.dataset.name;

            if (characterName && !selectedCharacters.has(characterName)) {
                selectedCharacters.add(characterName);
                updateSelectedList();
            }
        });
    });

    selectedList.addEventListener('click', (event) => {
        const clickedItem = event.target;

        if (clickedItem.tagName === 'LI' && clickedItem.dataset.name) {
            const characterToRemove = clickedItem.dataset.name;
            selectedCharacters.delete(characterToRemove);
            updateSelectedList();
        }
    });

    updateSelectedList();
});
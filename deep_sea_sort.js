document.addEventListener("DOMContentLoaded", function() {
    const articleContainer = document.getElementById("fishContainer");
    const sortSelect = document.getElementById("sortSelect");
    let fish_species = []; 

    fetch('data.json')
            .then(response => response.json())
            .then(data => {
                fish_species = data.fish_species; 
                renderFish(fish_species);
                sortSelect.addEventListener("change", sortFish);
            })
            .catch(error => {
                console.error('Error fetching fish data:', error);
            });

    function createFishBox(fish) {
        const fishBox = document.createElement("div");
        fishBox.classList.add("fish_box");
        fishBox.innerHTML = ` 
            <img src="${fish.image_link}" style="max-width: 400px; max-height: 400px;">
            <h3>${fish.name}</h3>
            <p class="size">Size: ${fish.size}</p>
            <p>${fish.description}</p>
            <a href="${fish.link}">Read More</a>
        `;
        return fishBox;
    }

    function renderFish(fish_species) {
        articleContainer.innerHTML = "";
        fish_species.forEach(fish => {
            if (fish.habitat === 'Deep Sea') {
                articleContainer.appendChild(createFishBox(fish));
            }
        });
    }

    function sortFish() {
        const fishList = fish_species.slice(); 
        const selectedOption = sortSelect.value;
            
        fishList.sort((a, b) => {
            if (selectedOption === "popular") {
                return b.popularity - a.popularity;
            } else if (selectedOption === "Small") {
                return a.size === "Small" ? -1 : 1;
            } else if (selectedOption === "Medium") {
                return a.size === "Medium" ? -1 : 1;
            } else if (selectedOption === "Large") {
                return a.size === "Large" ? -1 : 1;
            }else if (selectedOption === "Extra Large") {
                return a.size === "Extra Large" ? -1 : 1;
            }
        });
        renderFish(fishList);
    }
    
    sortSelect.addEventListener("change", sortFish);
});

    document.addEventListener("DOMContentLoaded", function() {
    const articleContainer = document.getElementById("fishContainer");
    const sortSelect = document.getElementById("sortSelect");

    const fishData = [
        {
            fish_name: "Goldfish",
            size: "large",
            popularity: "10",
            imageUrl: "goldfish.jpg",
            date_added: "2024-08-18",
            content: "The goldfish (Carassius auratus) is one of the most popular freshwater fish. They are known for their bright colors and ease of care.",
            link: "fish_temp.html?fishId=goldfish"
        },
        {
            fish_name: "Betta Fish",
            size: "small",
            popularity: "8",
            imageUrl: "betta.jpg",
            date_added: "2024-08-15",
            content: "Betta fish, also known as Siamese fighting fish, are prized for their vibrant colors and flowing fins.",
            link: "fish_temp.html?fishId=betta"
        },
        {
            fish_name: "Angelfish",
            size: "medium",
            popularity: "4",
            imageUrl: "angelfish.jpg",
            date_added: "2024-08-10",
            content: "Angelfish are popular freshwater aquarium fish known for their distinctive shape and graceful movements.",
            link: "fish_temp.html?fishId=angelfish"
        },
        {
            fish_name: "Cory Catfish",
            size: "medium",
            popularity: "6",
            imageUrl: "fishImages/corydoras",
            date_added: "2024-08-15",
            content: "Cory catfish, recognized for their charming demeanor and active scavenging behavior, are favored inhabitants of freshwater aquariums.",
            link: "fish_temp.html?fishId=corycat"
        },
        {
            fish_name: "Guppy",
            size: "small",
            popularity: "7",
            imageUrl: "angelfish.jpg",
            date_added: "2024-08-10",
            content: "Guppies are beloved freshwater aquarium fish admired for their vibrant colors and lively swimming patterns.",
            link: "fish_temp.html?fishId=guppy"
        },
        {
            fish_name: "Platies",
            size: "small",
            popularity: "6",
            imageUrl: "platie.jpg",
            date_added: "2024-08-15",
            content: "Platies, known for their vibrant colors and easiness to breed, are favored freshwater aquarium fish sought after for their lively presence and dynamic swimming patterns.",
            link: "fish_temp.html?fishId=platie"
        },
    ];

    function createFishBox(fish) {
        const fishBox = document.createElement("div");
        fishBox.classList.add("fish_box");
        fishBox.dataset.date = fish.date_added;

        fishBox.innerHTML = `
            <img src="${fish.imageUrl}" >
            <h3>${fish.fish_name}</h3>
            <p class="size">Size: ${fish.size}</p>
            <p>${fish.content}</p>
            <a href="${fish.link}">Read More</a>
        `;
        return fishBox;
    }

    function renderFish(fishList) {
        articleContainer.innerHTML = "";
        fishList.forEach(fish => {
            articleContainer.appendChild(createFishBox(fish));
        });
    }

    function sortFish() {
        const fishList = fishData.slice(); 
        const selectedOption = sortSelect.value;
        
        fishList.sort((a, b) => {
            if (selectedOption === "recently_added") {
                return new Date(b.date_added) - new Date(a.date_added);
            } else if (selectedOption === "popular") {
                return b.popularity - a.popularity;
            } else if (selectedOption === "small") {
                return a.size === "small" ? -1 : 1;
            } else if (selectedOption === "medium") {
                return a.size === "medium" ? -1 : 1;
            } else if (selectedOption === "large") {
                return a.size === "large" ? -1 : 1;
            }
        });
        renderFish(fishList);
    }
    
    sortSelect.addEventListener("change", sortFish);
    renderFish(fishData);
});
function getFishIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const fishId = urlParams.get('fishId');
    if (!fishId) {
        throw new Error("Fish ID not found in the URL");
    }
    
    return fishId;
}

function fetchfishContent(fishId) {
    return new Promise((resolve, reject) => {
        fetch('fish.json')
            .then(response => response.json())
            .then(data => {
                console.log("Fish data:", data); // Log the retrieved data to check its structure
                const fishData = data.fish_species.find(fish => fish.fishId.toLowerCase() === fishId.toLowerCase()); // Fix the property name to 'fishID'
                console.log("Fish data found:", fishData); // Log the found fish data
                if (fishData) {
                    fetch(fishData.contentFile)
                        .then(response => response.text())
                        .then(content => {
                            resolve({ ...fishData, content: content });
                        })
                        .catch(error => {
                            reject("Error fetching article content: " + error);
                        });
                } else {
                    reject("Fish not found");
                }
            })
            .catch(error => {
                reject("Error fetching fish data: " + error);
            });
    });
}

function renderFishContent(fishId) {
    const fishContainer = document.getElementById("fishContent");
    fetchfishContent(fishId)
        .then(fish => {
            const fishName = document.createElement("h2");
            fishName.textContent = fish.name;
            fishContainer.appendChild(fishName);

            const fishDescription = document.createElement("p");
            fishDescription.textContent = fish.description;
            fishContainer.appendChild(fishDescription);

            const fishImage = document.createElement("img");
            fishImage.src = fish.image_link;
            fishImage.alt = fish.name;
            fishImage.style.width = "100p"; 
            fishImage.style.height = "300px"; 
            fishContainer.appendChild(fishImage);

            const fishDetails = document.createElement("div");
            fishDetails.classList.add("fish-details");

            const fishMethod = document.createElement("p");
            fishMethod.textContent = `Fishing Method: ${fish.fishing_method}`;
            fishDetails.appendChild(fishMethod);

            const fishHabitat = document.createElement("p");
            fishHabitat.textContent = `Habitat: ${fish.habitat}`;
            fishDetails.appendChild(fishHabitat);

            const fishSize = document.createElement("p");
            fishSize.textContent = `Size: ${fish.size}`;
            fishDetails.appendChild(fishSize);

            fishContainer.appendChild(fishDetails);
        })
        .catch(error => {
            console.error("Error fetching fish content:", error);
            fishContainer.textContent = "Error: Fish not found";
        });
}


window.onload = function() {
    const fishId = getFishIdFromUrl();
    renderFishContent(fishId);
};
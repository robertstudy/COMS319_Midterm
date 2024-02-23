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
        
        const fishPageData = {
            goldfish: {
                fish_name: "Goldfish",
                water_type: "freshwater",
                size: "large",
                imageUrl: "goldfish.jpg",
                price: "1",
                contentFile: "goldfish.txt",
                
            },

        };
        
        if (fishPageData.hasOwnProperty(fishId)) {
            fetch(fishPageData[fishId].contentFile)
                .then(response => response.text())
                .then(content => {
                    resolve({ ...fishPageData[fishId], content: content });
                })
                .catch(error => {
                    reject("Error fetching article content: " + error);
                });
        } else {
            reject("Article not found");
        }
    });
}
    
        

function renderFishContent(fishId) {
    
    const fishContainer = document.getElementById("fishContent");
    fetchfishContent(fishId).then(fish => {
            
        const fishName = document.createElement("h2");
        fishName.textContent = fish.fish_name;
            //const articleContent = document.createElement("p");
           //articleContent.innerHTML = article.content;

            // Clear any existing content in the article container
        fishContainer.innerHTML = "";

            // Append the article title and content to the article container
        fishContainer.appendChild(fishName);
            //articleContainer.appendChild(articleAuthor);
            //articleContainer.appendChild(articleContent);
    })
    .catch(error => {
        console.error("Error fetching article content:", error);
        fishContainer.textContent = "Error: Article not found";
    });
}

window.onload = function() {
    const fishId = getFishIdFromUrl();
    renderFishContent(fishId);
};
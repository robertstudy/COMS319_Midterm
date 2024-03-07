function search_fish() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    let fish_species = [];
    input = document.getElementById("fishSearch").value;
    input = input.toLowerCase();
    input = input.replaceAll(" ", "_");
    console.log("Input is: " + input.toString());
    fetchfishContent(input);
}
function fetchfishContent(fishId) {
    return new Promise((resolve, reject) => {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                console.log("Fish data:", data); // Log the retrieved data to check its structure
                const fishData = data.fish_species.find(fish => fish.fishId.toLowerCase() === fishId.toLowerCase()); // Fix the property name to 'fishID'
                console.log("Fish data found:", fishData); // Log the found fish data
                if (fishData) {
                  console.log("Found", fishData);
                    fetch(fishData.contentFile)
                        .then(response => response.text())
                        .then(content => {
                            resolve({ ...fishData, content: content });
                            console.log("Found link:" + fishData.link);
                            location.href = fishData.link;
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


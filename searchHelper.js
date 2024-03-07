let count = 0;
let typed = '';
let stringRet = 'Simmilar Fish Species: ';
const inputBox = document.getElementById("fishSearch");
const namesArray = [
    "Rainbow Trout",
    "Musky",
    "Channel Catfish",
    "Bluegill",
    "Largemouth Bass",
    "Yellow Perch",
    "Tuna",
    "Clownfish",
    "Angelfish",
    "Anglerfish",
    "Giant Squid",
    "Blobfish",
    "Piranha",
    "Arapaima",
    "Electric Eel",
    "Anemonefish",
    "Redtail Catfish",
    "Oscar Fish",
    "Yellowtail Snapper",
    "Dolphinfish (Mahi-Mahi)",
    "Striped Bass",
    "Red Snapper",
    "Parrotfish",
    "Moorish Idol",
    "Blue Tang",
    "Lionfish",
    "Fangtooth Fish",
    "Grenadier",
    "Barreleye",
    "Batfish",
    "Bettas",
    "Black Scabbardfish",
    "Chinook Salmon",
    "Deep Sea Anglerfish",
    "Deep Sea Hatchetfish",
    "Dragonfish",
    "Goldfish",
    "Grenadier",
    "Guppy",
    "Hatchetfish",
    "Mackerel",
    "Marlin",
    "Permit",
    "Pike",
    "Platies",
    "Red Drum",
    "Tiger Barb",
    "Trout"
];
window.addEventListener("keydown", (event) => {

    if (event.key === "Backspace") {
        typed = typed.substring(0, typed.length - 1);
    }
    else {
        typed += event.key;
    }
    console.log(typed);

    for (let i = 0; i < namesArray.length; i++) {
        if (namesArray[i].toLowerCase().startsWith(typed)) {
            stringRet += namesArray[i] + ", ";
        }
    }
    stringRet = stringRet.substring(0, stringRet.length - 2);
    if (count > 0) {
        const element = document.getElementById("divID");
        element.remove();
    }
    // Creating a div element
    var divElement = document.createElement("div");
    divElement.id = "divID";

    // Styling it

    divElement.style.textAlign = "center";
    divElement.style.fontWeight = "bold";
    divElement.style.fontSize = "smaller";
    divElement.style.padding = "3px";
    divElement.style.strike = "none";


    // Adding a paragraph to it
    var paragraph = document.createElement("p");
    var text = document.createTextNode("" + stringRet);
    paragraph.appendChild(text);
    paragraph.style.textDecorationLine = "none";
    divElement.appendChild(paragraph);

    // Appending the div element to body
    document.getElementsByTagName("s")[0].appendChild(divElement);
    count++;

    stringRet = 'Simmilar Fish Species: ';
});
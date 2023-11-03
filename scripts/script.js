const url = "https://majazocom.github.io/Data/solaris.json";
let planetContainer = document.querySelector(".planet-container");
let planets = document.querySelectorAll(".planet-container>div");
let planetId = [];
const svg = document.querySelector("svg");
svg.remove();

//Get the info of the selected planet from API.
const fetchApi = async (planetId) => {
  const response = await fetch(url);
  const data = await response.json();
  const planetData = data[planetId];
  return (planetId = planetData);
};

//Adds eventlistener for each planet.
const addEventListenerToPlanets = () => {
  planets.forEach((body) => {
    planetId.push(body.id);
    body.addEventListener("click", () => {
      openInfoBox(body.id);
    });
  });
};
//Opens the infobox of the clicked planet
const openInfoBox = async (selectedPlanet, planetData) => {
  //Retrieves all of the data of the planet user pressed.
  planetData = await fetchApi(selectedPlanet);

  const popupBox = document.createElement("div");
  popupBox.className = "popup-box";
  document.body.append(popupBox, planetContainer);
  //Add stars
  svg.style.opacity = 1;
  popupBox.append(svg);
  addInfo(selectedPlanet, planetData, popupBox);
};

//addInfo in seperate function for better readability and shorter functions.
const addInfo = (selectedPlanet, planetData, popupBox) => {
  //Content box inside of the overlay
  const innerBox = document.createElement("div");
  innerBox.className = "info-div";
  popupBox.append(innerBox);

  //Make selected planed get displayed on info page by adding a class to the planet.
  const planetDeco = document.getElementById(selectedPlanet);
  planetDeco.classList.add("deco");

  //Eventlistener to listen for click to go out of info
  popupBox.addEventListener("click", () => {
    planetDeco.classList.remove("deco");
    popupBox.remove();
  });
  //#region planet info
  //Title of planet in Swedish
  const titleSwe = document.createElement("h2");
  titleSwe.className = "planet-name";
  titleSwe.textContent = planetData.name.toUpperCase();
  innerBox.append(titleSwe);

  //Title of planet in Latin
  const titleLat = document.createElement("h3");
  titleLat.className = "planet-name-lat";
  titleLat.textContent = planetData.latinName.toUpperCase();
  innerBox.append(titleLat);

  //Description of planet
  const planetDesc = document.createElement("p");
  planetDesc.className = "planet-description";
  planetDesc.textContent = planetData.desc;
  innerBox.append(planetDesc);

  //Dividing line, for readability
  const hr = document.createElement("hr");
  hr.className = "hr";
  innerBox.append(hr);

  //new box to sort everything easy
  const quickInfo = document.createElement("div");
  quickInfo.className = "quick-info";
  innerBox.append(quickInfo);

  //creates boxes for quick infos underneath description.
  const smallBox1 = document.createElement("div");
  smallBox1.className = "small-box";
  quickInfo.append(smallBox1);
  const smallBox2 = document.createElement("div");
  smallBox2.className = "small-box";
  quickInfo.append(smallBox2);
  const smallBox3 = document.createElement("div");
  smallBox3.className = "small-box";
  quickInfo.append(smallBox3);

  //Omkrets
  const info1Title = document.createElement("h3");
  info1Title.className = "info-title";
  info1Title.textContent = "OMKRETS";
  smallBox1.append(info1Title);

  const info1info = document.createElement("p");
  info1info.className = "info-info";
  info1info.textContent = planetData.circumference;
  smallBox1.append(info1info);

  //Km från solen
  const info2Title = document.createElement("h3");
  info2Title.className = "info-title";
  info2Title.textContent = "KM FRÅN SOLEN";
  smallBox2.append(info2Title);

  const info2info = document.createElement("p");
  info2info.className = "info-info";
  info2info.textContent = planetData.distance;
  smallBox2.append(info2info);

  //Dygn runt solen
  const info3Title = document.createElement("h3");
  info3Title.className = "info-title";
  info3Title.textContent = "DYGN RUNT SOLEN";
  smallBox3.append(info3Title);

  const info3info = document.createElement("p");
  info3info.className = "info-info";
  info3info.textContent = planetData.orbitalPeriod;
  smallBox3.append(info3info);
  //#endregion
};
addEventListenerToPlanets();

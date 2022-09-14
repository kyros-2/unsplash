const allContainer = document.getElementById("all-container");
const apiKey = "LVP2bKnC_9PjOcY6lqDbXNA3aS0n2EZ4Rq6M3H9QeWE";
const colection = [
  "Wallpapers",
  "3D Renders",
  "Textures",
  "Experimental",
  "Architecture",
  "Nature",
  "Business & Work",
  "Fashion",
  "Film",
  "Food",
  "Health & Wellness",
  "People",
  "Interiors",
  "Street Photography",
  "Travel",
  "Animals",
  "Spirituality",
  "Arts",
  "History",
  "Athletics",
];

for (let j in colection) {
  let api = `https://api.unsplash.com/search/photos/?per_page=30&query=${colection[j]}&client_id=${apiKey}`;
  fetchData(api);

  function fetchData(api) {
    fetch(api).then((re) => re.json().then((res) => getData(res)));
  }

  const container = document.createElement("div");
  container.className = "container";

  const title = document.createElement("h1");
  title.textContent = colection[j];
  title.className = "title";

  const imgsContainer = document.createElement("div");
  imgsContainer.className = "imgs-container";

  function getData(data) {
    for (let i in data.results) {
      let imgs = document.createElement("img");
      imgs.src = data.results[i].urls.small;
      imgs.className = "imgsItem";
      imgs.alt = "unsplash";
      imgs.setAttribute("data-description", data.results[i].alt_description);

      imgsContainer.appendChild(imgs);
    }
    container.appendChild(title);
    container.appendChild(imgsContainer);
  }
  allContainer.appendChild(container);
}

const closeBtn = document.querySelector("i.fa-xmark"),
  detailsImg = document.querySelector('img[alt="details"]'),
  detailsDescription = document.querySelector("h4.description"),
  detailsChild = document.querySelector("div.container-details"),
  detailsContainer = document.querySelector("div.img-details");

const body = document.querySelector("body");

allContainer.addEventListener("click", function (e) {
  if (`${e.target}` == "[object HTMLImageElement]") {
    detailsImg.src = e.target.getAttribute("src");
    detailsDescription.textContent = e.target.getAttribute("data-description");

    detailsContainer.style.opacity = 1;
    detailsContainer.style.zIndex = 11;
    detailsChild.style.transform = "scale(1)";
  }
});

closeBtn.addEventListener("click", function () {
  detailsContainer.style.opacity = 0;
  detailsChild.style.transform = "scale(0)";
  setTimeout(() => {
    detailsContainer.style.zIndex = -1;
  }, 400);
});

window.onload = () => {
  const loader = document.querySelector("div.loaderContainer");

  loader.style.opacity = "0";
  setTimeout(() => {
    loader.remove();
  }, 500);
};

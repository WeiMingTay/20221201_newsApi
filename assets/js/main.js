let buttonSuche = document.querySelector("#buttonSuche");
let datum = document.querySelector("#datum");

let ausgabe = document.querySelector(".newsAusgabe");
let sprache = "";
// Sprachauswahl
let sprachContainer = document.getElementById("sprache");

let deutsch = document.getElementById("de");
let deLabel = document.getElementById("deLabel");
let englisch = document.getElementById("en");
let enLabel = document.getElementById("enLabel");

sprachContainer.addEventListener("input", () => {
	if (deutsch.checked) {
		sprache = "de";
		enLabel.style.filter = "grayscale(1)";
		deLabel.style.filter = "grayscale(0)";
		enLabel.style.fontSize = "1.9rem";
		deLabel.style.fontSize = "2.1rem";
	} else if (englisch.checked) {
		sprache = "en";
		enLabel.style.filter = "grayscale(0)";
		deLabel.style.filter = "grayscale(1)";
		deLabel.style.fontSize = "1.9rem";
		enLabel.style.fontSize = "2.1rem";
	}
});
console.log(sprache);

buttonSuche.addEventListener("click", () => {
	// "Reset" der Newsausgabe
	ausgabe.innerHTML = "";

	// Variablen
	let input = document.querySelector("#suchen");
	let inputLabel = document.querySelector("#labelSuche");

	// Datum erkennen/ ausgeben
	if (typeof datum.value == "string") {
		datum = new Date().toLocaleDateString("zh-Hans-CN").replaceAll("/", "-");
	}
	console.log(datum);

	// Suchausgabe im Label
	inputLabel.innerHTML = input.value;

	// fetch/ URL
	let url = `http://newsapi.org/v2/everything?q=${input.value}&language=${sprache}&from=${datum}&sortBy=publishedAt&apiKey=61a51e6230e145a2b1bda71a11df1048`;

	console.log(url);

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			for (let e = 0; e < 30; e++) {
				ausgabe.class = "ausgabe";

				let divArticle = document.createElement("div");
				divArticle.class = "article";
				ausgabe.appendChild(divArticle);

				let divImg = document.createElement("a");
				divImg.href = data.articles[e].url;
				divImg.class = "imgContainer";
				divArticle.appendChild(divImg);

				let img = document.createElement("img");
				img.src = data.articles[e].urlToImage;
				img.alt = data.articles[e].author;
				divImg.appendChild(img);

				let divInhalt = document.createElement("div");
				divInhalt.class = "inhalt";
				divArticle.appendChild(divInhalt);

				let authorP = document.createElement("p");
				authorP.innerHTML = data.articles[e].author;
				divInhalt.appendChild(authorP);

				let h2 = document.createElement("h2");
				h2.innerHTML = data.articles[e].title;
				divInhalt.appendChild(h2);

				let p = document.createElement("p");
				p.innerHTML = data.articles[e].description;
				divInhalt.appendChild(p);

				let date = document.createElement("date");
				date.innerHTML = new Date(
					data.articles[e].publishedAt
				).toLocaleDateString();
				divInhalt.appendChild(date);

				let a = document.createElement("a");
				a.innerText = "Read More";
				a.target = "_blank";
				a.href = data.articles[e].url;
				divInhalt.appendChild(a);

				/* let artikelLink = document.querySelector(".article");
			artikelLink.addEventListener("click", () => {
				window.open(data.articles[e].url);
			}); */
			}
		});

	input.value = "";
});

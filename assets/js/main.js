let input = document.querySelector("suchen");
fetch(
	"https://newsapi.org/v2/everything?q=movies&from=2022-12-01&sortBy=publishedAt&apiKey=61a51e6230e145a2b1bda71a11df1048"
)
	.then((response) => response.json())
	.then((data) => {
		console.log(data.articles[2]);

		for (let e = 0; e < 30; e++) { //data.articles.length
			let ausgabe = document.querySelector(".newsAusgabe");
			ausgabe.class = "ausgabe";

			let divArticle = document.createElement("div");
			divArticle.class = "article";
			ausgabe.appendChild(divArticle);

			let img = document.createElement("img");
			img.src = data.articles[e].urlToImage;
			img.alt = data.articles[e].author;
			divArticle.appendChild(img);

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

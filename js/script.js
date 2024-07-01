const searchForm = document.getElementById("searchForm");
const cocktailList = document.getElementById("cocktailResult");

async function getCocktailList(searchInput) {
  const cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
  const response = await fetch(cocktailUrl);
  loader.classList.remove("hidden");
  if (response.ok) {
    const data = await response.json();
    if (data?.drinks?.length) {
      loader.classList.add("hidden");
      return data.drinks;
    } else {
      loader.classList.add("hidden");
      alert("No cocktail found");
      return [];
    }
  } else {
    loader.classList.add("hidden");
    alert("Try again later");
    return [];
  }
}

function createCocktailCard(cocktail) {
  return `
    <div class="card" style="width: 18rem;" id="cocktailCardPage">
      <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${cocktail.strDrink}</h5>
      </div>
    </div>
  `;
}

function displayCocktails(cocktails) {
  cocktailList.innerHTML = "";
  cocktails.forEach((cocktail) => {
    const cocktailItem = document.createElement("div");
    cocktailItem.classList.add("col-12", "col-md-4");
    cocktailItem.innerHTML = createCocktailCard(cocktail);
    cocktailList.appendChild(cocktailItem);
  });
}

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const searchInput = document.getElementById("cocktailInput").value.trim();
  if (!searchInput) {
    alert("Please enter cocktail name");
    return;
  } else {
    const cocktails = await getCocktailList(searchInput);
    displayCocktails(cocktails);
  }
});

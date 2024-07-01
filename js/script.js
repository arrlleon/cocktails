const searchInput = document.getElementById("cocktailInput").value.trim();
const searchForm = document.getElementById("searchForm");
const cocktailList = document.getElementById("cocktailResult");
const cocktailUrl = `www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;

async function getCocktailList() {
  const response = await fetch(cocktailUrl);
  if (response.ok) {
    const data = await response.json();
    if (data?.drinks?.length) {
      return data?.drinks;
    } else {
      alert("No cocktail found");
      return;
    }
  } else {
    alert("Try again later");
    return;
  }
}

searchForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const cocktail = searchInput;

  if (!cocktail) {
    alert("Please enter cocktail");
    return;
  } else {
    const cocktailList = await getCocktailList(cocktail);
    displayCocktails(cocktailList);
  }
});

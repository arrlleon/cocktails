const searchForm = document.getElementById("searchForm");
const cocktailList = document.getElementById("cocktailResult");
const loader = document.getElementById("loader");

async function getCocktailList(searchInput) {
  loader.classList.remove("hidden");
  const cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
  const response = await fetch(cocktailUrl);
  loader.classList.add("hidden");
  if (response.ok) {
    const data = await response.json();
    if (data?.drinks?.length) {
      return data.drinks;
    } else {
      alert("No cocktail found");
      return [];
    }
  } else {
    alert("Try again later");
    return [];
  }
}

function createCocktailModal(cocktail) {
  let ingredientsHtml = "";
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient) {
      const ingredientImg = `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;
      ingredientsHtml += `
          <div class="d-flex align-items-center mb-2">
            <img src="${ingredientImg}" alt="${ingredient}" class="me-2" style="width: 50px; height: 50px;">
            <span>${ingredient} ${measure ? "- " + measure : ""}</span>
          </div>
        `;
    }
  }

  return `
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${cocktail.idDrink}">
        Read more
      </button>
      <div class="modal fade" id="exampleModal${cocktail.idDrink}" tabindex="-1" aria-labelledby="exampleModalLabel${cocktail.idDrink}" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel${cocktail.idDrink}">${cocktail.strDrink}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h5>Ingredients</h5>
              ${ingredientsHtml}
              <h5>Instructions</h5>
              <p>${cocktail.strInstructions}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`;
}

function createCocktailCard(cocktail) {
  return `
    <div class="card" style="width: 18rem;" id="cocktailCardPage">
      <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${cocktail.strDrink}</h5>
        ${createCocktailModal(cocktail)}
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

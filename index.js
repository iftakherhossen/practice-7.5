document.getElementById("error-message").style.display = "none";
document.getElementById("result-message").style.display = "none";
document.getElementById("meal-details").style.display = "none";

const handleSearchFood = () => {
    const searchInput = document.getElementById("search-field").value;

    document.getElementById("error-message").style.display = "none";
    if (searchInput === "") {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("error-message").innerText = "Something went wrong please try again later!";
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
            .then(res => res.json())
            .then(data => {
                displaySearchResults(data.meals, searchInput)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

const getFirstTwentyWords = (text) => {
    const words = text.split(" ");
    return words.slice(0, 20).join(" ") + "... Read More";
};

const displayMealDetails = (meal) => {
    document.getElementById("meal-details").style.display = "block";
    const mealDetails = document.getElementById("meal-details");
    mealDetails.innerHTML = "";
    const div = document.createElement("div");
    console.log(meal)

    div.innerHTML = `
        <div class="card">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${meal.strMealThumb}" class="img-fluid rounded-start h-100 w-100" alt="${meal.strMeal}" >
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h4 class="card-title fw-bolder">${meal.strMeal}</h4>
                            <div class="badge bg-dark py-2"><strong>Category:</strong> ${meal.strCategory}</div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <p class="card-text my-auto"><strong>Origin:</strong> ${meal.strArea}</p>
                            <p class="card-text"><strong>Tags:</strong> ${meal.strTags}</p>
                        </div>
                        <p class="card-text"><strong>Instruction:</strong> ${meal.strInstructions}</p>                        
                        <a href="${meal.strSource}" class="text-decoration-none"><button class="btn btn-primary me-2">Read full Blog</button></a>                       
                        <a href="${meal.strYoutube}" class="text-decoration-none"><button class="btn btn-danger">Watch the Video Tutorial</button></a>                       
                    </div>
                </div>
            </div>
        </div>
    `;

    mealDetails.appendChild(div);
}

const handleViewMeal = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            displayMealDetails(data.meals[0])
        })
        .catch(err => {
            console.log(err)
        })
}

const displaySearchResults = (meals, searchInput) => {
    const mealContainer = document.getElementById("meal-container");
    mealContainer.innerHTML = "";
    document.getElementById("result-message").style.display = "block";
    document.getElementById("result-message").innerHTML = `Showing results of: <strong class="fw-bolder text-capitalize ">${searchInput}</strong>`;

    if (meals == null || meals.length == 0) {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("error-message").innerText = "No results found! try different keyword!";
    }  

    meals.forEach(meal => {
        const div = document.createElement("div");
        div.className = "col";

        div.innerHTML = `
            <div class="card" onclick="handleViewMeal(${meal.idMeal})">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body">
                    <h4 class="card-title fs-3">${meal.strMeal}</h4>                                
                    <p class="card-text"><strong>Instruction:</strong> ${getFirstTwentyWords(meal.strInstructions)}</p>
                    <div class="badge bg-dark py-2">${meal.strCategory}</div>
                </div>
            </div>
        `;

        mealContainer.appendChild(div);
    });    
}

document.getElementById("search-field").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        handleSearchFood();
    }
});
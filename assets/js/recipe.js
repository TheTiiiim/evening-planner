// spoontacular API key 
const apiKey = '38f510f9fde94594b09c5518393c289c'

// meal search submission
$(".mealSearchForm").on("submit", function (e) {
    e.preventDefault()

    // prepare data object
    let dataObj = {
        ingredients: [],
        intolerances: [],
        diet: ""
    };

    // form jquery object
    let form = $(this);
    let formData = form.serializeArray();

    // access chips data
    let chipElement = form.find(".chips").eq(0)
    let chipInstance = M.Chips.getInstance(chipElement);

    // add chip data to dataObj
    chipInstance.chipsData.forEach((chip) => {
        dataObj.ingredients.push(chip.tag.toLowerCase());
    });

    // add intolerance data to dataObj
    formData.forEach(value => {
        // check if value is an intolerance
        if (value.name[0] === "I") {
            dataObj.intolerances.push(value.name.slice(1).toLowerCase());
        }
        // check if value is a diet
        if (value.name === "DDiet") {
            dataObj.diet = (value.value.toLowerCase());
        }
    });

    // all form data is in dataObj now
    console.log(dataObj);
    searchRecipes(dataObj.diet, dataObj.ingredients.toString(), dataObj.intolerances.toString());
});

// need a function to string text from input groups to add to api request
function grabInputs() {

}


// function that gathers all parameters and calls to API
function searchRecipes(diet, includeIngredients, intolerances) {
    const numberOfRecipes = 5;
    const dietRestriction = (diet.toLowerCase() === 'regular diet') ? '' : diet;
    let queryURL = `https://api.spoonacular.com/recipes/complexSearch?diet=${dietRestriction}&intolerances=${intolerances}&includeIngredients=${includeIngredients}&number=${numberOfRecipes}&addRecipeInformation=true&apiKey=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
        success: (res) => {
            return res;
        }
    });
}

function getRecipeSummaryById(ID) {
    let queryURL = `https://api.spoonacular.com/recipes/${ID}/information?apiKey=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
        success: (res) => {
            return res;
        }
    });
}

var allRecpies =[]

var searchInput = document.getElementById("searchInput")
var errorSearch = document.getElementById("errorSearch")



getRecipes()
async function getRecipes(meal = "pizza"){
   try {
    var respons = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`)
    var finalResponse= await respons.json()
    allRecpies = finalResponse.recipes
    displayData()
    errorSearch.classList.add("d-none")
   } catch (error) {
    console.log(error);
    errorSearch.classList.remove("d-none")
    errorSearch.innerHTML = "Meal Not Found !";

    document.getElementById("rowData").innerHTML = ""
    
   }
}

function displayData(){
    var cartona ='';
    for(var i =0; i< allRecpies.length;i++){
        cartona += `
          <div class="col-md-4">
                <div class="card text-center">
                    <img src="${allRecpies[i].image_url}" alt="" class="w-100">
                    <div class="card-body">
                        <h3>${allRecpies[i].title.split(" ", 2).join(" ")}</h3>
                        <button class="btn btn-danger">Get Info</button>
                    </div>
                </div>
            </div>`
    }
    document.getElementById("rowData").innerHTML = cartona
}

document.getElementById("searchBtn").addEventListener("click", function () {
    if (searchInput.value.trim() === "") {
        errorSearch.classList.remove("d-none");
        errorSearch.innerHTML = "Please enter a meal name!";
        document.getElementById("rowData").innerHTML = "";
        return;
    }

    getRecipes(searchInput.value.trim());
});



document.getElementById("searchInput").addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        if (searchInput.value.trim() === "") {
            errorSearch.classList.remove("d-none");
            errorSearch.innerHTML = "Please enter a meal name!";
            document.getElementById("rowData").innerHTML = "";
            return;
        }

        getRecipes(searchInput.value.trim());
    }
});

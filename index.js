const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const recipeDetails = document.querySelector(".recipe-details")


const fetchRecipes = async(query)=>{
recipeContainer.innerHTML="<h2>Fetching Recipes For You....</h2>" 
try {
    
   
const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

const response = await data.json();
console.log(response)
recipeContainer.innerHTML="";
response.meals.forEach(meal =>{
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
    <img src = "${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `
    const button = document.createElement('button');
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

    // Adding event listner to recipe button
    button.addEventListener('click', ()=>{
        openRecipePopup(meal)
    });
    recipeContainer.appendChild(recipeDiv);
   

});
} catch (error) {
    recipeContainer.innerHTML="<h2> There Is An Error In Fetching Recipes</h2>" 
}
// console.log(response.meals[0])
}
    const fetchIngredents=(meal)=>{
        let ingredentList = "";
        for(let i=1;i<=20;i++){
            const ingredents = meal[`strIngredient${i}`];
        if(ingredents){
            const measure = meal[`strMeasure${i}`];
            ingredentList += `<li>${ingredents} ${measure}</li>`
        }else{
            break;
        }
        }
        return ingredentList;

    }

 const openRecipePopup = (meal) =>{
     recipeDetails.style.display ='block';
     recipeDetailsContent.innerHTML = `<h2 class = "recipeName">${meal.strMeal}</h2>
     <h2>Ingredents:</h2>
     <ul class="recipeIngredent">${fetchIngredents(meal)}</ul>
     <div class="recipeInstruction">
     <h3>Instructions:</h3>
     <p>${meal.strInstructions}</p>
     </div>
     `

   
}
recipeCloseBtn.addEventListener('click',()=>{
    recipeDetails.style.display='none'
})


searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML="<h2>Please Enter The Recipe In Search Box</h2>" 
        return
    }
   fetchRecipes(searchInput);
});
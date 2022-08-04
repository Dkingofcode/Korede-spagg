


let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');


window.onscroll = () =>{

    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    section.forEach(sec =>{

        let top = window.scrollY;
        let height = sec.offsetHeight;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute('id');

        if(top => offset && top < offset + height){
            navLinks.forEach(links =>{
                links.classList.remove('active');
                document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
            
            });
        }; 

    });

}

document.querySelector('#search-icon').onclick = () =>{
    document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
    document.querySelector('#search-form').classList.remove('active');
}

/*var swiper = new swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,  
    },
   loop: true,
});

var swiper = new swiper(".review-slider", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
   loop: true,
   breakpoints: {
     0: {
         slidesPerView: 1,
     },
     640: {
         slidesPerView: 2,
     },
     768: {
         slidesPerView: 2,
     },
     1024: {
         slidesPerView: 3,
     },
   },
});
*/
function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');

}

function fadeOut(){
    setInterval(loader, 3000);
}

window.onload = fadeOut;


const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");

const options = { 
    root: null,
    threshold: 0,
    rootMargin: "-150px"
};

/*const observer = new IntersectionObserver(function(entries, observer){
   entries.forEach(entry => {
     if(!entry.isIntersecting){
        return;
     }
    console.log(entry.target);
    observer.unobserve(entry.target)
   });
}, options);

sections.forEach(section => {
    observer.observe(section);
})


observer.observe(sectionOne);
*/


const appearOnScroll = new IntersectionObserver(function(
    entries, appearOnScroll){
        entries.forEach(entry => {
          if(!entry.isIntersecting) {
            return;
          }  else {
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
          }
        });
    }, options)

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  sliders.forEach(slider => {
    appearOnScroll.observe(slider);
  })

     




/*
const meals = document.getElementById("meals");
const Favmeals = document.getElementById("fav-meals")
const Searchbox = document.getElementById("search-term")
const searchBtn = document.getElementById("search")
const Mealpopup = document.getElementById("popup");
const Closepopup = document.getElementById("close-popup")
const Mealinfo = document.getElementById("meal-info")

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
   const Meal = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    
   const mealData = await Meal.json()
    const randomMeal = mealData.meals[0]; 
    
    loadRandomMeal(randomMeal, true)
}

async function getMealById(id) {
   const meal = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);

   const mealData = await meal.json()
   const Meal = mealData.meals[0];
   return Meal;
}

async function getMealBySearch(term){
   const meal =  await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
     
   const mealData = await meal.json();
    const meals = mealData.meals;
    return meals;
    
}


function loadRandomMeal(mealData, random = false) {
    const meal = document.createElement("div");
    meal.classList.add("meal");
    
    
    meal.innerHTML = `<div class="meal-header">
       ${ random ? 
        `<span class="random">Random Recipe</span>`
        : "" }
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">  
    </div>
    <div class="meal-body">
      <h4>${mealData.strMeal}</h4>
      <button class="fav-btn active">
        <i class="fas fa-heart"></i>
      </button>
    </div>
  </div>
`;
     const btn = meal.querySelector(".meal-body .fav-btn")
   
     btn.addEventListener("click", () =>{
    if(btn.classList.contains("active")) {
        removeFromLS(mealData.idMeal)
        btn.classList.remove("active");
    }else{
        addMealToLS(mealData.idMeal)
        btn.classList.add("active");
    }

    fetchFavMeals();
   });

   meals.addEventListener("click", () => {
     updateMealInfo(mealData);
   })

   meals.appendChild(meal)
   }
 
function removeFromLS(mealId) {
    const mealIds = getMealsFromLS();

    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

function addMealToLS(mealId) {
   const mealIds = getMealsFromLS();
   
   localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]))
}

function getMealsFromLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds")) 
   return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals(){
    // clean the container
    Favmeals.innerHTML = "";

   const mealIds = getMealsFromLS();
    

   for(let i =0; i < mealIds.length; i++) {
     const  mealId = mealIds[i];

     const Meal = await getMealById(mealId);
    
    addMealToFav(Meal);
   }
}

function addMealToFav(mealData) {
    const Favmeal = document.createElement("li");
    
    
    Favmeal.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"><span>${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>
`;

    const btn = Favmeal.querySelector(".clear");
     btn.addEventListener("click", () =>{
        removeFromLS(mealData.idMeal);

        fetchFavMeals();
     });

   Favmeals.appendChild(Favmeal);
   }


   searchBtn.addEventListener("click", async() => {
     const search = Searchbox.value;
      
     const meals = await getMealBySearch(search);
      meals.forEach((meal) => {
        loadRandomMeal(meal);
      })    
    })
     
  function updateMealInfo(mealData){
    // clean it up
     Mealinfo.innerHTML = ""; 

    const mealinfo = document.createElement("div");

    const ingredients = [];
    // get ingredients and measures
    for(let i = 1; i <= 20; i++){
      if(mealData["strIngredient"+ i]) {
        ingredients.push(
            `${mealData["strIngredient" + i]} - 
            ${mealData["strMeasure" +i]}`);
      }  else{
               break;
      }
    }

    mealinfo.innerHTML = ` <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="">
<p>
${mealData.strInstructions}
</p>
<h3>Ingredients:</h3>
<ul>
    ${ingredients.map((ing) => 
        `<li>${ing}</li>`).join("")}
    </ul>
`; 

    Mealinfo.appendChild(mealinfo);

    // show the popup
    Mealpopup.classList.remove("hidden");
  }  
   
Closepopup.addEventListener("click", () => {
    Mealpopup.classList.add("hidden")
})
*/





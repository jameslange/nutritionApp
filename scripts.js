const userInput = document.getElementById("userInput");
const formSubmit = document.getElementById('myForm');
const searchRender2 = document.getElementById('inner');
let searchRender = document.getElementById('inner');
const myWrap = document.getElementById('multi-item-example');
let carousel = document.getElementById('myCarousel');
const carouselControls = document.getElementById('carouselControls');
const learnMore = document.getElementById('learnMore');
const carouselIndication = document.getElementById('carouselIndication');
const RS_APP_ID = '52fd1762';
const RS_API_KEY = 'fa5d62951636663b3ee0188b363aeb88';
let currentData;

/* ----------------------Search input ------------------------------------------ */
const recipeSiteBtn = document.getElementById('recipeSiteBtn')


async function foodSearch(e){
    if(e.type === 'submit')e.preventDefault();
    console.log(e.type)
    

   let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${userInput.value}&app_id=${RS_APP_ID}&app_key=${RS_API_KEY}`;
   // let hardCoded = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${RS_APP_ID}&app_key=${API_KEY}`
    let response = await fetch(url);
    let data = await response.json();
    currentData = data;
    console.log(data);
    removeCards();
    learnMore.classList.remove('d-none');
    carouselControls.classList.remove('d-none');
    renderCard(data);   
   
}

function removeCards(){
  if(carousel.children.length>1){
    Array.from(searchRender2.children).forEach(elem => elem.remove());
    Array.from(carousel.children).forEach((elem, i)=>{i==0 ? null:  elem.remove()});
  }
}
/* ----------------------Render Cards ------------------------------------------ */

 const ingredientsList1 = document.getElementById('ingredientsList1');
 const prepInstructions1 = document.getElementById('prepInstructions1')
function renderCard(data){
 if(!searchRender2.classList.contains('active')) searchRender2.classList.add('active');
  
  const helperFunc= () => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('carousel-item',);
    
    carousel.appendChild(newDiv);
    searchRender= newDiv;
    searchRender.addEventListener('click', whichRecipe);
     return searchRender;
  }

  if(mediaQuery1.matches){
    cardConstructor(1);
   } else if(mediaQuery2.matches){
    cardConstructor(4);
   }

  function cardConstructor (cardNumber){
    for(let i=0; i< currentData.hits.length; i++){ 
      let myInnerHTML = `
      <div class =" col-md-3"  style="float:left ">
      <div id="${data.hits[i].recipe.label}" class="card mb-2 p-3 border border-3 mh-100 border-dark" style="height= 20px; width = 20vw;">
      <h5 class="card-title text-truncate "><strong>${data.hits[i].recipe.label}</strong></h5>  
      <img class="card-img-top border border-3  border-dark" src="${data.hits[i].recipe.image}" alt="Card image cap">
      </div>
    </div>`;

    if(i<cardNumber){
      searchRender2.innerHTML += myInnerHTML;
      continue;
    }
    if((i>0)&&(i%cardNumber===0)){
      helperFunc().innerHTML+=myInnerHTML;
     
    } else{
      searchRender.innerHTML+=myInnerHTML;
    }
  }
}
}
/* ----------------------Select the Card------------------------------------------ */

function whichRecipe(e){
  targetRecipe = document.getElementById(`${e.target.parentElement.id}`)
  if(targetRecipe.classList.contains('card-body')){
    targetRecipe=e.target.parentElement.parentElement.id
  }else{
    targetRecipe=targetRecipe.id;
  }
  console.log(targetRecipe)
  findOutMore(targetRecipe);
}


/* ----------------------Query server w/ card selection------------------------------------------ */


async function findOutMore(query){
  let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${RS_APP_ID}&app_key=${RS_API_KEY}`;
  let response = await fetch(url);
  let data = await response.json();
  
  
  onClickRender.classList.remove('d-none');
  nutritionTableRender(data.hits[0].recipe);
  window.scrollTo({
    top:950,
    left:0,
    behavior:'smooth'
  });

}
//findOutMore('chicken');

/* ----------------------Render selection below------------------------------------------ */
const onClickRender = document.getElementById('content2');

const servings = document.querySelector('.servings');
const servingSize = document.getElementById('servingSize');
const calories = document.getElementById('caloriesPerServing');
const fatContent = document.getElementById('fatContent');
const dailyFatPercentage =document.getElementById('dailyFatPercentage');
const saturatedFat= document.getElementById('saturatedFat');
const dailySFatPercentage = document.getElementById('dailySFatPercentage');
const transFat = document.getElementById('transFat');
const cholesterol = document.getElementById('cholesterol');
const cholesterolPercentage = document.getElementById('cholesterolPercentage');
const sodium = document.getElementById('sodium');
const sodiumPercentage = document.getElementById('sodiumPercentage');
const carbs = document.getElementById('carbs');
const carbsPercentage = document.getElementById('carbsPercentage');
const fiber = document.getElementById('fiber');
const fiberPercentage = document.getElementById('fiberPercentage');
const totalSugar = document.getElementById('totalSugar');
const protein = document.getElementById('protein');
const vitaminD = document.getElementById('vitaminD');
const vitaminDPercentage = document.getElementById('vitaminDPercentage');
const calcium = document.getElementById('calcium');
const calciumPercentage = document.getElementById('calciumPercentage');
const iron = document.getElementById('iron');
const ironPercentage = document.getElementById('ironPercentage');
const potassium = document.getElementById('potassium');
const potassiumPercentage = document.getElementById('potassiumPercentage');
// const proteinPercentage = document.getElementById('proteinPercentage')

let currentSite;

const nutritionColumn = document.getElementsByClassName('nutrition-column');

const microNutrients = document.getElementById('microNutrients');
const nutrientsList = document.getElementById('nutrientsList');
const prepInstructions = document.getElementById('prepInstructions');

const ingredientsList = document.getElementById('ingredientsList')
const appendDiv=document.getElementById('appendDiv');

function nutritionTableRender (data){
  let nutrientsObj={}
  for(let keys in data.totalNutrients){
    nutrientsObj[keys]=Math.round(data.totalNutrients[keys].quantity/data.yield);
  }
  for(let keys in data.totalDaily){
    nutrientsObj[keys+'p']=Math.round(data.totalDaily[keys].quantity/data.yield)
  }
  let nutrientsArr =['FAMS', 'FAPU','FOLFD','WATER', 'ENERC_KCAL','FAT', 'FASAT', 'FATRN', 'CHOLE', 'NA', 'CHOCDF', 'FIBTG', 'SUGAR', 'PROCNT', 'VITD', 'CA', 'FE', 'K'];

 let additionalNutrients = Object.keys(data.totalNutrients).filter(key => !nutrientsArr.includes(key)).reduce((obj, key)=>{
   obj[key] = data.totalNutrients[key];
   return obj;
 }, {});

 if(nutrientsList.children.length>1){
  Array.from(nutrientsList.children).forEach(item=>item.remove());
}
if(prepInstructions.children.length>1){
  Array.from(prepInstructions.children).forEach(item=>item.remove());

}
 for(let keys in additionalNutrients){
  if(additionalNutrients[keys].quantity!==0){
  nutrientsList.innerHTML+=`
    <li>
  ${additionalNutrients[keys].label} : ${Math.round(additionalNutrients[keys].quantity/data.yield)} ${additionalNutrients[keys].unit} 
    </li>`
 }}

  Array.from(data.ingredientLines).forEach(item=>{
    prepInstructions.innerHTML+=`<li>${item}</li>`
    
 })
//  console.log(data);
// //  console.log(nutrientsObj)

//  //populate html in order from given array
//  const popNutTable = ['FAT', 'FASAT', 'FATRN', 'CHOLE', 'NA', 'CHOCDF', 'FIBTG', 'SUGAR', 'PROCNT', 'VITD', 'CA', 'FE', 'K'];
//  let currItem;
//  let currKey;
//  Array.from(nutritionColumn).forEach((item, i) =>{
//   currItem = popNutTable[i];
  
//   //let currData = data.totalNutrients.hasOwnProperty(currItem);
//   for(let keys in data.digest){
//     if(data.digest[keys].tag===currItem){
//       currKey = keys;
//     } else if (data.digest.sub[keys].tag===currItem){
// //       currKey = [sub][keys]
//     }
//   }
//  }
  
//   if(!item.classList.contains('text-right')) {
//     item.textContent= `${data.digest[currKey].label} ${Math.round(data.digest[currKey].quantity/data.yield)} ${data.digest[currKey].unit}`
//   }
// })
 
  servings.textContent=`Yields ${data.yield} servings`;
  servingSize.textContent=`${Math.round(data.totalWeight/data.yield)} grams`;
  calories.textContent=`${Math.round(data.calories/data.yield)}`;
  fatContent.textContent=`Total Fat ${nutrientsObj.FAT} g`;
  dailyFatPercentage.textContent=`${nutrientsObj.FATp} %`;
  saturatedFat.textContent=`Saturated Fat ${nutrientsObj.FASAT} g`;
  dailySFatPercentage.textContent=`${nutrientsObj.FASATp} %`;
  transFat.innerHTML=` <i>Trans</i> Fat ${nutrientsObj.FATRN} g`;
  cholesterol.textContent=`Cholesterol ${nutrientsObj.CHOLE} mg`;
  cholesterolPercentage.textContent=`${nutrientsObj.CHOLEp} %`;
  sodium.textContent=`Sodium ${nutrientsObj.NA} mg`;
  sodiumPercentage.textContent=`${nutrientsObj.NAp} %`;
  carbs.textContent=`Total Carbohydrate ${nutrientsObj.CHOCDF} g`;
  carbsPercentage.textContent=`${nutrientsObj.CHOCDFp} %`;
  fiber.textContent=`Dietary Fiber ${nutrientsObj.FIBTG} g`;
  fiberPercentage.textContent=`${nutrientsObj.FIBTGp} %`;
  totalSugar.textContent=`Total Sugars ${nutrientsObj.SUGAR} g`;
  protein.textContent=`Protein ${nutrientsObj.PROCNT} g`;
  // proteinPercentage.textContent=`${Math.round(data.totalDaily.PROCNT.quantity/data.yield)} %`;
  vitaminD.textContent=`Vitamin D ${nutrientsObj.VITD} mcg`;
  vitaminDPercentage.textContent=`${nutrientsObj.VITDp} %`;
  calcium.textContent=`Calcium ${nutrientsObj.CA} mg`;
  calciumPercentage.textContent=`${nutrientsObj.CAp} %`;
  iron.textContent=`Iron ${nutrientsObj.FE} mg`;
  ironPercentage.textContent=`${nutrientsObj.FEp} %`;
  potassium.textContent=`Potassium ${nutrientsObj.K} mg`;
  potassiumPercentage.textContent=`${nutrientsObj.Kp} %`;
  console.log(data.url)
 currentSite=data.url;
 
}


recipeSiteBtn.addEventListener('click', (e)=>{
  e.preventDefault;
  location.href=`${currentSite}`
})

/* ----------------------Add event listener to Form and for clicking on card------------------------------------------ */


formSubmit.addEventListener('submit', foodSearch);
searchRender.addEventListener('click', whichRecipe);



/* ----------------------hard coded for ease of coding (remove)------------------------------------------ */


const mediaQuery1= window.matchMedia("(max-width: 767px)");
const mediaQuery2 = window.matchMedia("(min-width:768px)");

const nonQuery = document.getElementById('nonQuery');

function mediaOperation(){
    removeCards();
    renderCard(currentData);
    if(mediaQuery1.matches){
      appendDiv.appendChild(ingredientsList);
    }else if(mediaQuery2.matches){
      nonQuery.appendChild(ingredientsList)
    }
};



// call function that calls create/delete cards. Either with variable input or localstorage
window.addEventListener("resize", mediaOperation);
//mediaQuery2.addEventListener("resize", mediaOperation());
//window.onresize=mediaOperation;



const countersElement = document.querySelectorAll(".counter");

countersElement.forEach((counterElement) => {
  counterElement.innerText = "0";
  incrementCounter();
  function incrementCounter() {
     let currentNum = +counterElement.innerText;
     const dataCeil = counterElement.getAttribute("data-ceil");
const increment  = dataCeil / 15;
currentNum =Math.ceil( currentNum + increment);

if(currentNum < dataCeil ){
  counterElement.innerText = currentNum;
  setTimeout(incrementCounter,50)
}else{
  counterElement.innerText = dataCeil;
}

  }
});

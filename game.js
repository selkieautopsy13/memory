const cardsColor=["red", "red", "green", "green",
 "blue", "blue", "brown", "brown",
  "yellow", "yellow", "gray", "gray",
   "cadetblue", "cadetblue", "violet",
    "violet", "lightgreen", "lightgreen"];

let cards=document.querySelectorAll("div");
cards=[...cards];//18 zamiana listy na tablice

const startTime=new Date().getTime();

let activeCard="";
const activeCards=[];

const gamePairs=cards.length/2;//9
let gameResult=0;




const clickCard=function(){
    activeCard=this;

    if(activeCard==activeCards[0]) return;
    
    activeCard.classList.remove("hidden");

    //czy to 1 klikniecie
    if(activeCards.length==0){
        activeCards[0] = activeCard;
        return;
    }

    //czy to 2 klikniecie
    else{
        cards.forEach(card=> card.removeEventListener("click",clickCard))
        activeCards[1]=activeCard;
        setTimeout(function(){
            if(activeCards[0].className==activeCards[1].className){
                console.log("wygrana");
                activeCards.forEach(card=>card.classList.add("off"));
                gameResult++;
                cards = cards.filter(card=>card.classList.contains("hidden"))
                if(gameResult==gamePairs){
                    const endTime=new Date().getTime();
                    const gameTime=(endTime-startTime)/1000;
                    alert(`Udało sie! Twój wynik to: ${gameTime}sekund`);
                    location.reload();
                }
            }
            else{
                console.log("przgrana");
                activeCards.forEach(card=>card.classList.add("hidden"));
            }
            activeCard="";
            activeCards.length=0;
            cards.forEach(card=>card.addEventListener("click",clickCard))

        },500);
       

    }
    
};

const init=function(){
    cards.forEach(card=>{
        const position=Math.floor(Math.random()*
        cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);
    });

    setTimeout(function(){
        cards.forEach(card=>{
            card.classList.add("hidden");
            card.addEventListener("click",clickCard);
        })
    },2000);

};

init();

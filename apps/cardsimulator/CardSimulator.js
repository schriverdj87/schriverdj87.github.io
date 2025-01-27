/*
TODO: 
- Have shuffle lay out cards properly.

*/
var btnGo;
var btnDraw;
var deck;
var table;
var controlbox;
var cheeseburger;
var templateCard = "<div class = 'card'>REPLACE</div>";
var startLocus = {"x": 15, "y":15};
var startLocusDisplace = 15;//Pixels to displace when the cards are layed out.
var startLocusDisplace4Layout = 25;//Pixels between cards when laying them out.
var styleBlock = "flex";
var styleNone = "none";
var flipTag = "[FLIP]";

var StartCardy = function()
{
    btnGo = document.getElementById("btnGo");
    btnGo.addEventListener("click",BtnGoFn);
    btnDraw = document.getElementById("btnDraw");
    table = document.getElementById("table");
    controlbox = document.getElementById("controlbox");
    cheeseburger = document.getElementById("cheeseburger");
    cheeseburger.onclick = ToggleControlBox;

    //Put Tutorial
    console.log("====Instructions====");
    console.log("Example (Copy and paste into text input and click \"Layout as Deck\"):");
    console.log("Money Or Bomb|BOMB![NL]You Loose!|3 Coins[FLIP]|1 Coin:12");
    console.log("");
    console.log("- The \"|\" separates the cards and the title (In the example: \"Money Or Bomb\" is the title followed by 2 kinds of cards)");
    console.log("- The text before the first \"|\" sets the title of the tab that card simulartor is in. (In the example \"Money or Bomb\" is the title)");
    console.log("- Use a \":\" to designate how many cards to add. No colon means one card (In the example: There is 1 \"BOMB![BR]You Lose!\", 1 3 Coin Cards, and 12 1 Coin cards)");
    console.log("- To create a line break use \"[NL]\" (In the example: \"BOMB!\" and \"You Lose!\" will be on separate lines)");
    
    //Need to fire this off once so it will work properly
    ToggleControlBox();
    




}

function NewCard (face)
{
    var toSend = document.createElement("div");
    toSend.classList.add("card","draggable");

    var toSendFront = document.createElement("div");
    toSendFront.classList.add("cardFront");
    toSendFront.innerHTML = "<span>" + face.replaceAll("[FLIP]","") + "</span>";
    toSendFront.onclick = FlipCard;

    var toSendBack = document.createElement("div");
    toSendBack.classList.add("cardBack");
    toSendBack.classList.add("bkg" + new Date().getMonth());
    toSendBack.onclick = FlipCard;
    /*
    var toSendBackInner = document.createElement("div");
    toSendBackInner.classList.add("cardBackInner");
    toSendBackInner.classList.add("bkg" + new Date().getMonth());
    toSendBack.appendChild(toSendBackInner);
    */
    toSend.appendChild(toSendBack);
    toSend.appendChild(toSendFront);
    StapleAsDraggable(toSend);

    //Flip it if it is marked to be flipped

    if (face.indexOf(flipTag) != -1)
    {
        toSendFront.style.display = styleBlock;
        toSendBack.style.display = styleNone; 
       
    }
    
  
    return toSend;
}

var ToggleControlBox = function()
{
    if(controlbox.style.display == "" || controlbox.style.display == "block")
    {
        controlbox.style.display = styleNone;
        
        
    }
    else
    {
        controlbox.style.display = "block";
        
    }
}

var BtnGoFn = function()
{
    ClearCards();
    document.getElementById("deckcontrol").style.display = "block";
    deck = NewDeck( document.getElementById("txtInput").value);
    deck = deck[Object.keys(deck)[0]];
    //set the title
    document.getElementsByTagName("title")[0].innerHTML = document.getElementById("txtInput").value.split("|")[0];
    UpdateCardCount();
}

var BtnDrawFn = function()
{
    var newText = DrawCard(deck,0);
    var newCard = NewCard(newText);
    newCard.style.left = startLocus.x + "px";
    newCard.style.top = startLocus.y + "px";
    table.appendChild(newCard);
    UpdateCardCount();
    return newCard;
}

var BtnDrawAll = function()
{   BtnGoFn();
    var displacement = 0;
    while (deck.length > 0)
    {
        var newText = DrawCard(deck,0);
        var newCard = NewCard(newText);
        newCard.style.left = startLocus.x + displacement + "px";
        newCard.style.top = startLocus.y + "px";
        table.appendChild(newCard);
        UpdateCardCount();
        displacement = displacement + startLocusDisplace;
    }
}

var BtnLayout = function()
{
    
    BtnGoFn();
    var firstCardRect = BtnDrawFn().getBoundingClientRect();
    var counter = 1;
    var counterY = 0; //When counter % rowSize 
    var rowSize = parseInt(document.getElementById("RowSize").value);

    while (deck.length > 0)
    {
       
        
        var newCard = BtnDrawFn();
        newCard.style.left = startLocus.x + counter * (firstCardRect.width + startLocusDisplace4Layout) + "px";
        newCard.style.top = startLocus.y + counterY * (firstCardRect.height + startLocusDisplace4Layout) + "px";

        counter = counter + 1; 
        if (counter == rowSize)
        {
            counter = 0;
            counterY = counterY + 1;
        }
    }
    
}

function ClearCards()
{
    var removeUs = document.getElementsByClassName("card");

    for (var a = removeUs.length - 1; a > -1; a--)
    {
        table.removeChild(removeUs[a]);
    }
}

function GetCards()
{
    return document.getElementsByClassName("card");
}

function UpdateCardCount ()
{
    document.getElementById("CardCount").innerHTML = deck.length;
}

var FlipCard = function()
{

    if (countermove == 0)
    {
        var theCell = this.parentElement;

        var back = theCell.getElementsByClassName("cardBack")[0];
        var front = theCell.getElementsByClassName("cardFront")[0];
        
        //Flips the card here
        if(back.style.display == "" || back.style.display == styleBlock)
        {
            back.style.display = styleNone;
            front.style.display = styleBlock;
            
        }
        else
        {
            back.style.display = styleBlock;
            front.style.display = styleNone;
        }
    }
}

var FlipThisCard = function(thiscard)
{

    if (countermove == 0)
    {
        var theCell = thiscard.parentElement;

        var back = theCell.getElementsByClassName("cardBack")[0];
        var front = theCell.getElementsByClassName("cardFront")[0];
        
        //Flips the card here
        if(back.style.display == "" || back.style.display == styleBlock)
        {
            back.style.display = styleNone;
            front.style.display = styleBlock;
            
        }
        else
        {
            back.style.display = styleBlock;
            front.style.display = styleNone;
        }
    }
}

//Shuffles the z index of the cards.
var ShuffleZ = function()
{
    var shuffleus = GetCards();
    var indexes = [];

    while (indexes.length < shuffleus.length)
    {
        indexes.push(indexes.length + 1);
    }

    indexes = ShuffleArray(indexes);

    for (var a = 0; a < shuffleus.length; a++)
    {
        shuffleus[a].style.zIndex = indexes[a];
    }

}
//Generic method for shuffling an array
var ShuffleArray = function (grindme)
{
    toEmpty = grindme;
    toSend = [];

    while (toEmpty.length > 0)
    { 
        var randex = Math.round(Math.random() * (toEmpty.length - 1));
        toSend.push(toEmpty[randex]);
        toEmpty.splice(randex,1);
    }
    

    return toSend;

}
/*
Returns the index of the first element that in ArrayToCheck that has a match in string to check
Example:
StringToCheck = "My name is boogers and ketchup"
ArrayToCheck = ["ladle","booger","freezer","Luba Goy"]

*/
function StringIndex (StringToCheck, ArrayToCheck)
{
    for (var a = 0; a < ArrayToCheck.length; a++)
    {
        var leIndex = StringToCheck.toLowerCase().indexOf(ArrayToCheck[a].toLowerCase());

        if (leIndex > -1)
        {
            return a;
        }
    }

    return -1;
}
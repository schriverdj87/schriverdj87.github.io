
/*
Yes, I lazily coded this using the program itself.

TODO:
- Make it pretty
- Add random fields
*/
var mainoutput
var divvariations
var maininput

var Rep1Core
var Rep1CoreLast;
var Rep2Core
var Rep2CoreLast;
var Rep3Core
var Rep3CoreLast;
var Rep4Core
var Rep4CoreLast;
var Rep5Core
var Rep5CoreLast;
var Rep6Core
var Rep6CoreLast;
var Rep7Core
var Rep7CoreLast;
var Rep8Core
var Rep8CoreLast;
var Rep9Core
var Rep9CoreLast;
var Rep10Core
var Rep10CoreLast;

var lastInput = "";

var patRep1 = "[REP1]";
var patRep2 = "[REP2]";
var patRep3 = "[REP3]";
var patRep4 = "[REP4]";
var patRep5 = "[REP5]";
var patRep6 = "[REP6]";
var patRep7 = "[REP7]";
var patRep8 = "[REP8]";
var patRep9 = "[REP9]";
var patRep10 = "[REP10]";
var patComma = ""



var comRep = "<div id = 'Rep{0}'><label>Rep{0}</label><textarea id = 'Rep{0}Core'></textarea></div>";

var Start = function()
{
    
    
    //Get the things
    maininput = document.getElementById("maininput");
    mainoutput = document.getElementById("mainoutput");
    divvariations = document.getElementById("divvariations");
    
    Rep1Core = document.getElementById("Rep1Core");
    Rep1CoreLast = Rep1Core.value;
    Rep2Core = document.getElementById("Rep2Core");
    Rep2CoreLast = Rep2Core.value;
    Rep3Core = document.getElementById("Rep3Core");
    Rep3CoreLast = Rep3Core.value;
    Rep4Core = document.getElementById("Rep4Core");
    Rep4CoreLast = Rep4Core.value;
    Rep5Core = document.getElementById("Rep5Core");
    Rep5CoreLast = Rep5Core.value;
    Rep6Core = document.getElementById("Rep6Core");
    Rep6CoreLast = Rep6Core.value;
    Rep7Core = document.getElementById("Rep7Core");
    Rep7CoreLast = Rep7Core.value;
    Rep8Core = document.getElementById("Rep8Core");
    Rep8CoreLast = Rep8Core.value;
    Rep9Core = document.getElementById("Rep9Core");
    Rep9CoreLast = Rep9Core.value;
    Rep10Core = document.getElementById("Rep10Core");
    Rep10CoreLast = Rep10Core.value;

    CorrectOutputSize();

    //Staple the listener to it
    setInterval(motor,33);
}

function CorrectOutputSize()
{
    var mainoutputParentWidth = mainoutput.parentElement.getBoundingClientRect()["width"];
    
    var mainoutputWidth = mainoutput.getBoundingClientRect()["width"];
   
    console.log(mainoutputParentWidth);
    console.log(mainoutputWidth);

   
    //mainoutput.style.width = mainoutputParentWidth * 0.9 + "px";

}

function motor()
{
    motorUpdateOutput();
}

function motorUpdateOutput()
{
    if (InputChanged())
    {
        mainoutput.innerHTML = MainOutput();
        HideIrrelavent();
  //      var toPut = maininput.value.replaceAll("<","&lt").replaceAll(">","&gt");

//        mainoutput.innerHTML = toPut;

        //Do the replace
        //TODO make escape character for poop


        
    }
}

function HideIrrelavent()
{
    Rep1Core.parentElement.style.display = maininput.value.indexOf(patRep1) != -1 ? "block":"none";
    Rep2Core.parentElement.style.display = maininput.value.indexOf(patRep2) != -1 ? "block":"none";
    Rep3Core.parentElement.style.display = maininput.value.indexOf(patRep3) != -1 ? "block":"none";
    Rep4Core.parentElement.style.display = maininput.value.indexOf(patRep4) != -1 ? "block":"none";
    Rep5Core.parentElement.style.display = maininput.value.indexOf(patRep5) != -1 ? "block":"none";
    Rep6Core.parentElement.style.display = maininput.value.indexOf(patRep6) != -1 ? "block":"none";
    Rep7Core.parentElement.style.display = maininput.value.indexOf(patRep7) != -1 ? "block":"none";
    Rep8Core.parentElement.style.display = maininput.value.indexOf(patRep8) != -1 ? "block":"none";
    Rep9Core.parentElement.style.display = maininput.value.indexOf(patRep9) != -1 ? "block":"none";
    Rep10Core.parentElement.style.display = maininput.value.indexOf(patRep10) != -1 ? "block":"none";
}

function MainOutput()
{
    var toSend = "";

    var Rep1Split = Rep1Core.value.split(",");
    var Rep2Split = Rep2Core.value.split(",");
    var Rep3Split = Rep3Core.value.split(",");
    var Rep4Split = Rep4Core.value.split(",");
    var Rep5Split = Rep5Core.value.split(",");
    var Rep6Split = Rep6Core.value.split(",");
    var Rep7Split = Rep7Core.value.split(",");
    var Rep8Split = Rep8Core.value.split(",");
    var Rep9Split = Rep9Core.value.split(",");
    var Rep10Split = Rep10Core.value.split(",");
    var mainTemplate = maininput.value;
    var longestLength = LengthOfLongest([Rep1Split,Rep2Split,Rep3Split,Rep4Split,Rep5Split,Rep6Split,Rep7Split,Rep8Split,Rep9Split,Rep10Split]);
    

    for (var a = 0; a < longestLength; a++)
    {
        var toPut = mainTemplate;
        toPut =  toPut.replaceAll(patRep1,ArySafeGet(Rep1Split,a));
        toPut =  toPut.replaceAll(patRep2,ArySafeGet(Rep2Split,a));
        toPut =  toPut.replaceAll(patRep3,ArySafeGet(Rep3Split,a));
        toPut =  toPut.replaceAll(patRep4,ArySafeGet(Rep4Split,a));
        toPut =  toPut.replaceAll(patRep5,ArySafeGet(Rep5Split,a));
        toPut =  toPut.replaceAll(patRep6,ArySafeGet(Rep6Split,a));
        toPut =  toPut.replaceAll(patRep7,ArySafeGet(Rep7Split,a));
        toPut =  toPut.replaceAll(patRep8,ArySafeGet(Rep8Split,a));
        toPut =  toPut.replaceAll(patRep9,ArySafeGet(Rep9Split,a));
        toPut =  toPut.replaceAll(patRep10,ArySafeGet(Rep10Split,a));


        toSend = toSend + toPut;
    }
    
    

    return CleanString(toSend);
}



function CleanString(toClean)
{
    
    if (toClean == undefined) {return ""}
    return toClean.replaceAll("<","&lt").replaceAll(">","&gt");
}

//true if any input changed
function InputChanged()
{
    toSend = false;

    if (lastInput != maininput.value)
    {
        toSend = true;
    }
    else if (Rep1CoreLast != Rep1Core.value)
    {
        toSend = true;
    }
    else if (Rep2CoreLast != Rep2Core.value)
    {
        toSend = true;
    }    
    else if (Rep3CoreLast != Rep3Core.value)
    {
        toSend = true;
    }    
    else if (Rep4CoreLast != Rep4Core.value)
    {
        toSend = true;
    }    
    else if (Rep5CoreLast != Rep5Core.value)
    {
        toSend = true;
    }    
    else if (Rep6CoreLast != Rep6Core.value)
    {
        toSend = true;
    }    
    else if (Rep7CoreLast != Rep7Core.value)
    {
        toSend = true;
    }    
    else if (Rep8CoreLast != Rep8Core.value)
    {
        toSend = true;
    }    
    else if (Rep9CoreLast != Rep9Core.value)
    {
        toSend = true;
    }    
    else if (Rep10CoreLast != Rep10Core.value)
    {
        toSend = true;
    }


    Rep1CoreLast = Rep1Core.value
    Rep2CoreLast = Rep2Core.value
    Rep3CoreLast = Rep3Core.value
    Rep4CoreLast = Rep4Core.value
    Rep5CoreLast = Rep5Core.value
    Rep6CoreLast = Rep6Core.value
    Rep7CoreLast = Rep7Core.value
    Rep8CoreLast = Rep8Core.value
    Rep9CoreLast = Rep9Core.value
    Rep10CoreLast = Rep10Core.value

    lastInput = maininput.value;
    //Update Values
    return toSend;
}

//Returns the length of the longest array
function LengthOfLongest(aryArys)
{
    var toSend = -1;

    for (var a = 0; a < aryArys.length; a++)
    {
        if (aryArys[a] == undefined || Array.isArray(aryArys[a]) == false){continue;}

        if (aryArys[a].length > toSend)
        {
            toSend = aryArys[a].length;
        }
    }

    return toSend;
}

//Returns an element in the array no matter what
function ArySafeGet(ary,index)
{
    if (ary.length == 0){return "";}
    //Ensures that it is 
    var goodIndex = Math.max(0,index);

    goodIndex = Math.min(ary.length - 1,goodIndex);

    return ary[goodIndex];



}



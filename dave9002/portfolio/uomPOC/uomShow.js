
//The h1 element
var h1Title = document.getElementById("h1Title");

//The Page title
var title = document.getElementById("title");

//UOM Type name
var lblUOMTypeName = document.getElementById("lblUOMTypeName");

//System Of Units Name
var lblSOUName = document.getElementById("lblSOUName");

//Label that says [UOM] is...
var lblUOMNameIs = document.getElementById("lblUOMNameIs");

//The input="number" that multiplies the results in the list
var nudUnits = document.getElementById("nudUnits");

//Container for UOM list.
var RepeaterUOMs = document.getElementById("RepeaterUOMs");

//Current UOM
var featuredUOM;

//No results message
var noresults = document.getElementById("noresults");

//Main Container
var containerSmaller = document.getElementsByClassName("containerSmaller")[0];

window.onload = function () {

   
    loadData(init);
    
}

var init = function () {

   
    //Get the parameters from the URL
    var parms = extractParmsFromURL(window.location.href);

    //If there is no id then navigate back to the title 
    if (parms.id == undefined) {
        location.href = ("index.html");
    }

    var id = parseInt(parms.id);
    var multiplier = parseInt(parms.multi);


    //Ig multiplier is defined set the value
    if (parms.multi != undefined && multiplier != NaN) {
        nudUnits.value = multiplier;
    }
    //Replacing ids with actual names
    processedUOMs = replaceIdWithName("uOMTypeId", UOMs, "id", "shortDescription", UOMTypes);
    processedUOMs = replaceIdWithName("systemOfUnitsId", processedUOMs, "id", "shortDescription", SOUs)

    //Set featured UOM
    featuredUOM = getFromJSONBy("id", id, processedUOMs);


    //Display information
    title.innerHTML = featuredUOM.shortDescription;
    h1Title.innerHTML = featuredUOM.shortDescription;
    lblUOMTypeName.innerHTML = featuredUOM.uOMTypeId;
    lblSOUName.innerHTML = featuredUOM.systemOfUnitsId;
    lblUOMNameIs.innerHTML = featuredUOM.shortDescription + "&nbsp;is..."

    //Wire the nud units
    nudUnits.onchange = updateList;

    updateList();

}



/**
 * Updates the UOMs and tells you how many of the top UOM they are
 */
var updateList = function () {


    //Value of the numeric updown
    var multiplier = parseInt(nudUnits.value);

    //How many of the smallest units it is
    var featuredAmount = parseFloat(featuredUOM.amtInSmallestUnit);

    //Remove the featured UOM from compared UOMs
    var ComparedUOMs = omitJSONBy("id", featuredUOM.id, UOMs);

    //Remove the UOMs that aren't the same UOMType as the featured;
    var ComparedUOMs = filterJSONBy("uOMTypeId", featuredUOM.uOMTypeId, ComparedUOMs);

    //If there are no uoms display a message
    if (ComparedUOMs.length == 0)
    {
        noresults.style = "display:block";
        
    }
    else
    {
        noresults.style = "display:none";
    }

    //Actual list.
    var ListToPut = "";

    //Template that contains a the number of featured UOMs each UOM is equal to and a button for each UOM 
    var templateUOMList = "<div class = 'divUOMList'> <label  class = 'labelLeft'>LENUMBER</label> <a href='uomShow.html?id=UOMID&multi=LEMULTI'><button>shortDescription</button></a> </div>";

    //Loop through each UOM
    for (var a = 0; a < ComparedUOMs.length; a++) {

        var currentCompareUOM = ComparedUOMs[a];

        //How many of the smallest units it is
        var compareAmount = parseFloat(currentCompareUOM.amtInSmallestUnit);

        //The featured UOM over the current uom times the multiplier.
        var calced = (featuredAmount / compareAmount) * multiplier;
        
        //If the number has over 10 digits to it then shorten it.d
        if ((calced+"").length > 10)
        {
            calced = calced.toFixed(9);
        }

        //Set the template
        var toPut = templateUOMList.replace("LENUMBER", calced).replace('UOMID', currentCompareUOM.id).replace('shortDescription', currentCompareUOM.shortDescription).replace('LEMULTI', multiplier);

        //Add the new UOM to the list
        ListToPut = ListToPut + toPut;
    }

    //Put the UOMs into the container.
    RepeaterUOMs.innerHTML = ListToPut;


}
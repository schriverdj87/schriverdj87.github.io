
//Globally accessed JSON objects
var UOMs;
var UOMTypes;
var SOUs;

//Locations of the JSONS
var UOMsLocus = "dummyUOM.json";
var UOMTypesLocus = "dummyUOMType.json";
var SOULocus = "dummySystemOfUnits.json";

//Object for storing the JSONS as they are loaded
var relayUOMs = {};
var finalFunction;

//How any JSONs to load
var JSONsToLoad = 3;



function loadData(OnFinished) {

    finalFunction = OnFinished;

    //Hide what needs to be hidden
    try
    {
        document.getElementById("whenloaded").style.display = "none";
    }
    catch (err)
    {
       console.log(err);
    }

    try{
    //Load UOMs
    var requestUOMs = new XMLHttpRequest();
    requestUOMs.onreadystatechange = rsc;
    requestUOMs.onloadend = loadend;
    requestUOMs.open("GET", UOMsLocus, true);
    requestUOMs.send();
    }
    catch (err)
    {
        Console.log("Could not load UOMS");
        Console.log(err);
    }

    try{
    //Load UOMTypes
    var requestUOMTypes = new XMLHttpRequest();
    requestUOMTypes.onreadystatechange = rsc;
    requestUOMTypes.onloadend = loadend;
    requestUOMTypes.open("GET", UOMTypesLocus, true);
    requestUOMTypes.send();
    }
    catch (err)
    {
        Console.log("Could not load UOMTypes");
        Console.log(err);
    }

    try{
    //Load Systems OF Units
    var requestSOU = new XMLHttpRequest();
    requestSOU.onreadystatechange = rsc;
    requestSOU.onloadend = loadend;
    requestSOU.open("GET", SOULocus, true);
    requestSOU.send();
    }
    catch (err)
    {
        Console.log("Could not load Systems OF Units");
        Console.log(err);
    }

}
/**
 * Used on ready state change
 */
var rsc = function () {
    if (this.readyState == this.DONE && this.status == 200) {

        //Get the JSON Object
        var toPut = JSON.parse(this.responseText);

        //Get the file name for a key.
        var key = this.responseURL.split("/");
        key = key[key.length - 1];

        //Put the JSON object in the list, keyed to it's file name.
        relayUOMs[key] = toPut;

    }
}

var loadend = function () {


    if (Object.keys(relayUOMs).length == JSONsToLoad) {
        //If all are loaded then load getJSONs' finisher and the function specified
        allDone();
        finalFunction();
    }
}

var allDone = function () {
    //Set global JSONs
    UOMs = relayUOMs[UOMsLocus];
    UOMTypes = relayUOMs[UOMTypesLocus];
    SOUs = relayUOMs[SOULocus];

    //Make visible what needs to made visible and invisible what needs to be invisible
    try
    {
        document.getElementById("ImgLoad").style.display = "none";
        document.getElementById("whenloaded").style.display = "block";
    }
    catch (err)
    {
       console.log(err);
    }
}







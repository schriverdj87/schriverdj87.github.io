
//Globally accessed JSON objects
var UOMs;
var UOMTypes;
var SOUs;



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

    UOMs = uom;
    UOMTypes = uomtype;
    SOUs = sou;

    finalFunction();
    allDone();

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







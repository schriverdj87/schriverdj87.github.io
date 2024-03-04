//Templates

//For filling the select.
var templateOption = "<option value = 'LEVALUE'>LENAME</option>";

//For the button of each UOM
var templateUOM = "<a href='uomShow.html?id=UOMID'><button>shortDescription</button></a>";

//Document elements

//Drop down list for UOMTypes
var ddlUOMTypes = document.getElementById("ddlUOMTypes");

//Container for UOM buttons
var RepeaterUOMs = document.getElementById("RepeaterUOMs");

//Displayed when there are no results
var noresults = document.getElementById("noresults");

var container = document.getElementsByClassName("container")[0];

window.onload = function () {

    
    loadData(init);
    
}

var init = function () {
    

    //Populate and add function to ddlUOMTypes
    var uomTypesOptions = convertToRepeater(UOMTypes, templateOption, ["LEVALUE", "LENAME"], ["id", "shortDescription"]);
    ddlUOMTypes.innerHTML += uomTypesOptions;
    ddlUOMTypes.onchange = function () {
        reloadList(ddlUOMTypes.value);
    }

    reloadList(0);

}

/**
 * Populates the UOMs
 * @param {int} id 
 */
var reloadList = function (id) {
    var rawList = UOMs;

    //If the id is not zero, then filter that id
    if (id != 0) {
        rawList = filterJSONBy("uOMTypeId", id, UOMs);

       

       
    }
    if (rawList.length == 0)
    {
        noresults.style = "display:block";
    }
    else
    {
        noresults.style = "display:none";
    }
   

    var uomList = convertToRepeater(rawList, templateUOM, ["UOMID", "shortDescription"], ["id", "shortDescription"]);

    RepeaterUOMs.innerHTML = uomList;
}
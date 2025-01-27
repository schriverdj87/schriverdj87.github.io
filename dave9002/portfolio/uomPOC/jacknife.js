"use strict";
/*---This is a series of static methods for handling object.---*/

/**
 * Retrieves the first Object that matches the column and value given.
 * @param {String} column 
 * @param {*} value 
 * @param {Array} JSON 
 */
function getFromJSONBy(column,value,JSON)
{
    for (var a = 0; a < JSON.length; a++)
    {
        if (JSON[a][column] == value)
        {
            return JSON[a];
        }
    }

    return -1;
}

/**
 * Excludes all objects that don't match the column and value given.
 * @param {String} column 
 * @param {*} value 
 * @param {Array} JSON 
 */
function filterJSONBy (column,value, JSON)
{
    var filteredJSON = [];

    for (var a = 0; a < JSON.length; a++)
    {
        if (JSON[a][column] == value)
        {
            filteredJSON.push(JSON[a]);
        }
    }

    return filteredJSON;

}

/**
 * Excludes all objects that match the column and value given.
 * @param {String} column 
 * @param {*} value 
 * @param {Array} JSON 
 */
function omitJSONBy(column,value,JSON)
{
    var filteredJSON = [];

    for (var a = 0; a < JSON.length; a++)
    {
        if (JSON[a][column] != value)
        {
            filteredJSON.push(JSON[a]);
        }
    }

    return filteredJSON;

}

/**
 * Replaces the value of one column with the value of another column in another table.
 * @param {String} column 
 * @param {Array} JSON 
 * @param {*} replacerColumnId 
 * @param {*} replacerColumn 
 * @param {Array} replacerJSON 
 */
function replaceIdWithName(column, JSON, replacerColumnId, replacerColumn,replacerJSON)
{
    //column: The column that needs to be changed
    //JSON: Original JSON (eg, UOMType)
    //replacerColumnId (uOMTypeId)
    //replacerColumn: JSON to replace
    //replacerJSON: (eg, id)

    var replacedJSON = JSON;

    for (var a = 0; a < JSON.length; a++)
    {
        var leValue = JSON[a][column];
        var newName = getFromJSONBy(replacerColumnId,leValue,replacerJSON)[replacerColumn];
        replacedJSON[a][column] = newName;

    }

    return replacedJSON;
}

/**
 * For creating elements based on a series of objects
 * @param {Array} JSON 
 * @param {String} Template 
 * @param {Array} ReplaceInTemplate 
 * @param {Array} WithinJSON 
 */
function convertToRepeater(JSON, Template, ReplaceInTemplate, WithinJSON)
{
    /*
    JSON = Raw data,
    Template = String - Base element with string to replace
    ReplaceInTemplate = [] - Word in template to replace
    WithinJSON = [] - Column within each json (NEEDS TO BE THE SAME LENGTH AS REPLACE IN TEMPLATE)
    */

    var toSend = "";

    if (ReplaceInTemplate.length != WithinJSON.length)
    {
        console.log("ReplaceInTemplate and WithinJSON must be the same length!")
        return toSend;
    }

    //Iterate through each object in JSON
    for (var a = 0; a < JSON.length; a++)
    {
        var toAdd = Template;

        
        for (var b = 0; b < ReplaceInTemplate.length; b++)
        {
            toAdd = toAdd.replace(ReplaceInTemplate[b],JSON[a][WithinJSON[b]]);
        }
        

        toSend = toSend + toAdd;
    }

    return toSend;
}

/**
 * Gets the GET parameters from a string (ideally, from a URL);
 * @param {String} FromThis 
 */
function extractParmsFromURL(FromThis)
{
    var toSend = {};

    if (FromThis.indexOf('?') == -1)
    {
        console.log("There are no parameters in that URL.");
        return toSend;
    }

    var rawParms = FromThis.split('?')[1].split('&');

    for (var a = 0; a < rawParms.length; a++)
    {
        var parm = rawParms[a].split('=');

        toSend[parm[0]] = parm[1];
    }

    return toSend;
}

/*EXAMPLES */
//console.log(extractParmsFromURL("google.ca?id=1&word=pancake"));
//console.log(window.location.href);
//console.log(getFromJSONBy("id",3,UOMs))
//console.log(filterJSONBy("uOMTypeId",3,UOMs));
//console.log(replaceIdWithName("uOMTypeId",UOMs,"id","shortDescription",UOMTypes));

//console.log(convertToRepeater(UOMTypes, "<option value = 'LEVALUE'>LENAME</option>",["LEVALUE","LENAME"],["id","shortDescription"]));
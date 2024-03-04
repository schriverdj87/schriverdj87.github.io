
//Drop down list of UOMTypes
var ddlUOMTypes = document.getElementById("ddlUOMTypes");

//Core table element
var table = document.getElementById("uomGridCore");
var uomGridTop = document.getElementById("uomGridTop");
var uomGridSide = document.getElementById("uomGridSide");
//The corner of the grid.
var cornerTH;
//A floating corner for cosmetic purposes
var uomCorner = document.getElementById("uomCorner");


//Template for each UOMType option;
var templateOption = "<option value = 'LEVALUE'>LENAME</option>";

//Template for each regular cell in the table;
var templateTd = "<td>1&nbspUOMx&nbsp;is<br> <span class = 'compareNumber'>NUMCOMPARE</span>&nbsp;UOMy</td>";

//Container for grid
var scrollGrid = document.getElementById("scrollGrid");
var uoms;

var noresults = document.getElementById("noresults");

//Main Container
var container = document.getElementsByClassName("container")[0];

window.onload = function () {

    
    loadData(init);
    
}

var init = function()
{
   
    //Get a list of UOM types
    var uomTypeList = convertToRepeater(UOMTypes, templateOption, ["LEVALUE", "LENAME"], ["id", "shortDescription"]);

    //Put it into the ddl
    ddlUOMTypes.innerHTML = uomTypeList;

    //Set up the changer
    ddlUOMTypes.onchange = function () {
        //Filter UOMs by the selected UOM typeId;
        uoms = filterJSONBy("uOMTypeId", ddlUOMTypes.value, UOMs);
        //Set up the grid
        populateGrid();

    }


    window.onresize = window.onscroll = function()
    {
      

        if (cornerTH.getBoundingClientRect().bottom < cornerTH.getBoundingClientRect().height * 0.75)
        {
            uomGridTop.style.display = "block";
           
       
            //The location of the top of the scrollGrid
            var scrollGridBox = scrollGrid.getBoundingClientRect();

            //Move the grid top and corner
            uomGridTop.style.top =  (-scrollGridBox.top - 5) + "px";
            uomCorner.style.top = (uomGridTop.offsetTop) + "px";
           

        }
        else
        {
            //Move the grid top and corner
            uomGridTop.style.top = cornerTH.getBoundingClientRect().height + "px";
            uomCorner.style.top = (uomGridTop.offsetTop) + "px";
        }
    }

    
    
    uoms = filterJSONBy("uOMTypeId", ddlUOMTypes.value, UOMs);

    populateGrid();
    uomGridTop.style.top = cornerTH.getBoundingClientRect().height + "px";
    uomCorner.style.top = (uomGridTop.offsetTop) + "px";

    //Launch the method once
    window.onresize();
}



function populateGrid() {

    //The string that will be set into the core table's contents
    var tableContents = "<tr><th id = 'cornerTH'></th>";


    //Create Headder and side
    var side = [];
    var sideRaw = [];

    

    //Iterate through UOMs and create headers
    for (var a = 0; a < uoms.length; a++) {
        var thToPut = "<th>" + uoms[a].shortDescription + "</th>";
        var rawToPut = uoms[a].shortDescription;
        tableContents = tableContents + thToPut;
        side.push(thToPut);
        sideRaw.push(rawToPut);
    }

    //Fill top and side
    uomGridSide.innerHTML = "<tr><th></th></tr>";
    var topToPut = "<tr><th>";
  
    for (var b = 0; b < side.length; b++)
    {
        uomGridSide.innerHTML = uomGridSide.innerHTML + "<tr>" + side[b] + "</tr>";
        topToPut += ( "<th>"  + sideRaw[b] + "</th>" );    
    }

    topToPut += "</th></tr>";


    uomGridTop.innerHTML =  topToPut;

    //uomGridTop.innerHTML = "<tr>"+"<th>a</th>"+"<th>a</th>"+"<th>a</th>"+"</tr>";

    //Cap off the created row;
    tableContents = tableContents + "</tr>";

    //Loop through and compare each UOM with each UOM
    for (var x = 0; x < uoms.length; x++) {
        //New Row to add plus side - header;
        //Also add an adjusting class to the side
        var rowToPut = "<tr>" + side[x].replace("<th>","<th class = 'uomGridSide'>");

        //Compare 2 uoms here
        for (var y = 0; y < uoms.length; y++) {
            //Each smallest amount
            var ASUx = uoms[x].amtInSmallestUnit;
            var ASUy = uoms[y].amtInSmallestUnit;

            //Each short description
            var UOMx = uoms[x].shortDescription;
            var UOMy = uoms[y].shortDescription;

            //Get the central number
            var compareNo = ASUx / ASUy;

            //Create the cell based on the template.
            var tdToPut = templateTd.replace("UOMx", UOMx).replace("UOMy", UOMy).replace("NUMCOMPARE", compareNo);

            //If a UOM is compared to itself make it green.
            if (compareNo == 1) {
                tdToPut = tdToPut.replace("<td>", "<td style = 'color:green'>");
            }

            //Add it to the row
            rowToPut = rowToPut + tdToPut;

        }

        //Cap off the row;
        rowToPut = rowToPut + "</tr>";

        //Add the new row
        tableContents = tableContents + rowToPut;

        
    }

    //Put the contents
    table.innerHTML = tableContents;
    cornerTH = document.getElementById("cornerTH");

    //Show and hide no-results message
    if (uoms.length == 0)
    {
        noresults.style = "display:block";
        scrollGrid.style = "display:none";
    }
    else
    {
        noresults.style = "display:none";
        scrollGrid.style = "display:block";
    }
}


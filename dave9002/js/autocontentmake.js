
var autotoolmakeTemplate = '<div class = "toolitem fullishwidth"> <div class = "toolitemimg" style = "background-image: url(\'{0}\')">&nbsp;</div> <h2> <a class = "mylinks" href = \'{1}\'>{2}</a> </h2> <p>{3}</p></div>';
var autotoolmake = 
[
    ['img/previewSandwich.png','tools/templatesandwich.html','Template Sandwich','A little difficult to explain, but it makes writing repetitive text easier.']
    ,['img/previewflex.png','tools/FlexSampler/flexSampler.html','Flex Sampler','Allows visualization of css\' flexbox functionality making it easier to work with. Was used in the process of making this website.']
]
var autotoolmakeTargetElement = "toolist";//Targets the element by id to dump the output in
/*
{0} Preview image
{1} Link to the tool
{2} Title 
{3} Description
*/
var AutoContentMake = function()
{
    
    var toSend = "";
    
    for (var a = 0; a < autotoolmake.length; a++)
    {
        var toPut = autotoolmakeTemplate;
        var currentautotoolmake = autotoolmake[a];

        for (var b = 0; b < currentautotoolmake.length; b++)
        {
            toPut = toPut.replaceAll("{" + b + "}",currentautotoolmake[b]);
        }

        toSend = toSend + toPut;
        
    }

    document.getElementById(autotoolmakeTargetElement).innerHTML = toSend;
}


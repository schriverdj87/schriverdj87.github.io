/*
Author: David Joseph Schriver 15 - 06 - 2020
//lescopebox= container where the elements go
//fliph = mirror horizontally
//flipv = mirror vertically
//fliphv = mirror vertically and horizontally
//flip4 = mirrors all 3
//noflip = do not flip the object upon mirroring
//orbit = creates a circle of this element (must have attributes : steps, radius, offset)
//swirl = creats a spiral of this eleement (must have attributes : steps, laps radiusstart, radiusend, offset, reverse)
//random = sprinkles it all over the container


Orbit Attributes
=================
steps: How many elements to makeOrbit
radius: how far from the center each element is here
offset: angle offset

Swirl Attributes
=================
radiusstart = How far from the center the swirl starts;
radiusend = How far from the center the swirl ends;
laps = How many times the swirl goes around
offset = Angle the swirl starts at (in degrees)
reverse = A boolean value determining whether or not to reverse the swirl

Random Attributes
=================
steps = how many to put in the container.

*/


var launchLescope = function()
{
	var movitelements = document.getElementsByClassName("lescopebox");
	
	
	for (var a = 0; a < movitelements.length; a++)
	{
		//Get a single box
		var currentBox = movitelements[a];
		var currentBoxWidth = (currentBox.getBoundingClientRect().width);
		var currentBoxHeight = (currentBox.getBoundingClientRect().height);
		//Get elements
		//secureArray, which duplicates the contents of an array into another array, needs to be used because the raw getElementsByClassName will increase as you clone things
		
		var hFlippies = secureArray(currentBox.getElementsByClassName("fliph"));

		var vFlippies = secureArray(currentBox.getElementsByClassName("flipv"));
		
		var hvFlippies = secureArray(currentBox.getElementsByClassName("fliphv"));
		
		var fourFlippies = secureArray(currentBox.getElementsByClassName("flip4"));
		
		var orbits = secureArray(currentBox.getElementsByClassName("orbit"));
		
		var swirls = secureArray(currentBox.getElementsByClassName("swirl"));
		
		var randoms = secureArray(currentBox.getElementsByClassName("random"));
		
		//Flip the things
		hFlippy(hFlippies,currentBox);
		vFlippy(vFlippies,currentBox);
		hvFlippy(hvFlippies, currentBox);
		
		hFlippy(fourFlippies,currentBox);
		vFlippy(fourFlippies,currentBox);
		hvFlippy(fourFlippies,currentBox);
		
		orbitOfElements(orbits,currentBox);
		
		swirlOfElements(swirls,currentBox);
		
		randomizeElements(randoms,currentBox);
		
		
	}

	
	
}


var hFlippy = function(elements,inhere)
{
	
    var toSend = cloneThese(elements);
    
    for (var a = 0; a < toSend.length; a++)
    {
    	var subject = toSend[a];
        var subjectClass =  (subject.attributes.class.value).split(" ");
		if (subjectClass.indexOf("noflip") == -1)
				{
					subject.style.transform = "scaleX(-1)";
				}
				
        if (subject.style.left == "" || subject.style.right == "")
        {
        	
            if (subject.style.left != "")
            {
            	subject.style.right = subject.style.left;
				
                subject.style.removeProperty('left');
            }
            
            else if (subject.style.right != "")
            {
            	subject.style.left = subject.style.right;
				//subject.style.transform = "scaleX(-1)";
                subject.style.removeProperty('right');
            }
            
            inhere.appendChild(subject);
        }
        
    }
    
    
	    
}


var vFlippy = function(elements,inhere)
{
	
    var toSend = cloneThese(elements);
    
    for (var a = 0; a < toSend.length; a++)
    {
    	var subject = toSend[a];
        var subjectClass =  (subject.attributes.class.value).split(" ");
		if (subjectClass.indexOf("noflip") == -1)
				{
					subject.style.transform = "scaleY(-1)";
				}
        
        if (subject.style.top == "" || subject.style.bottom == "")
        {
        	
            if (subject.style.top != "")
            {
            	subject.style.bottom = subject.style.top;
				
				
				//subject.style.transform = "scaleY(-1)";
                subject.style.removeProperty('top');
            }
            
            else if (subject.style.bottom != "")
            {
            	subject.style.top = subject.style.bottom;
				//subject.style.transform = "scaleY(-1)";
                subject.style.removeProperty('bottom');
            }
            
            inhere.appendChild(subject);
        }
        
    }
    	    
}

var hvFlippy = function(elements,inhere)
{
	
    var toSend = cloneThese(elements);
    
    for (var a = 0; a < toSend.length; a++)
    {
    	var subject = toSend[a];
        var subjectClass =  (subject.attributes.class.value).split(" ");
		if (subjectClass.indexOf("noflip") == -1)
				{
					subject.style.transform = "scale(-1,-1)";
				}
				
        if (subject.style.left == "" || subject.style.right == "")
        {
        	
            if (subject.style.left != "")
            {
            	subject.style.right = subject.style.left;
				
                subject.style.removeProperty('left');
            }
            
            else if (subject.style.right != "")
            {
            	subject.style.left = subject.style.right;
				
                subject.style.removeProperty('right');
            }
            
            inhere.appendChild(subject);
        }
		
		 if (subject.style.top == "" || subject.style.bottom == "")
        {
        	
            if (subject.style.top != "")
            {
            	subject.style.bottom = subject.style.top;
				//subject.style.transform = "scaleY(-1)";
                subject.style.removeProperty('top');
            }
            
            else if (subject.style.bottom != "")
            {
            	subject.style.top = subject.style.bottom;
				//subject.style.transform = "scaleY(-1)";
                subject.style.removeProperty('bottom');
            }
            
            inhere.appendChild(subject);
        }
        
    }
    
    
	    
}

function orbitOfElements(elements,inHere)
{
	var axisX = parseInt(inHere.getBoundingClientRect().width/2);
	var axisY = parseInt(inHere.getBoundingClientRect().height/2);
	var axisXRight = -1;
	var axisYBottom = -1;
	
	for (var a = 0; a < elements.length; a++)
	{
		//Check if positioning is applied
		if (elements[a].style.top != "")
		{
			axisY = parseInt(elements[a].style.top);
		}
		
		if (elements[a].style.left != "")
		{
			axisX = parseInt(elements[a].style.left);
		}
		
		
		if (elements[a].style.bottom != "")
		{
			axisYBottom = parseInt(elements[a].style.bottom);
		}
		
		if (elements[a].style.right != "")
		{
			axisXRight = parseInt(elements[a].style.right);
		}
		
		//Get attributes and set defaults;
		
		var defaultSteps = 10;
		var defaultRadius = 100;
		var defaultOffset = 0;
		
		
		
		
		var steps = parseInt(extractCustomAttribute(elements[a],"steps"));
		if (steps + "" == "NaN")
		{
			steps = defaultSteps;
		}
		var stepSize = (Math.PI * 2)/steps;
		
		var radius = parseInt(extractCustomAttribute(elements[a],"radius"));
		if (radius + "" == "NaN")
		{
			radius = defaultRadius;
		}
		
		var offset = parseFloat(extractCustomAttribute(elements[a],"offset")) * Math.PI/180;
		if (offset + "" == "NaN")
		{
			offset = defaultOffset;
		}
		
		var points = makeOrbit(steps,radius,offset);
		
		var clones = [];
		
		while (clones.length < steps)
		{
			var clone = elements[a].cloneNode();
			clone.style.position = "absolute";
			clone.innerHTML = elements[a].innerHTML;
			clones.push(clone);
			
		}
		
		
		
		
		
		
		//Adjust and put all clones
		
		for (var b = 0; b < clones.length; b++)
		{
			var appendThis = clones[b];
			var locus = points[b];
			
			if (axisXRight == -1)
			{
				appendThis.style.left = parseInt(locus["x"] + axisX - appendThis.width/2) + "px";
			}
			else
			{
				appendThis.style.right = parseInt(locus["x"] + axisXRight - appendThis.width/2) + "px";
			}
			
			if (axisYBottom == -1)
			{
				appendThis.style.top = parseInt(locus["y"] + axisY - appendThis.height/2) + "px";
			}
			else
			{
				appendThis.style.bottom = parseInt(locus["y"] + axisYBottom - appendThis.height/2) + "px";
			}
			
			
			//appendThis.style.left = parseInt(locus["x"] + axisX - appendThis.width/2) + "px";
			//appendThis.style.top = parseInt(locus["y"] + axisY - appendThis.height/2) + "px";
			
			
			appendThis.style.transform = "rotate(" + (b * stepSize) + "rad)";
			
			inHere.appendChild(appendThis);
		}
		
		inHere.removeChild(elements[a]);
	}
	
	
	
}

function swirlOfElements(elements,inHere)
{
	var axisX = parseInt(inHere.getBoundingClientRect().width/2);
	var axisY = parseInt(inHere.getBoundingClientRect().height/2);
	var axisXRight = -1;
	var axisYBottom = -1;
	
	for (var a = 0; a < elements.length; a++)
	{
		//Check if positioning is applied
		if (elements[a].style.top != "")
		{
			axisY = parseInt(elements[a].style.top);
		}
		
		if (elements[a].style.left != "")
		{
			axisX = parseInt(elements[a].style.left);
		}
		
		
		if (elements[a].style.bottom != "")
		{
			axisYBottom = parseInt(elements[a].style.bottom);
		}
		
		if (elements[a].style.right != "")
		{
			axisXRight = parseInt(elements[a].style.right);
		}
		
		var defaultSteps = 10;
		var defaultLaps = 1;
		var defaultRadiusStart = 1;
		var defaultRadiusEnd = 100;
		var defaultOffset = 0;
		var defaultReverse = "false";
		
		var steps = parseInt(extractCustomAttribute(elements[a],"steps"));
		if(steps + "" == "NaN")
		{
			steps == defaultSteps
		}
		
		var laps = parseInt(extractCustomAttribute(elements[a],"laps"));
		ifNaNSet(laps,defaultLaps);
		
		var stepSize = (Math.PI * 2)/steps;
		var radiusstart = parseInt(extractCustomAttribute(elements[a],"radiusstart"));
		if(radiusstart + "" == "NaN")
		{
			radiusstart = defaultRadiusStart;
		}
		
		
		var radiusend = parseInt(extractCustomAttribute(elements[a],"radiusend"));
		if(radiusend + "" == "NaN")
		{
			radiusend = defaultRadiusEnd;
		}
		
		var offset = parseFloat(extractCustomAttribute(elements[a],"offset")) * Math.PI/180;
		if(offset + "" == "NaN")
		{
			offset = defaultOffset;
		}
		
		var reverse = elements[a].attributes["reverse"]["value"];
		if(reverse + "" == "undefined")
		{
			reverse = defaultReverse;
		}
		
		var points = makeSwirl(steps, laps ,radiusstart, radiusend, offset, reverse);
		
		var clones = [];
		
		while (clones.length < steps)
		{
			var clone = elements[a].cloneNode();
			clone.style.position = "absolute";
			clone.innerHTML = elements[a].innerHTML;
			clones.push(clone);
			
		}
		
		
		
		
		
		
		//Adjust and put all clones
		
		for (var b = 0; b < clones.length; b++)
		{
			var appendThis = clones[b];
			var locus = points[b];
			var reversal = 1;
			
			if (reverse.toLowerCase() == "true")
			{
				reversal = -1;
			}
			
			if (axisXRight == -1)
			{
				appendThis.style.left = parseInt(locus["x"] + axisX - appendThis.width/2) + "px";
			}
			else
			{
				appendThis.style.right = parseInt(locus["x"] + axisXRight - appendThis.width/2) + "px";
			}
			
			if (axisYBottom == -1)
			{
				appendThis.style.top = parseInt(locus["y"] + axisY - appendThis.height/2) + "px";
			}
			else
			{
				appendThis.style.bottom = parseInt(locus["y"] + axisYBottom - appendThis.height/2) + "px";
			}
			
			appendThis.style.transform = "rotate(" + (b * ((stepSize * reversal) * laps) ) + "rad)";
			
			inHere.appendChild(appendThis);
		}
		
		inHere.removeChild(elements[a]);
	}
	
	
	
}

function randomizeElements(elements,inHere)
{
	var sizeX = parseInt(inHere.getBoundingClientRect().width);
	var sizeY = parseInt(inHere.getBoundingClientRect().height);
	
	
	for (var a = 0; a < elements.length; a++)
	{
		
		//Get attributes and set defaults;
		
		var defaultSteps = 10;
		
		
		
		
		
		var steps = parseInt(extractCustomAttribute(elements[a],"steps"));
		if (steps + "" == "NaN")
		{
			steps = defaultSteps;
		}
	
		
		
		var clones = [];
		
		while (clones.length < steps)
		{
			var clone = elements[a].cloneNode();
			clone.style.position = "absolute";
			clone.innerHTML = elements[a].innerHTML;
			clones.push(clone);
			
		}
		
		
		
		
		
		
		//Adjust and put all clones
		
		for (var b = 0; b < clones.length; b++)
		{
			var appendThis = clones[b];
			
			var locusX = parseInt((sizeX) * Math.random());
			var locusY = parseInt((sizeY) * Math.random());
			/*
			if (Math.random() >= 0.5)
			{
				appendThis.style.left = parseInt(locusX - appendThis.width/2) + "px";
			}
			else
			{
				appendThis.style.right = parseInt(locusX - appendThis.width/2) + "px";
			}
			
			
			if (Math.random() >= 0.5)
			{
				appendThis.style.top = parseInt(locusY - appendThis.height/2) + "px";
			}
			else
			{
				appendThis.style.bottom = parseInt(locusY - appendThis.height/2) + "px";
				console.log("DING");
			}
			*/
			
			appendThis.style.left = parseInt(locusX - appendThis.width/2) + "px";
			appendThis.style.top = parseInt(locusY - appendThis.height/2) + "px";
			inHere.appendChild(appendThis);
		}
		
		inHere.removeChild(elements[a]);
	}
	
	
	
}
/*
clones the elements
elements = Array of elements;
*/
function cloneThese(elements)
{
	var toSend = [];

	for (var a = 0; a < elements.length; a++)
    {
    	var toPut = elements[a].cloneNode();
        toPut.innerHTML = elements[a].innerHTML;
        toSend.push(toPut);
    }
    
    return toSend;
}
/*
Copies the elements in an array into another array
elements = Array of elements;
*/
function secureArray(elements)
{
	var toSend = [];

	for (var a = 0; a < elements.length; a++)
    {
    	var toPut = elements[a];
        toSend.push(toPut);
    }
    
    return toSend;
}


/*

*/
function chaseAngle(radAngle,speed)
{
	var tempX = Math.cos(radAngle) * speed;
	var tempY = Math.sin(radAngle) * speed;

	return {x:tempX,y:tempY};
}

function makeOrbit(steps,radius,offsetAngle)
{
	var toSend = [];
	
	var stepSize = (2 * Math.PI) / steps;
	
	for (var a = 0; a < steps; a++)
	{
		var toPut = chaseAngle(stepSize * a + offsetAngle,radius);
		toSend.push(toPut);
	}
	
	return toSend;
	
}

/*
steps(int) how many entries are in to send
laps(int) how many times the spiral curls around
radiusStart(float) length from center when it starts 
radiusEnd (float) length from center when it ends
offsetAngle (float) starting angle
reverse (boolean) go in the opposite direction

*/

function makeSwirl(steps, laps ,radiusStart, radiusEnd, offsetAngle, reverse)
{
	var toSend = [];
	
	var stepSize = ((2 * Math.PI)* laps) / steps ;
	var baseAngle = 0;
	var radiusBase = radiusStart;
	var radiusStep = (radiusEnd - radiusStart) / steps;
	
	for (var a = 0; a < steps; a++)
	{
		var tempRadius = radiusBase + (radiusStep * a);
		var tempAngle = stepSize * a + offsetAngle;
		
		//If reverse subtract instead of putting
		if (reverse.toLowerCase() == "true")
		{
			tempAngle *= -1;
		}
		
		var toPut = chaseAngle(tempAngle,tempRadius);
		toSend.push(toPut);
	}
	
	return toSend;
	
}

/*
fromthis: htmlelement
key: string
*/
function extractCustomAttribute(fromthis, key)
{
	try
	{
		return fromthis.attributes[key]["value"];
	}
	catch
	{
		return undefined;
	}
}

function ifNaNSet(checkThis,settothis)
{
	if (checkThis + "" == "NaN")
	{
		checkThis = settothis;
	}
}
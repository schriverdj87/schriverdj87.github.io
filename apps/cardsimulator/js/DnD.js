/*DnD = Drag n' Drop*/
 
 var counterz = 10;//Counter to ensure that the element that is currently being moved stays on top.
    var countermove = 0;//How many times the "onmove" was triggered. If this is higher than 0 then don't accept click events.
    var internalMouseLocus = {"x":0,"y":0};//When the user mouse downs on a draggable this captures the location of the mouse in the element.
    var mainStage;
    var currentlyDragging;


    var StartRealDragAndDrop = function()
    {
       mainStage = document.getElementsByClassName("maindndcontainer");
       
       for (var b = 0; b < mainStage.length; b++)
       {
            StapleAsStage(mainStage[b]);
       }
       var draggable = document.getElementsByClassName("draggable");

       for (var a = 0; a < draggable.length; a++)
       {
            StapleAsDraggable(draggable[a]);
            
       }

    }

    function StapleAsStage(stapleThis)
    {
        stapleThis.onmousemove = MainStageMouseMove;
        stapleThis.onmouseup = MainStageMouseUp;
    }

    function StapleAsDraggable(staplethis)
    {
        staplethis.onmousedown = DraggableMouseDown;
        staplethis.style.position = "absolute";
    }

    var MainStageMouseMove = function(eventhere)
    {
       
        if (currentlyDragging != null)
        {
            var mainContainerRect = this.getBoundingClientRect();
            var nonStaticX = 0;
            var nonStaticY = 0;

            if (this.style.position == "static" || this.style.position == "relative")
            {
                nonStaticX = mainContainerRect.x;
                nonStaticY = mainContainerRect.y;
            }

            currentlyDragging.style.left = (window.event.clientX - internalMouseLocus["x"] - nonStaticX + scrollX) + "px";
            currentlyDragging.style.top = (window.event.clientY - internalMouseLocus["y"]- nonStaticY + scrollY) + "px";
            countermove++;
        }
        //console.log(window.event.screenX + " , " + window.event.screenY);
    }

    var MainStageMouseUp = function(eventhere)
    {
        currentlyDragging = null;
    }

    var DraggableMouseDown = function(eventhere)
    {

        var rect = this.getBoundingClientRect();

        internalMouseLocus["x"] = eventhere.clientX - rect.x;
        internalMouseLocus["y"] = eventhere.clientY - rect.y;
        currentlyDragging = this;
        counterz++;
        currentlyDragging.style.zIndex = counterz + "";
        countermove = 0;
        
    }


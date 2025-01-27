
    var StartCrudeDnD = function()
    {
        var cells = document.getElementsByClassName("dndcontainer");

        for (var a = 0; a < cells.length;a++)
        {
            var DragMe = cells[a].firstChild;
            //The inner contents of the cell
            if (DragMe != null)
            {
                
                DragMe.draggable = true;
                DragMe.ondragstart = DragIt;
                if(DragMe.id.length == 0)
                {DragMe.id = a + "fdsdfs";}
            }

            //The cell itself
            if(cells[a].id.length == 0)
            {cells[a].id = a + "fdafsaf";}
            cells[a].ondrop = DropIt;
            cells[a].ondragover = DropItAllow;
        }
    }

    var DragIt = function (leEvent)
    {
        leEvent.dataTransfer.setData("text",leEvent.target.parentElement.id);
    }


    var DropItAllow = function (leEvent)
    {
        leEvent.preventDefault();
    }

    var DropIt = function (leEvent)
    {
        leEvent.preventDefault();
        var element1 = document.getElementById(leEvent.dataTransfer.getData("text"));
        var element2 = document.getElementById(this.id);
        SwapIt(element1,element2);
    }

    //Takes two elements and swaps their children.
    function SwapIt(elementA,elementB)
    {
        var offElement = document.getElementById("OffElement");

        if (offElement == null)
        {
            
            var newOffElement = document.createElement("div");
            newOffElement.id = "OffElement";
            offElement = newOffElement;
        }
        
        while (elementA.children.length > 0)
        {
            offElement.appendChild(elementA.children[0]);
        }


        while (elementB.children.length > 0)
        {
            elementA.appendChild(elementB.children[0]);
        }

        while (offElement.children.length > 0)
        {
            elementB.appendChild(offElement.children[0]);
        }

        

        
    }

    
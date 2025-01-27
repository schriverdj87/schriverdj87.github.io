function ConvertDeckToGrid(convertthis,rowsize)
{
    var toSend = [[]];
    

    for (var a = 0; a < convertthis.length; a++)
    {

        var currentArray = toSend[toSend.length - 1];
        
        if (currentArray.length >= rowsize)
        {
            toSend.push([]);
            currentArray = toSend[toSend.length - 1];

        }

        currentArray.push(convertthis[a]);

 
    }

    //Ensuring that each row stays the same size. 
    while (toSend[toSend.length - 1].length < rowsize)
    {
        toSend[toSend.length - 1].push(nocard);
    }

    return toSend;

}

function TakeCard(inthis,x,y)
{
    var leY = Math.max(0,Math.min(y,inthis.length - 1));
    var leX = Math.max(0,Math.min(x,inthis[leY].length -1));

    var toSend = inthis[leY][leX];
    inthis[leY][leX] = nocard;

    return toSend;

}

function PeekCard(inthis,x,y)
{
    var leY = Math.max(0,Math.min(y,inthis.length - 1));
    var leX = Math.max(0,Math.min(x,inthis[leY].length -1));

    var toSend = inthis[leY][leX];

    return toSend;

}
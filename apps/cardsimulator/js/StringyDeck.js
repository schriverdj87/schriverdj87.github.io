//Made By David Schriver, September 2021

/*
FORMAT:
[NAME]|One Card|Multiple Cards:30


SampleDecks:
mininggame|rock:80|copper:10|iron:6|gold:3|DILITHIUM
moneyorbomb|1 Coin:12|3 Coin:5|5 Coin:2|BOMB! You Loose!
matching|Steve Moraff:2|Football:2|Cherries:2|Chocolate Lab:2|Homer Simpson:2|Apples:2|Port Village:2|Jellybeans:2|Cookies:2|Campfire:2|John 3[COLON]16:2

*/

/*
Method Summary:
====================
NewDeck (fromthis) : Returns an object that contains one or more "decks". Each deck is an object full of string keys and numbers

*/
 var nocard = "NOCARDHEREEMPTY";
 var replacerColon = "[COLON]";
 var replacerNL = "[NL]";
 var replacerPipe = "[PIPE]"

function NewDeck (fromthis)
{
    var toSend = {};

    //Split by newline
    var rawSplit = fromthis.split("\n");

    for (var a = 0; a < rawSplit.length; a++)
    {
        //Split by | for each deck
        var subSplit = rawSplit[a].split("|");
        var deckName = subSplit[0];
        subSplit.shift();

        //Add it if it's not already there
        if (toSend[deckName] == undefined)
        {
            toSend[deckName] = [];
        }

        
        for (var b = 0; b < subSplit.length; b++)
        {
            var rawToPut = subSplit[b];
            var rawToPutSplit = rawToPut.split(":");
            //Take out everything you don't want in there
            var nameToPut = rawToPutSplit[0].replaceAll("<","&lt").replaceAll("<","&gt").replaceAll(replacerColon,":").replaceAll(replacerNL,"</br>").replaceAll(replacerPipe,"|");
            var numToPut = 1

            if (rawToPutSplit.length > 1)
            {
                try
                {
                    //console.log(rawToPutSplit[1]);
                    numToPut = Math.abs(Math.round(parseInt(rawToPutSplit[1])));
                }
                catch
                {
                    return "Cannot parse number for " + rawToPut;
                }
            }

            while (numToPut > 0)
            {
                
                toSend[deckName].push(nameToPut)
                numToPut--;
            }

            toSend[deckName] = Shuffle(toSend[deckName]);

            

        }
    }


    return toSend;
}


function Shuffle(scramblethis)
{
    var original = scramblethis;
    var toSend = [];
    var randexLast = -9001;


    while (original.length > 0)
    {
        //If it's only one...
        if (original.length == 1)
        {
            var toPut = original[0];
            toSend.push(toPut);
            break;
        }

        
        var randex = Math.round(Math.random() * (original.length - 1));
        
        //Make sure we don't get adjacent numbers.
        while (randex == randexLast)
        {
            randex = Math.round(Math.random() * (original.length - 1));
        }
        
        var toPut = original[randex];
        toSend.push(toPut);
        original.splice(randex,1);
        randexLast = randex;
    }

    return toSend;
}

function DrawCard(fromthis,atthisindex)
{
    if (fromthis.length == 0)
    {
        return nocard;
    }

    var leIndex = 0;

    if (typeof(atthisindex) == "string")
    {
        leIndex = fromthis.indexOf(atthisindex);

        if (leIndex == -1)
        {
            return nocard;
        }
    }
    else
    {
     leIndex = Math.max(0,Math.min(atthisindex,fromthis.length-1));
    }
    var toSend = fromthis[leIndex];
    fromthis.splice(leIndex,1);

    return toSend;
    
}

function DrawCardInto(fromthis,atthisindex,intothis)
{
    if (fromthis.length == 0)
    {
        return nocard;
    }

    var leIndex = 0;
    
    if (typeof(atthisindex) == "string")
    {
        leIndex = fromthis.indexOf(atthisindex);

        if (leIndex == -1)
        {
            return nocard;
        }
    }
    else
    {
     leIndex = Math.max(0,Math.min(atthisindex,fromthis.length-1));
    }


    var toSend = fromthis[leIndex];
    fromthis.splice(leIndex,1);

    intothis.push(toSend);

    return toSend;
    
}

function AddCard(addthis,intothis)
{
    intothis.push(addthis);
}

function PeekCard(fromthis,atthisindex)
{
    if (fromthis.length == 0)
    {
        return "EMPTY";
    }

    var leIndex = Math.max(0,Math.min(atthisindex,fromthis.length-1));
    
    var toSend = fromthis[leIndex];

    return toSend;
    
}
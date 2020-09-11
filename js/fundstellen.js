var header = document.getElementById("filteredHeader"); //The header which appears after value-changing in any select-box
var div = document.getElementById("filteredInfo"); //The div created after value-changing in any select-box
var btn = []; //An empty array for button (more/less button) content 
var addedAr = []; //An empty array for hidden data in filtering by gorges
var requestFile = 'database/sites.json'; //The database


var myRequest = new XMLHttpRequest (); //Initializing HTTP-Request
myRequest.open('GET', requestFile, true);
myRequest.send();


//An anonymous function will be executed on loading the page
//In this function the data we got from the database will be parsed into a JSON-file
//So that we could use the data later
myRequest.onload = function() { 
    var myData = JSON.parse(myRequest.responseText); //Conversion of the text to a JSON-file 
    sites = myData['fundstellen']; //A global variable that allows to access JSON-data
    console.log(sites);

};

//FILTER BY GORGES
function infos(selectedGorge) { //a parameter selectedGorge is the value selected in a box in HTML 

    div.innerHTML = ""; //At the beginning of a for-loop the div should be emptied 
    var filteredArray = sites.filter(function (site) { //The new array will be created filtered by selected value in select box
        return site.gorge === selectedGorge; 
    });
    
    
    for(var i = 0; i < filteredArray.length; i++) {
        //The creation of new elements
        var articleGorge = document.createElement('article'); //The article for all filtered elements
        var hiddenContainer = document.createElement('div'); //The div-container for hidden information

        var headline = document.createElement('h2'); //The headline of every article (a number of the site)
        var paraLongLat = document.createElement('p'); //A paragraph for Longitude and Latitude
        var paraNickname = document.createElement('p'); //A paragraph for site nickname
        var paraDiscoverer = document.createElement('p'); //A paragraph for the name of discoverer
        var paraDate = document.createElement('p'); //A paragraph for date of discovery
        var paraNextSite = document.createElement('p'); //A paragraph for the nearest next site
        var paraWaterAvailability = document.createElement('p');
        var paraOpenField = document.createElement('p'); //A paragraph for the distance to the next field
        var paraPainting = document.createElement('p'); //A paragraph for paintings info
        var paraOccupation = document.createElement('p'); //A paragraph for human occupation
        var paraLiving = document.createElement('p'); //A paragraph for the quality of living place
        var paraSpatiality = document.createElement('p'); //A paragraph for Spaciality
        var paraPublication = document.createElement('p'); //A paragraph for publication
        paraPublication.classList.add("changeP"); //Assign a class to the paragraph paraPublication

        var showMoreBtn = document.createElement('button'); //A button show more/less
        showMoreBtn.classList.add("moreBtn"); //Assigning a class = "moreBtn" to the button
        showMoreBtn.innerHTML = "Mehr anzeigen"; //The text content for the button

        //The content of new created elements
        headline.innerHTML = filteredArray[i].site;
        paraLongLat.innerHTML = 'Geografische Länge: ' + filteredArray[i].longitudeUTM + ', Geografische Breite: ' + filteredArray[i].latitudeUTM;
        paraNickname.innerHTML = 'Ortsname: ' + filteredArray[i].siteNickname;
        paraDiscoverer.innerHTML = 'Entdecker: ' + filteredArray[i].discoverer;
        paraDate.innerHTML = 'Entdeckungsdatum: ' + filteredArray[i].dateOfDiscovery;
        paraNextSite.innerHTML = 'Die Entfernung zur nächsten Fundstelle (' + filteredArray[i].nextSite + '), in Meter: ' + filteredArray[i].distanceNextSite;
        paraWaterAvailability.innerHTML = 'Wasseverfügbarkeit: ' + filteredArray[i].waterAvailability;
        paraOpenField.innerHTML = 'Distanz zu einem offenen Feld: ' + filteredArray[i].openField;
        paraPainting.innerHTML = 'Standort von Malereien: ' + filteredArray[i].paintingLocation + ', Schädigung: ' + filteredArray[i].degradationPainting;
        paraOccupation.innerHTML = 'Beweise für die menschliche Besetzung: '  + filteredArray[i].evidenceHumanOccupation;
        paraLiving.innerHTML = 'Wohnraum: ' + filteredArray[i].livingPlace;
        paraSpatiality.innerHTML = 'Anzahl von in den Raum passenden Personen: ' + filteredArray[i].spatiality;
        paraPublication.innerHTML = 'Die Informationen über die Fundstelle wurden in: ' + filteredArray[i].publication + ' publiziert.';

        //Assigning child-elements to their parent-elements (here: to articleGorge)
        articleGorge.appendChild(headline);
        articleGorge.appendChild(paraLongLat);
        articleGorge.appendChild(paraNickname);
        articleGorge.appendChild(paraDiscoverer);
        articleGorge.appendChild(paraDate);

        //Assigning child-elements to their parent-elements (here: to hiddenContainer)
        hiddenContainer.appendChild(paraNextSite);
        hiddenContainer.appendChild(paraWaterAvailability);
        hiddenContainer.appendChild(paraOpenField);
        hiddenContainer.appendChild(paraPainting);
        hiddenContainer.appendChild(paraOccupation);
        hiddenContainer.appendChild(paraLiving);
        hiddenContainer.appendChild(paraSpatiality);
        hiddenContainer.appendChild(paraPublication);


        div.appendChild(articleGorge); //Adding my elements to the existing div (id = "filteredInfo")

        //Assigning my hidden Container and a new button (show more) to the article
        articleGorge.appendChild(hiddenContainer); 
        articleGorge.appendChild(showMoreBtn);


        //Add elements from the container and my button to the empty arrays
        btn.push(showMoreBtn);
        addedAr.push(hiddenContainer);
        console.log('Button Array', btn);
        console.log('Hidden Container Array', addedAr);


        hiddenContainer.style.display = "none"; //The container won't be shown       

    }

    //After clicking on any button the position in Array and the button will be delivered to the other function moreInfo() through .bind() method
    // (j shows the position of a button)
    for (var j = 0; j < btn.length; j++) {
        btn[j].addEventListener('click', function(j) {
            moreInfo(j, btn[j]); //the function moreInfo() gets the data as a parameter
        }.bind(this, j)); //this method sends the event of the current button to the function moreInfo()
    }
}

//The comparison of button index in btn with the position of elements in my hidden container (addedAr) using for-loop 
//(i = position in my hidden container array)
function moreInfo(indexBtn, usingBtn) { //indexBtn is the position of a button, usingBtn is a current button in the array
    for (i = 0; i < addedAr.length; i++) {
        if (i === indexBtn) { //two arrays (btn, addedAr) will be compared 
            //and if the position in arr and in btn are equal the following statements will be checked:

            if (addedAr[i].style.display === 'none') { //if my container with additional info is hidden it should be shown
                addedAr[i].style.display = 'block';
                usingBtn.innerHTML = "Weniger anzeigen";
            } else if (addedAr[i].style.display === 'block') { //if it is shown it should be hidden 
                addedAr[i].style.display = "none";
                usingBtn.innerHTML = "Mehr anzeigen"; //and the name of the button should be changed
            }
        }
    }
}


//Adding an event listener to the select box with id="schlucht"
document.getElementById("schlucht").addEventListener("change", viewHeader); 
//After changing the value in select-box, this function will be executed
//A new header appears under select-boxes
function viewHeader() {
    header.innerHTML = ""; //before adding a new header the old one must be deleted
    var headerGorge = document.createElement('h1');
    var node = document.createTextNode("Allgemeine Informationen:");
    headerGorge.appendChild(node);

    header.appendChild(headerGorge);

}



//FILTER BY QUANTITY OF ARTEFACTS
function quantityArt(selectedQuant) { 

    div.innerHTML = ""; //At the beginning of a for-loop the div should be emptied 
    var filteredArray = sites.filter(function (site) { //The new array will be created filtered by selected value in select box
        return site.quantityArtefacts === selectedQuant; 
    });
    
    
    for(var i = 0; i < filteredArray.length; i++) {

        //The creation of new elements
        var articleGorge = document.createElement('article'); //The article for all filtered elements

        var headline = document.createElement('h2'); //The headline of every article (a number of the site)
        var paraLongLat = document.createElement('p'); //A paragraph for Longitude and Latitude
        var paraNameGorge = document.createElement('p'); //A paragraph for the name of a gorge
        var paraLithics = document.createElement('p'); //A paragraph for the quantity of lithics
        var paraPottery = document.createElement('p'); //A paragraph for the quantity of pottery
        var paraOES = document.createElement('p'); //A paragraph for the quantity of O.E.S.
        var paraBone = document.createElement('p'); //A paragraph for the quantity of bones.
        var paraCharcoal = document.createElement('p'); //A paragraph for the quantity of charcoal
        var paraGrind = document.createElement('p'); //A paragraph for the quantity of grinding implements
        var paraStone = document.createElement('p'); //A paragraph for the quantity of stone structures
        var paraMiscArt = document.createElement('p'); //A paragraph for the quantity of miscellenous Artefact
        
     
        //The content of new created elements
        headline.innerHTML = filteredArray[i].site;
        paraLongLat.innerHTML = 'Geografische Länge: ' + filteredArray[i].longitudeUTM + ', Geografische Breite: ' + filteredArray[i].latitudeUTM;
        paraNameGorge.innerHTML = 'Schlucht: ' + filteredArray[i].gorge;
        paraLithics.innerHTML = 'Lithics: ' + filteredArray[i].lithics;
        paraPottery.innerHTML = 'Pottery: ' + filteredArray[i].pottery;
        paraOES.innerHTML = 'Ostrich Eggshell (O.E.S.): ' + filteredArray[i].ostrichEggshell;
        paraBone.innerHTML = 'Bone: ' + filteredArray[i].bone;
        paraCharcoal.innerHTML = 'Charcoal: ' + filteredArray[i].charcoal;
        paraGrind.innerHTML = 'Grinding Implements: ' + filteredArray[i].grindingImplements;
        paraStone.innerHTML = 'Stone Structures: ' + filteredArray[i].stoneStructures;
        paraMiscArt.innerHTML = 'Miscellenous Artefact: ' + filteredArray[i].miscellenousArtefact;

        //Assigning child-elements to their parent-elements (here: to articleGorge)
        articleGorge.appendChild(headline);
        articleGorge.appendChild(paraLongLat);
        articleGorge.appendChild(paraNameGorge);
        articleGorge.appendChild(paraLithics);
        articleGorge.appendChild(paraPottery);
        articleGorge.appendChild(paraOES);
        articleGorge.appendChild(paraBone);
        articleGorge.appendChild(paraCharcoal);
        articleGorge.appendChild(paraGrind);
        articleGorge.appendChild(paraStone);
        articleGorge.appendChild(paraMiscArt);
                

        div.appendChild(articleGorge); //Adding my elements to the existing div (id = "filteredInfo")

       

    }
}

//Adding an event listener to the select box with id="artefacts"
document.getElementById("artefacts").addEventListener("change", viewHeader2); 
//After changing the value in select-box, this function will be executed
//A new header under select-boxes
function viewHeader2() {
    header.innerHTML = ""; //before adding a new header the old one must be deleted
    var headerGorge = document.createElement('h1');
    var node = document.createTextNode("Anzahl von Artefakten: ");
    headerGorge.appendChild(node);

    header.appendChild(headerGorge);

}


// Sources:
// - Filter Method: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// - Filter Array Method in JS: https://alligator.io/js/filter-array-method/
// - Dynamische Darstellung von Daten mit Parameterübergabe: https://lehre.idh.uni-koeln.de/lehrveranstaltungen/wisem19/basissysteme-der-informationsverarbeitung-1-bsi-2/ajax/dynamische-darstellung-von-daten-mit-parameterubergabe/



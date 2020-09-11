var arr = []; // an empty array where new objects will be added -> an array of publications will be created
var container = document.getElementById('publication'); //a variable that represents the div-container in HTML-file
var requestFile = 'database/sites.json'; //The database


var myRequest = new XMLHttpRequest(); //initializing HTTP-request
myRequest.open('GET', requestFile, true);
myRequest.send();

//An anonymous function will be executed on loading the page
//In this function the data we got from the database will be parsed into a JSON-file
//So that we could use the data later
myRequest.onload = function() { 
    var myData = JSON.parse(myRequest.responseText); //Parsing data into JSON
    sites = myData.fundstellen;
    console.log(sites);
    showPublications();
}

container.addEventListener('load', showPublications); //After the container is loaded, a function showPublications() will be executed

//The function showPublications() adds new elements to the empty array and then loops through the elements in this array
//in order to create paragraphs for every publication automatically
function showPublications() { 
    //Adding all publications to the empty array
    arr.push(sites[0].publication);
    arr.push(sites[175].publication);
    arr.push(sites[67].publication);
    arr.push(sites[487].publication);
    arr.push(sites[312].publication);
    arr.push(sites[77].publication);
    console.log(arr);

    console.log('a container', container);
    
    for(var i = 0; i < arr.length; i++) { //For-loop through the array arr

        var paraPublication = document.createElement('p'); //A variable that creates paragraphs for every publication
        paraPublication.innerHTML = arr[i];

        console.log('my paragraphs', paraPublication); //making sure that the page got new elements
        container.appendChild(paraPublication); //Adding all paragraphs to the container as child-elements
        
    }
}
 
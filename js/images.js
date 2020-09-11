
var links; // A variable that saves all the image links


var myRequest = new XMLHttpRequest (); //Initializing HTTP-Request
myRequest.open('GET', 'database/imgLinks.json', true);
myRequest.send();


//An anonymous function will be executed on loading the page
//In this function the data we got from the database will be parsed into a JSON-file
//So that we could use the data later
myRequest.onload = function() { 
    imgLinks = JSON.parse(myRequest.responseText); //Conversion of the text to a JSON-file 
    console.log(imgLinks);

};

//Choose a specific array in the JSON-file
function slide(selectedGorge){
    // Empty the div container before inserting the images
    document.getElementById("imgDiv").innerHTML = "";

    switch(selectedGorge){
        case "Amis":
            links = imgLinks[0].Amis;
            break;
        case "Circus":
            links = imgLinks[1].Circus;
            break;
        case "Dom":
            links = imgLinks[2].Dom;
            break;
        case "Eros":
            links = imgLinks[3].Eros;
            break; 
        case "Gaaseb":
            links = imgLinks[4].Gaaseb;
            break;
       case "Hungorob":
            links = imgLinks[5].Hungorob;
            break;
        case "Karoab":
            links = imgLinks[6].Karoab;
            break;  
        case "Naib":
            links = imgLinks[7].Naib;
            break;   
        case "Orabes":
            links = imgLinks[8].Orabes;
            break;   
        case "Raiders":
            links = imgLinks[9].Raiders;
            break;   
        case "Tsisab":
            links = imgLinks[10].Tsisab;
            break;      
        case "Umuab":
            links = imgLinks[11].Umuab;
            break;                   

    }
    //execute the function getImages(links) and create images
    console.log(links);
    getImages(links);
}

//This function creates div-elements for every image
//And gives them a source from the JSON-file
 function getImages(links){
    var targetImg; 
    var image;
    var imgWrap;

    for(var i = 0; i < links.length; i++){
        // Create a link to the image
        targetImg = document.createElement('a');
        targetImg.target = '_blank';
        targetImg.href = links[i];

        // Create image
        image = document.createElement('img');
        imgWrap = document.createElement('div');
        imgWrap.classList.add('imgWrap'); // a class for images

        // Set source
        image.src = links[i];
        image.alt = "";


        imgWrap.appendChild(image);
        targetImg.appendChild(imgWrap);
        document.getElementById('imgDiv').appendChild(targetImg);
    }    
}



// Sources:
// - Clear div content: https://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript
 
var result;

function randQues() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("quesDisplay").innerHTML =
      this.responseText;
    }
  };
    
    let content = xhttp.open("GET", "../randomQues.txt", true);
    document.getElementById("quesDisplay").innerHTML = content;
    xhttp.send(content);
}

function countCharacters() {  
        var textEntered, countRemaining, counter;  
        textEntered = document.getElementById('questionContent').value; 
        counter = (200 - (textEntered.length)); 
        countRemaining = document.getElementById('conLai');
        countRemaining.innerText = "Con lai " + counter + " /200 ki tu";  
}
result = document.getElementById('questionContent');
result.addEventListener('input', countCharacters, false);

function getQueastion() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      
      
      let questionObject = JSON.parse(this.responseText);
      console.log(questionObject);
      }
    };
    xhttp.open("GET", "html_question.json", true);
    xhttp.send();
  }

  getQueastion();
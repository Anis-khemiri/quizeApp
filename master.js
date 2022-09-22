
let countSpan = document.querySelector(".quiz-info .count span");

let bulletsSpanContainer = document.querySelector(".bullets .spans");













function getQueastion() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      
      
      let questionObject = JSON.parse(this.responseText);
      console.log(questionObject);
      let questionCount = questionObject.length;
      console.log(questionCount);
      //create Bullets + Set Questions Count
      createBullets(questionCount);
      }
    };
    xhttp.open("GET", "html_question.json", true);
    xhttp.send();
  }

  getQueastion();

  function createBullets(num) {
countSpan.innerHTML = num;

// create Bullets (span)
for (let i = 1; i <= num; i++){
  let theBullets = document.createElement("span");
// check if the first question
  if(i === 1){
    theBullets.className ="on";
  }
  // append bullets to main container
  bulletsSpanContainer.appendChild(theBullets);

}


  }
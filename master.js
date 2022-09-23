let countSpan = document.querySelector('.quiz-info .count span');
let bullets = document.querySelector('.bullets');
let bulletsSpanContainer = document.querySelector('.bullets .spans');
let quizArea = document.querySelector('.quiz-area');
let answerArea = document.querySelector('.answers-area');
let submitButton = document.querySelector('.submit-button');
let resultFinal = document.querySelector('.results');
let countdownElement = document.querySelector('.countdown');
console.log(submitButton);

console.log(quizArea);
// set option
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQueastion() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let questionsObject = JSON.parse(this.responseText);
      console.log(questionsObject);
      let qCount = questionsObject.length;
      console.log(qCount);
      //create Bullets + Set Questions Count
      createBullets(qCount);

      // Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount);

      // Start CountDown
      countdown(150, qCount);

      // click on submit

      submitButton.onclick = function () {
        // Get Right Answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;

        // Increase Index
        currentIndex++;

        // Check The Answer
        checkAnswer(theRightAnswer, qCount);
        // remove previous question
        quizArea.innerHTML = '';
        answerArea.innerHTML = '';
        // add question data
        addQuestionData(questionsObject[currentIndex], qCount);
        //handel bullets class
        handelBullets();

        // Start CountDown
        clearInterval(countdownInterval);
        countdown(150, qCount);
        // show result
        showResults(qCount);
      };
    }
  };
  xhttp.open('GET', 'html_question.json', true);
  xhttp.send();
}

getQueastion();

function createBullets(num) {
  countSpan.innerHTML = num;

  // create Bullets (span)
  for (let i = 1; i <= num; i++) {
    let theBullets = document.createElement('span');
    // check if the first question
    if (i === 1) {
      theBullets.className = 'on';
    }
    // append bullets to main container
    bulletsSpanContainer.appendChild(theBullets);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // console.log(obj);
    // console.log(count);
    // create h2 question title
    let questionTitle = document.createElement('h2');
    // create question text
    let questionText = document.createTextNode(obj.title);
    // append text to h2
    questionTitle.appendChild(questionText);
    // append h2 title to div
    quizArea.appendChild(questionTitle);

    // create the Answer

    for (let i = 1; i <= 4; i++) {
      // create main answer div
      let mainDiv = document.createElement('div');
      // Add class to main div
      mainDiv.className = 'answer';
      // create Radio input
      let radioInput = document.createElement('input');

      // add type + Name + Id + Data-Attribute
      radioInput.name = 'question';
      radioInput.type = 'radio';
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      // Make First Option Selected
      if (i === 1) {
        radioInput.checked = true;
      }

      // Create Label
      let theLabel = document.createElement('label');
      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;
      // Create Label text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To label
      theLabel.appendChild(theLabelText);
      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);
      // Append all divs to Answer area
      answerArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(ranswer, qCount) {
  let answers = document.getElementsByName('question');
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }
  console.log(ranswer);
  console.log(theChoosenAnswer);
  if (ranswer === theChoosenAnswer) {
    rightAnswers++;
  }
}

function handelBullets() {
  let bulletsSpans = document.querySelectorAll('.bullets .spans span');
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = 'on';
    }
  });

  console.log(bulletsSpans);
  console.log(arrayOfSpans);
}

function showResults(count) {
  let theresults;
  if (currentIndex === count) {
    console.log('question finish');
    quizArea.remove();
    answerArea.remove();
    submitButton.remove();
    bullets.remove();

    let myr = (rightAnswers * 100) / count;
    console.log(myr.toFixed(2));
    if (myr < 50) {
      theresults = `<span class="bad">BAD</span> <br> your right answer is ${rightAnswers} from ${count} your Percent ${myr.toFixed(
        2
      )}%`;
    } else if (myr > 50 && myr < 70) {
      theresults = `<span class="good">GOOD</span> your right answer is ${rightAnswers} from ${count} your Percent ${myr.toFixed(
        2
      )}%`;
    } else {
      theresults = `<span class="perfect">PERFECT</span> your right answer is ${rightAnswers} from ${count} your Percent ${myr.toFixed(
        2
      )}%`;
    }
    resultFinal.innerHTML = theresults;
  }
}

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
if (duration < 21){
  countdownElement.style.color ="red";
}
      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}

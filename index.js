var data =[
    {   q:'Who was the only unanimously-elected president?',
        o:['George Washington','James Monroe',"Andrew Jackson","John Q. Adams"],
        a:'George Washington',
        d:'He was elected by both parties. In the Year 1789'},
    {
        q:'Who was the country’s first-known speleologist (cave explorer)?',
        o:['Thomas Jefferson',"Andrew Jackson","John Q. Adams",'Abraham Lincoln'],
        a:'Thomas Jefferson',
        d:''},

    {
        q:'Who was the smallest of all the presidents?',
        o:['James Madison','John Adams', "George Washington","Harry Truman"],
        a:'James Madison',
        d:' He was only 5′4″ tall and weighed less than 100 pounds.'},

    {   q:'Who was the first president to live in a "white", White House?',
        o:['John Adams','Georgo Washington', 'James Monroe',"John Q Adams"],
        a: 'James Monroe',
        d:'James Monroe was the person to officially live in House of the president of United States \
        that was not just called "white" but also painted "white'},

    {   q:'Who was the first president to be interviewed by a woman journalist, naked?',
        o:['Richard Nixon','Georgo Washington', 'John Quincy Adams',"Harry Truman"],
        a:'John Quincy Adams',
        d:' He customarily took a nude early morning swim in the Potomac River. \
        Anne Royall, the first U.S. professional journalist, knew of his 5:00 AM swims. \
        After being refused interviews with the president time after time, she went to the river, \
        gathered his clothes and sat on them until she had her interview. \
        Before this, no female had interviewed a president (least of all naked!).'},
    {   
        q:'Which president played the violin, loved to dance, spoke softly, and had good manners?',
        o:['John Tyler','James Madison', "Lyndon B John","Harry Truman"],
        a:'John Tyler',
        d:' He played the violin, loved to dance, spoke softly, and had good manners.'},
    {
        q:'Which president played is regarded as the most succussful?',
        o:['James Polk',"John Adams",'James Madison', "Harry Truman"],
        a:'James Polk',
        d:'He was the most successful president in American history. \
        During the 1844 campaign, he made five promises: to acquire California from Mexico, \
        to settle the Oregon dispute, to lower the tariff, to establish a sub-treasury, \
        and to retire from the office after four years.\
         When he left office, his campaign promises had all been fulfilled.'},
    {
        q:'Who was the first president to have a Christmas tree in the White house?',
        o:['Bill Clinton','Franklin Roosavelt', 'Franklin Pierce',"George H Bush"],
        a:'Franklin Pierce',
        d:''},
    {
        q:'Who was the first president to have a patent in his name?',
        o:['Abraham Lincoln','James Madison', "James Polk","Franklin Roosavelt"],
        a:'Abraham Lincoln',
        d:' He patented his floating drydock on May 22, 1849, patent #6469. \
         He was the first U.S. President to receive a patent.'},
    {
        q:'Which president was buried and wrapped in a U.S. flag and with his well-worn copy of the Constitution under his head?',
        o:['Andrew Johnson','Bill Clinton', "A. Lincoln","Lyndon B John"],
        a:'Andrew Johnson',
        d:' He was buried wrapped in a U.S. flag and with his well-worn copy of the Constitution under his head.'},          
]



//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

//template to generate each question
function genQ() {
  if (questionNumber < data.length) {
    return createThing(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(10);
  }
}

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
  score++;
  $('.score').text(score);
}

//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//begins the quiz
function start() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(genQ());
  });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.jungleBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = data[questionNumber].a;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createThing(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${data[questionIndex].q}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  data[questionIndex].o.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<br><br><button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('.response').html(
    `<h3>Your answer is correct!</h3>
      <p class="sizeMe">Way to go</p>
      <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $('.response').html(
    `<h3>That's the wrong answer...</h3>
    <p class="sizeMe">It's actually:</p>
    <p class="sizeMe">${data[questionNumber].a}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates the next question
function nextQuestion() {
  $('.jungleBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(genQ());
  });
}

//determines final score and feedback at the end of the quiz
function finalScore() {
  $('.final').show();

  const great = [
    'Great job!',
    'Acceptable, but do not get over confident',
    'Please, keep up the American dream',
    'You sure know a lot about US History!'
  ];

  const good = [
    'Good, not great.',
    'You are not the perfect American, but don\'t give up!',
    'Try again',
    'You should keep studying or lose american citizenship...'
  ];

  const bad = [
    'You are probably the most unamerican person ever!?',
    'The entire country and mankind is disapointed in you!',
    'go clean ur ass!',
    'then study hard?'
  ];

  if (score >= 8) {
    array = great;
  } else if (score < 8 && score >= 5) {
    array = good;
  } else {
    array = bad;
  }
  return $('.final').html(
    `<h3>${array[0]}</h3>
    <p class="sizeMe">${array[1]}</p>
    <p class="sizeMe">${array[2]}</p>
        <h3>Your score is ${score} / 10</h3>
        <p class="sizeMe">${array[3]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restart() {
  $('.jungleBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//runs the functions
function makeQuiz() {
  start();
  genQ();
  submitAnswer();
  nextQuestion();
  restart();
}

$(makeQuiz);

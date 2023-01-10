const buttonStart = $('#start-button');
const timerEl = $('.timer');
const startEl = $('#start');
const quizEl = $('#quiz');
const headingEl = $('.heading');
const answersEl = $('#answers');
const paragraphEl = $('.paragraph');
const containerEl = $('.container');
const resultEl = $('#result');
const formEl = $('#submit-form');
const highscoresEl = $('.highscores');
const highscoresCardEl = $('#highscores');
const listEl = $('#list');

const state = {
    quiz: false,
    highscores: false,
    gameover: false,
};

let questionIndex = 0;
let secondsLeft = 75;
let allhighscores = [];

//Hard coded Q&A
const questions = [
    "Question 1: What language is used to style a webpage?",
    "Question 2: What primitive data type is used to describe true or false?",
    "Question 3: What object is used to store a collection of multiple items under a single variable name?",
    "Question 4: What operator is used for not equal value or type?",
    "Question 5: What keyword refers to an object?",
];
const answers = [
    ["HTML","CSS","Javascript","jQuery"],
    ["Number","String","Boolean","Null"],
    ["Array","Function","Events","Numbers"],
    ["!=","===","?","!=="],
    ["class","break","this","var"]];

/*Functions*/
//function to load locally stored values
const init = () => {
    const scores = JSON.parse(localStorage.getItem('scores'));
    if (scores) {
        listEl.hide();
        allhighscores = scores;
        scores.forEach((score) => {
            const scoreEl = $('<li>');
            scoreEl.text(score);
            listEl.append(scoreEl);
        });
    }
};

//function to manage the timer

const setTime = () => {
    const timer = setInterval(() => {
        if (secondsLeft === 0 || questionIndex === 5) {
            clearInterval(timer);
            gameOver();
        } else {
            secondsLeft = Math.max(secondsLeft - 1, 0);
            timerEl.text(`Time: ${secondsLeft}`);
        }
    }, 1000);
};




//function to start the quiz by calling initial functions
const startQuiz = () => {
    highscoresEl.off('click', viewHighscores);
    paragraphEl.hide();
    buttonStart.hide();
    answersEl.show();
    resultEl.show();
    listEl.hide();
    setTime();
    resetState();
    nextQuestion(answers[0]);
    headingEl.text(questions[questionIndex]);
    resultEl.text('');
};


const resetState = () => {
    questionIndex = 0;
    secondsLeft = 90;
};



//function to render quiz container and dynamic button elements

const renderQuiz = () => {
    state.quiz = true;
    nextQuestion(answers[questionIndex]);
};



const nextQuestion = (currentArray) => {
    headingEl.text(questions[questionIndex]);
    answersEl.empty();
    currentArray.forEach((answer, index) => {
        const answerBtn = $("<button>");
        answerBtn.addClass("user-button");
        answerBtn.attr("a-button", index);
        answerBtn.text(answer);
        answersEl.append(answerBtn);
    });
};



//function used to move to game over container

const gameOver = () => {
    // Set the timer text
    timerEl.text(`Time: ${secondsLeft}`);

    // Update the heading and paragraph text
    headingEl.text('All done!');
    paragraphEl.text(`Your final score is: ${secondsLeft}`);

    // Show the form and paragraph, hide the answers and list
    formEl.show();
    paragraphEl.show();
    answersEl.hide();
    listEl.hide();

    // If the gameover state is false, call the renderGameover function
    if (!state.gameover) {
        renderGameover();
    }
};


  // Function used to render the game over container

const renderGameover = () => {
    // Create and append the form and submit button
    const myForm = $('<input>');
    const myBtn = $('<button>');
    myForm.addClass('form-input');
    myForm.attr('type', 'text');
    myForm.attr('name', 'Initials');
    myForm.attr('placeholder', 'Type here');
    formEl.text('Enter Initials: ');
    formEl.append(myForm);
    myBtn.addClass('user-button');
    myBtn.text('Submit');
    formEl.append(myBtn);

    // Set the gameover state to true
    state.gameover = true;
};


// Function to append user inputted highscore

const handleSubmitForm = (event) => {
    event.preventDefault();

    var inputEl = $('.form-input');
    var newScoreEl = $('<li>');
    newScoreEl.text(`${inputEl.val()} - ${secondsLeft}`);
    listEl.append(newScoreEl);
    allhighscores.push(`${inputEl.val()} - ${secondsLeft}`); // Saves highscore to global array
    localStorage.setItem('scores', JSON.stringify(allhighscores)); // Saves highscores to local storage
    
    viewHighscores();
};


// Function to view high scores

const viewHighscores = () => {
    headingEl.text('Highscores');
    if (!state.highscores) {
        renderHighscores();
    } else {
        highscoresCardEl.show();
    }
    listEl.show();
    paragraphEl.hide();
    answersEl.hide();
    resultEl.hide();
    formEl.hide();
    buttonStart.hide();
};

// Function to render highscore container

const renderHighscores = () => {
    var scoreEl = $('<ul>');
    listEl.append(scoreEl);

    var backBtn = $('<button>');
    backBtn.addClass('user-button');
    backBtn.attr('id', 'back');
    backBtn.text('Go Back');
    highscoresCardEl.append(backBtn);

    var clearBtn = $('<button>');
    clearBtn.addClass('user-button');
    clearBtn.attr('id', 'clear');
    clearBtn.text('Clear Highscores');
    highscoresCardEl.append(clearBtn);

    state.highscores = true;
};


// Event listeners

buttonStart.on('click', startQuiz); 

answersEl.on('click', '.user-button', (event) => { 
    if (questionIndex === 0) {
        if ($(event.target).attr('a-button') == 1) {
            resultEl.text('Correct!');
        } else {
            secondsLeft = secondsLeft - 10;
            resultEl.text('Wrong!');
        }
    }
    if (questionIndex === 1) {
        if ($(event.target).attr('a-button') == 2) {
            resultEl.text('Correct!');
        } else {
            secondsLeft = secondsLeft - 10;
            resultEl.text('Wrong!');
        }
    }
    if (questionIndex === 2) {
        if ($(event.target).attr('a-button') == 0) {
            resultEl.text('Correct!');
        } else {
            secondsLeft = secondsLeft - 10;
            resultEl.text('Wrong!');
        }
    }
    if (questionIndex === 3) {
        if ($(event.target).attr('a-button') == 3) {
            resultEl.text('Correct!');
        } else {
            secondsLeft = secondsLeft - 10;
            resultEl.text('Wrong!');
        }
    }
    if (questionIndex === 4) {
        if ($(event.target).attr('a-button') == 2) {
            resultEl.text('Correct!');
        } else {
            secondsLeft = secondsLeft - 10;
            resultEl.text('Wrong!');
        }
        questionIndex++;
    } else { 
        questionIndex++;
        nextQuestion(answers[questionIndex]);
    }
});

formEl.on('submit', handleSubmitForm); 

highscoresEl.on('click', viewHighscores);

highscoresCardEl.on('click', (event) => {
    if ($(event.target).attr('id') == 'back') {
        highscoresCardEl.hide();
        listEl.hide();
        headingEl.text('Coding Quiz Challenge');
        paragraphEl.show();
        paragraphEl.text('Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by ten seconds!');
        buttonStart.show();
        highscoresEl.on('click', viewHighscores); 
    }

    if ($(event.target).attr('id') == 'clear') {
        listEl.children('li').remove();
        for (let i = allhighscores.length; i >= 0; i--) {
            allhighscores.pop();
        }
        localStorage.setItem('scores', JSON.stringify(allhighscores));
    }
});

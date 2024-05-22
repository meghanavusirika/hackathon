document.getElementById('fetchTrivia').addEventListener('click', fetchTrivia);

function fetchTrivia() {
    const apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayTrivia(data.results))
        .catch(error => console.error('Error fetching trivia:', error));
}

function displayTrivia(questions) {
    const triviaContainer = document.getElementById('triviaContainer');
    triviaContainer.innerHTML = ''; 

    questions.forEach((questionObj, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        const questionTitle = document.createElement('h3');
        questionTitle.innerHTML = `Q${index + 1}: ${questionObj.question}`;
        questionDiv.appendChild(questionTitle);

        const answersDiv = document.createElement('div');
        answersDiv.classList.add('answers');

        const answers = [...questionObj.incorrect_answers, questionObj.correct_answer];
        shuffleArray(answers); 

        answers.forEach(answer => {
            const answerButton = document.createElement('button');
            answerButton.innerHTML = answer;
            answerButton.addEventListener('click', () => checkAnswer(answer, questionObj.correct_answer));
            answersDiv.appendChild(answerButton);
        });

        questionDiv.appendChild(answersDiv);
        triviaContainer.appendChild(questionDiv);
    });
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        alert('Correct!');
    } else {
        alert(`Wrong! The correct answer was: ${correctAnswer}`);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

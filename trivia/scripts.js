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

    // Apply styles to triviaContainer to center its content
    triviaContainer.style.display = 'flex';
    triviaContainer.style.flexDirection = 'column';
    triviaContainer.style.alignItems = 'center';
    triviaContainer.style.justifyContent = 'center';

    questions.forEach((questionObj, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        // Apply styles to questionDiv
        questionDiv.style.width = '80%';
        questionDiv.style.margin = '10px 0';
        questionDiv.style.padding = '20px';
        questionDiv.style.border = '1px solid #ccc';
        questionDiv.style.borderRadius = '8px';
        questionDiv.style.backgroundColor = '#f9f9f9';
        questionDiv.style.textAlign = 'center';

        const questionTitle = document.createElement('h3');
        questionTitle.innerHTML = `Q${index + 1}: ${questionObj.question}`;
        questionDiv.appendChild(questionTitle);

        const answersDiv = document.createElement('div');
        answersDiv.classList.add('answers');

        // Apply styles to answersDiv
        answersDiv.style.display = 'flex';
        answersDiv.style.flexDirection = 'column';
        answersDiv.style.alignItems = 'center';

        const answers = [...questionObj.incorrect_answers, questionObj.correct_answer];
        shuffleArray(answers);

        answers.forEach(answer => {
            const answerButton = document.createElement('button');
            answerButton.innerHTML = answer;
            answerButton.addEventListener('click', () => checkAnswer(answer, questionObj.correct_answer));
            
            // Apply styles to answerButton
            answerButton.style.margin = '5px';
            answerButton.style.padding = '10px 20px';
            answerButton.style.border = 'none';
            answerButton.style.borderRadius = '5px';
            answerButton.style.cursor = 'pointer';
            answerButton.style.backgroundColor = '#007bff';
            answerButton.style.color = 'white';
            answerButton.style.transition = 'background-color 0.3s';

            answerButton.addEventListener('mouseover', () => {
                answerButton.style.backgroundColor = '#0056b3';
            });
            answerButton.addEventListener('mouseout', () => {
                answerButton.style.backgroundColor = '#007bff';
            });

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

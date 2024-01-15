document.addEventListener('DOMContentLoaded', () => {
    const revealButton = document.getElementById('revealButton');
    const numberInput = document.getElementById('numberInput');
    const secretDiv = document.getElementById('secret');
    const timerDiv = document.getElementById('timer');
    const inputArea = document.getElementById('inputArea');
    const textInput = document.getElementById('textInput');
    const resultDiv = document.getElementById('result');
    const submitButton = document.getElementById('submit');
    let secret = '';
    let memorizeTimer;
    let typeTimer;


    function gradeInput() {
        const userInput = textInput.value;
        let correctChars = 0;
        for (let i = 0; i < secret.length; i++) {
            if (userInput[i] === secret[i]) {
                correctChars++;
            }
        }
        resultDiv.textContent = `You correctly remembered ${correctChars} characters.`;
        timerDiv.style.display = 'none'; // Hide the timer
    }
    revealButton.addEventListener('click', () => {
        const number = parseInt(numberInput.value);
        if (isNaN(number) || number < 0 || number > 50) {
            alert("Please enter a number between 0 and 50");
            return;
        }


        secret = number % 2 === 0 ? 'ilovetoeatpizza' : 'lveoatzazeoipti';
        secretDiv.textContent = secret;
        secretDiv.style.display = 'block';
        numberInput.style.display = 'none';  // Hide the number input
        revealButton.style.display = 'none'; // Hide the reveal button

        let timeLeft = 5; // 25 seconds
        timerDiv.textContent = `Time left to memorize: ${timeLeft} seconds`;
        memorizeTimer = setInterval(() => {
            timeLeft--;
            timerDiv.textContent = `Time left to memorize: ${timeLeft} seconds`;
            if (timeLeft <= 0) {
                clearInterval(memorizeTimer);
                secretDiv.style.display = 'none';
                inputArea.style.display = 'block';
                textInput.focus();

                let typingTime = 15;
                timerDiv.textContent = `Time left to type: ${typingTime} seconds`;
                typeTimer = setInterval(() => {
                    typingTime--;
                    timerDiv.textContent = `Time left to type: ${typingTime} seconds`;
                    if (typingTime <= 0) {
                        clearInterval(typeTimer);
                        textInput.disabled = true;
                        submitButton.disabled = true;
                        timerDiv.textContent = '';
                    }
                }, 1000);
            }
        }, 1000);
    });

    submitButton.addEventListener('click', () => {
        clearInterval(typeTimer); // Stop the timer
        textInput.disabled = true;
        submitButton.disabled = true;
        gradeInput(); // Grade the input
    });

    // Modify the existing typeTimer interval function
    if (typingTime <= 0) {
        clearInterval(typeTimer);
        textInput.disabled = true;
        submitButton.disabled = true;
        timerDiv.textContent = '';
        gradeInput(); // Call the grading function here as well
    }

});

//zmienne
let currentQuoteIndex = 0;	
let testCompleated = 0;
let startTime;
let smoothCursorEnabled = true;
let loggedIn = false;

//teksty na trzy poziomy
const quotes = [
    "lljj kljj lkkk ljlk ljll jllj lkjj kljj lljj jkkj llkk kljl kljk kkll jjkj klkj kjjk jklk jljk jkkkjklj kkkj ljjj kkjj ljkk",
    "Microsoft oraz Skype opracowali wspólnie system tłumaczenia mowy w czasie rzeczywistym. Chętni na studia filologiczne mogą teraz starać się o pracę w McDonaldzie bez tracenia 5 lat na studiowanie.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper, sapien tempor fringilla rutrum, libero leo feugiat urna, id volutpat lorem sem quis arcu. Aenean ornare nulla sit amet enim."
];

//domyślny uzytkownik 
const defaultUser = {
    "id": 1,
    "name": "Default User",
    "email": "1",
    "password": "1",
    "created_at": "",
    "updated_at": ""
};

//GLOWNA FUNKCJA
document.addEventListener('DOMContentLoaded', function () {
    
	//elementy strony
	const loginButton = document.getElementById('loginButton');
	const quoteElement = document.getElementById('quote');
	const inputBox = document.getElementById('inputBox'); //zakreslanie
	inputBox.addEventListener('input', checkTyping);
    
	const capslockWarning = document.getElementById('capslockWarning');
	
    const refreshButton = document.getElementById('refreshButton');
    const repeatButton = document.getElementById('repeatButton');
    const customButton = document.getElementById('customButton');
	
	const radioButtons = document.getElementsByName('quoteLevel');
	
	const statisticTable = document.getElementById('statisticTable'); 

	//wybór tekstu	
	function generateRandomQuote() {
        currentQuoteIndex = Math.floor(Math.random() * quotes.length);
    }
	
	/////////////////////////Obsługa Testu Pisania//////////////////////////////////////////////////////
	
    function startTypingPractice() {
        currentQuoteIndex = 0;
        displayQuote();
        inputBox.value = "";
        document.getElementById("feedback").innerText = "";
        startTime = new Date().getTime();
    }

    function displayQuote(customText) {
        const quoteContainer = document.getElementById("quote");
        quoteContainer.innerHTML = "";

        const textToDisplay = customText || quotes[currentQuoteIndex];
		const inputLength = inputBox.value.length;

        textToDisplay.split(' ').forEach(word => {
            const wordDiv = document.createElement("div");
            wordDiv.className = "word";

            word.split('').forEach((char, index) => {
                const charDiv = document.createElement("div");
                charDiv.className = "letter";
                charDiv.innerText = char;
				if (index < inputLength) {
					charDiv.classList.add("typed");
				}
                wordDiv.appendChild(charDiv);
            });

            quoteContainer.appendChild(wordDiv);
        });
    }

	//wazna funkcja
    function checkTyping() {
    const userInput = inputBox.value.toLowerCase();
    const currentQuote = quotes[currentQuoteIndex].toLowerCase();
    const feedbackElement = document.getElementById("feedback");
    const quoteContainer = document.getElementById("quote");
    const timerDisplay = document.getElementById("timerDisplay");
    const finishedTestsDisplay = document.getElementById("finishedTests");

    quoteContainer.innerHTML = "";

    for (let i = 0; i < currentQuote.length; i++) {
        const charSpan = document.createElement("span");
        charSpan.innerText = currentQuote[i];

        if (i < userInput.length) {
            if (userInput[i] === currentQuote[i]) {
                charSpan.classList.add("correct");
            } else {
                charSpan.classList.add("incorrect");
            }
        }
        quoteContainer.appendChild(charSpan);
    }

    if (userInput === currentQuote) {
        const endTime = new Date().getTime();
        const elapsedTime = (endTime - startTime) / 1000;
        feedbackElement.innerText = `Czas: ${elapsedTime.toFixed(2)} sekundy`;

        currentQuoteIndex++;
        testCompleated++;

        //aktualizacja po skończeniu
        timerDisplay.innerText = `Czas: ${elapsedTime.toFixed(2)} sekundy`;
        finishedTestsDisplay.innerText = `Ukończone lekcje: ${testCompleated}`;

        if (currentQuoteIndex < quotes.length) {
            displayQuote();
            startTime = new Date().getTime();
        } else {
            feedbackElement.innerText = "Ukończono Test!";
            quoteContainer.innerHTML = "";
            inputBox.value = "";
        }
    } else {
        feedbackElement.innerText = "";
		inputBox.value = "";
    }
}
	//////////////////////////////////////////////////////////////////////////////////////////////

	//start testu lub od nowa
    refreshButton.addEventListener('click', function () {
        generateRandomQuote();
        displayQuote();
    });

	//powtorz podejscie
    repeatButton.addEventListener('click', displayQuote);

	//dodaj wlasny tekst
    customButton.addEventListener('click', function () {
        const customText = prompt('Wprowadź własny tekst (wpisz lub wciśnij Ctrl + V):');
        if (customText !== null) {
            displayQuote(customText);
        }
    });
	
	//zaloguj
    loginButton.addEventListener('click', function () {
        if (!isLoggedIn()) {
            login();
        } else {
            alert('Jesteś już zalogowany.');
        }
    });
	
	//wybor poziomu trudnosci tekstu

	
	
	////////////////////////Tabela Statystyk///////////////////////////////////

    function updateCPMTable() {
        statisticTable.innerHTML = '<tr><th>Szybkość pisania CPM</th><th>Średnia szybkość pisania</th><th>Postęp</th><th>Ocena</th></tr>';

        const newRow = statisticTable.insertRow(-1);
		const cell1 = newRow.insertCell(0);
		const cell2 = newRow.insertCell(1);
		const cell3 = newRow.insertCell(2);
		const cell4 = newRow.insertCell(3);
    
		const currentSpeedZNM = getCurrentSpeedCPM();
		const averageSpeed = getAverageSpeed();
		const progress = getProgress();
		const rating = getRating();

		cell1.textContent = currentSpeedZNM;
		cell2.textContent = averageSpeed;
		cell3.textContent = progress;
		cell4.textContent = rating;
	}

	//funkcje zwracaja narazie podstawowe wartosci
    function getCurrentSpeedCPM() {
		return '40 wpm';
	}
	
	function getAverageSpeed() {
		return '45 wpm';
	}

	function getProgress() {
		return 'ukończ przynajmniej 2 testy';
	}
	
    function getRating(averageSpeed) {
		if (averageSpeed < 40) {
			return 'Musisz potrenować';
		} else if (averageSpeed >= 40 && averageSpeed < 60) {
			return 'Przeciętna szybkość';
		} else if (averageSpeed >= 60 && averageSpeed < 120) {
			return 'Dobra szybkość';
		} else if (averageSpeed >= 120) {
			return 'Super szybkość';
		} else {
			return 'Ukończ test';
		}
    }
	
	///////////////////////////////////////////////////////////////////////////////
	
	//funkcja rozpoczecie dzialania strony
    function init() {
        generateRandomQuote();
        displayQuote();
    }
	
	init();
    updateCPMTable();

	//logowanie
    function isLoggedIn() {
        return loggedIn;
    }

    function login() {
        const loginInput = prompt('Wprowadź login (domyślnie: 1):');
        const passwordInput = prompt('Wprowadź hasło (domyślnie: 1):');

        if (loginInput === defaultUser.email && passwordInput === defaultUser.password) {
            loggedIn = true;
            alert('Zalogowano user_1');
        } else {
            alert('Próba logowania zakończona niepowodzeniem.');
        }
    }
	
	//na razie nic nie robi
    function logout() {
        loggedIn = false;
        alert('Wylogowano user_1');
    }

    
});

//CapsLock
function updateCapslockWarning(event) {
    const isCapslockOn = event.getModifierState && event.getModifierState('CapsLock');

    if (isCapslockOn) {
        capslockWarning.style.display = 'block';
    } else {
        capslockWarning.style.display = 'none';
    }
}    

document.addEventListener('keyup', updateCapslockWarning);
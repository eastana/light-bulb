let matrix = [
    [7, 7, 7, 1, 7, 7, 7],
    [7, 0, 7, 7, 7, 2, 7],
    [7, 7, 7, 7, 7, 7, 7],
    [5, 7, 7, 5, 7, 7, 5],
    [7, 7, 7, 7, 7, 7, 7],
    [7, 5, 7, 7, 7, 2, 7],
    [7, 7, 7, 3, 7, 7, 7]
];

var minutes = 4;
var seconds = 59;

const startTimer = () => {    
    setInterval(() => {
        document.getElementById("timer").innerHTML = "0" + minutes + ":" + seconds + " left!";
        seconds--;
        if (seconds == 00) {
            minutes--;
            seconds = 60;
            if (minutes == 0) {
                minutes = 5;
            }
        }
    }, 1000);
}
var username = "";
const start = () => {
    document.getElementById("startButton").setAttribute("disabled", "disabled");
    document.getElementById("clearButton").disabled = false;
    document.getElementById("formName").hidden = true;
    
    username = document.getElementById("nameInput").value;
    document.getElementById("name").innerHTML = 'Hello ' + username;

    let temp = '';
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (matrix[i][j] == 7) {
                temp += '<div class="grid-item" onclick = bulb(' + i + ',' + j + ') id="id' + i + j + '"></div>\n';
            } else if (matrix[i][j] == 5) {
                temp += '<div class="grid-item black"></div>\n';
            } else {
                temp += '<div class="grid-item black">' + matrix[i][j] + '</div>\n';
            }
        }
    }

    let tag = document.createElement("div");
    tag.className = "grid-container";
    tag.innerHTML = temp;

    let timer = document.createElement("div");
    timer.className = "timer";
    timer.innerHTML = '<div style="display: block; margin-left: auto; margin-right: auto;"' +
                        'Countdown <span id="timer">05:00</span> left!</div> <br>' +
                        '<button onclick="finishGame()">Finish game</button>';

    document.getElementsByClassName("container").item(0).appendChild(tag);
    document.getElementsByClassName("container").item(0).appendChild(timer);
    startTimer();
    lastResult();
}

document.addEventListener('DOMContentLoaded', function() {
    lastResult();
 }, false);

const lastResult = () => {
    let username = sessionStorage.getItem("name");
    let time = sessionStorage.getItem("time");
    let status = sessionStorage.getItem("status");

    document.getElementById("lastName").innerHTML = username;
    document.getElementById("lastStatus").innerHTML = status;
    document.getElementById("lastTime").innerHTML = time;
}


const clearData = () => {
    const node = document.getElementsByClassName("grid-item");
    Array.from(node).forEach(el => {
        if (el.lastElementChild !== null && el.hasChildNodes()) {
            el.removeChild(el.lastElementChild)
        }
        if (el.getAttributeNames().length > 1) {
            el.style.backgroundColor = "white";
        }
    });
    minutes = 4;
    seconds = 59;
    lastResult();
}

const finishGame = () => {
    if (checkRes()) {
        alert("You won!")
        sessionStorage.setItem("status", "won");
    } else {
        alert("You lost!")
        sessionStorage.setItem("status", "lost");
    }
    sessionStorage.setItem("name", username);
    sessionStorage.setItem("time",(minutes + ' minutes ' + seconds + ' seconds').toString());
    clearData();
}


const checkRes = () => {
    let result = []
    const node = document.getElementsByClassName("grid-item");
    Array.from(node).forEach(el => {
        if (!el.classList.contains('black') && el.style.backgroundColor === 'yellow') {
            result.push(1);
        }
    });
    return result.length === 40 ? true : false;
}

const bulb = (i, j) => {
    placeImg(i, j)
}


const fillSquares = (i, j) => {
    if (i === 0 && j === 0) {
        correctFill(i, j);
        correctFill(i, j + 1);
        correctFill(i, j + 2);
        correctFill(i + 1, 0);
        correctFill(i + 2, 0);
    } else if (i === 0 && j === 5) {
        correctFill(i, j);
        correctFill(i, j + 1);
        correctFill(i, j - 1);
    } else if (i === 1 && j === 3) {
        correctFill(i, j);
        correctFill(i, j + 1);
        correctFill(i, j - 1);
        correctFill(i + 1, j);
    } else if (i === 1 && j === 6) {
        correctFill(i, j);
        correctFill(i - 1, j);
        correctFill(i + 1, j);
    } else if (i === 3 && j === 1) {
        correctFill(i, j);
        correctFill(i, j + 1);
        correctFill(i - 1, j);
        correctFill(i + 1, j);
    } else if (i === 4 && j === 5) {
        correctFill(i, j);
        correctFill(i, j + 1);
        correctFill(i - 1, j);
        correctFill(i - 2, j);
        while (j--) {
            correctFill(i, j);
        }
    } else if (i === 5 && j === 0) {
        correctFill(i, j);
        correctFill(i + 1, j);
        correctFill(i - 1, j);
    } else if (i === 5 && j === 0) {
        correctFill(i, j);
        correctFill(i + 1, j);
        correctFill(i - 1, j);
    } else if (i === 5 && j === 3) {
        correctFill(i, j);
        correctFill(i, j - 1);
        correctFill(i, j + 1);
        correctFill(i - 1, j);
    } else if (i === 5 && j === 6) {
        correctFill(i, j);
        correctFill(i - 1, j);
        correctFill(i + 1, j);
    } else if (i === 6 && j === 2) {
        correctFill(i, j);
        correctFill(i, j - 1);
        correctFill(i, j - 2);
        while (i--) {
            correctFill(i, j);
        }
    } else if (i === 6 && j === 4) {
        correctFill(i, j);
        correctFill(i, j + 1);
        correctFill(i, j + 2);
        while (i--) {
            correctFill(i, j);
        }
    } else {
        incorrectFill(i, j);
    }
}

const incorrectFill = (i, j) => {
    const el = document.getElementById("id" + i + j);
    const color = el.style.backgroundColor;

    if (color === "red") {
        document.getElementById("id" + i + j).style.backgroundColor = "white";
    } else {
        document.getElementById("id" + i + j).style.backgroundColor = "white";
    }
}

const correctFill = (i, j) => {
    const el = document.getElementById("id" + i + j);
    const color = el.style.backgroundColor;
    if (color === "yellow" && !hasLampOnWay(i, j)) {
        matrix[i][j] = 7;
        document.getElementById("id" + i + j).style.backgroundColor = "white";
    } else {
        matrix[i][j] = 9;
        document.getElementById("id" + i + j).style.backgroundColor = "yellow";
    }
}

const hasLampOnWay = (i, j) => {
    for (let k = i; k !== 0; k--) {
        if (k < 0 || matrix[k][j] < 7) {
           break;
        }
        if (matrix[k][j] === 8) {
            return true;
        }
    }

    for (let k = i; k !== 7; k++) {
        if (k > 6 || matrix[k][j] < 7) {
            break;
        }
        if (matrix[k][j] === 8) {
            return true;
        }
    }

    for (let k = j; k !== 0; k--) {
        if (k < 0 || matrix[i][k] < 7) {
            break;
        }
        if (matrix[i][k] === 8) {
            return true;
        }
    }

    for (let k = j; k !== 7; k++) {
        if (k > 6 || matrix[i][k] < 7) {
           break;
        }
        if (matrix[i][k] === 8) {
            return true;
        }
    }

    return false;
}

const placeImg = (i, j) => {
    const node = document.getElementById('id' + i + j)
    if (!node.hasChildNodes()) {
        fillSquares(i, j)

        matrix[i][j] = 8;

        let elem = document.createElement("img");

        elem.setAttribute("src", "./images/bulb.png");
        elem.setAttribute("alt", "Flower");

        elem.style = "display: block; margin-left: auto; margin-right: auto; width: 100%;"

        node.appendChild(elem)
    } else {
        matrix[i][j] = 7;
        fillSquares(i, j)

        node.removeChild(node.lastElementChild)
    }
}

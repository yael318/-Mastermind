
let focusCircle = 0;//העיגול הנוכחי
let guessColors = [];//מערך ניחשים של השחקן
let newGuessColors = [];
let secretColors = [];//מערך קוד סודי
let colorsNames = ["red", "orange", "yellow", "green", "blue", "LightBlue", "pink"];//צביעים
let colors = ["#d40202", "#fa931d", "#ffff00", "#23ce23", "#0b93bd", " #008080;", "#fc389c"];
let maxTrials;//כמות הנסיונות
let chooseLevel;//רמת הקושי הנבחה
let trials;//מונה נסינות 
let row = 0;



let startGame = function () {//מגרילה צבעים 
    trials = 1;
    // numRow = 1;
    secretColors = [];
    focusCircle = 0;
    document.getElementById("wining").style.visibility = "hidden";//מסתיר את הודעת הניצחון
    // פונקציה להגרלת 4 צבעים ייחודיים
    function generateRandomColors() {
        let usedColors = []; // מערך לאחסון צבעים שכבר נעשה בהם שימוש
        let colorIndex;

        // לולאה להגרלת 4 צבעים

        for (let i = 0; i < 4; i++) {
            // בחירת צבע אקראי
            do {
                colorIndex = Math.floor(Math.random() * 7);
            } while (usedColors.includes(colorIndex)); // בדיקה אם הצבע כבר נבחר

            // הוספת הצבע למערך הצבעים הסודיים
            secretColors.push(colorsNames[colorIndex]);

            // הוספת הצבע למערך הצבעים המשומשים
            usedColors.push(colorIndex);
        }
    }

    // הגרלת צבעים
    generateRandomColors();

    // הדפסת הצבעים הסודיים
    console.log(secretColors);
    createCircles();
    buttoncolor();
}




let createCircles = function () {//פונקציה לגישות
    guessColors = [];
    newGuessColors = [];
    focusCircle = 0;
    let circles = document.getElementById("circles");//גישה לhtml
    let checking = document.createElement("div");//checkingיצרית דיב בשם 
    checking.id = "checking";// שם id
    circles.appendChild(checking);//הוספת הדיב לעיגולים
    let buttonCheck = document.createElement("button");//יצרית כפתור 
    buttonCheck.id = "button-check";
    checking.appendChild(buttonCheck);
    buttonCheck.innerHTML = "בדיקה";//להכניס לכפתור "בדיקה"
    buttonCheck.addEventListener("click", checkGuess);// ארוע לחיצה בודק האם ....

    let circle;
    for (let i = 0; i < 4; i++) {
        circle = document.createElement("div");//יצרית דיב בשם cicle
        circle.className = "circle";
        circle.id = `circle-${i}-${row}`;//idעם מספר המקום בלולאה 
        circles.appendChild(circle);//  circlesנוצר הדיב בתוך 
        circle.addEventListener("click", function () {
            setFocus(i);
        });
    }
    let firstCircle = document.getElementById("circle-0-0");
    firstCircle.classList.add("get-color-focus");//משנה את העיצוב של הפוקוס הנוכחי 
}







let checkGuess = function () {//פונקציה שבודקת אם לא מילאו את 4 הצבעים
    if (!guessColors[0] || !guessColors[1] || !guessColors[2] || !guessColors[3]) {
        alert("יש לבחור ארבעה צבעים");
        return;
    }
    let checking = document.getElementById("checking");
    checking.innerHTML = " ";
    row++;
    bool_exsit(guessColors);//זימון פונקציה בדיקה
}



let setFocus = function (numCircle) {
    focusCircle = numCircle;
    for (let i = 0; i < 4; i++) {
        document.getElementById(`circle-${i}-${row}`).classList.remove("get-color-focus");// אם יש פוקוס מוריד אותו ומאתחל בברירת המחדל
        if (row > 0) {
            document.getElementById(`circle-${i}-${row - 1}`).classList.remove("get-color-focus");
        }
    }
    document.getElementById(`circle-${focusCircle}-${row}`).classList.add("get-color-focus");// אם אין פוקוס מוסיף לעיגול הנוכחי שקיבל את הגדרת הפוקוס4
}





//פונקציה שלוחצים על הצבעים 
let buttoncolor = function () {
    let colorButtons = document.querySelectorAll('.button-color');//גישה לכפתורי הצבעים
    colorButtons.forEach(color => {
        color.addEventListener("click", focuscolor = () => {
            let focusCircleButtun = document.getElementById(`circle-${focusCircle}-${row}`);//שליפת העיגול המפוקס
            focusCircleButtun.style.backgroundColor = color.id;//שינוי הצבע לפתור המפוקס לצבע הנבחר
            guessColors[focusCircle] = color.id;
            // console.log(guessColors);
            setFocus((focusCircle + 1) % 4);//מעביר את הפוקוס לעיגול הבא

        })
    })

}


let bool_exsit = function (guessColors) {
    let countbool = 0;//הגדרת ספירת הבולים
    let countexsit = 0;//הגדרת סיפרת הפגיעות

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (guessColors[j] === secretColors[i] && i === j)//בודק אם הוא בול
                countbool++;
            else {
                if (guessColors[j] === secretColors[i]) {//בודק אם הוא פגיעה 
                    countexsit++;
                }
            }


        }
    }
    if (countbool === 4) {//בודק בולים
        success();
    }
    if (maxTrials === trials) {//בודק את כמות ניסיונות
        gameOver();
    }
    let checking = document.getElementById("checking");//גישה לכפתור הבדיקה
    let marking = document.createElement("div");//יצירת דיב
    marking.className = "marking";//שם מחלקת הדיב
    checking.appendChild(marking);//הוספה לדיב 
    marking.innerHTML = "בול: " + countbool + " פגיעה: " + countexsit;//להדפיס את הבולים עם הפגיעות
    checking.id = "checking-" + trials;// כל פעם מעביר אתת הפקודה לכפתור הבדירה הבאה
    trials++;
    createCircles();//זימון פעולת העיגולים
    setFocus(0);

}
let success = function () {
    let sum = 80 + (5 - trials) * 10;// מחשבן את הסכום 
    let wining = document.getElementById("wining");// גישה לhtml
    wining.style.visibility = "visible";//מגלה אותו
    let score = document.getElementById("score");//גישה
    score.innerHTML = `<p>מספר הנסיונות שלך הוא: ${trials}<br>ניקוד: ${sum}</p>`;//מוסיף כיתוב של הנסינות וניקוד
    wining.style.backgroundImage = "url(../image/photofunky.gif)";//מוסיף את הזיקוקים
    wining.style.backgroundRepeat = "repeat-x"; 
}
let gameOver = function() {
    let losing = document.getElementById("losing");//גישה 
    losing.style.visibility = "visible";//מגלה את ההודעת הנפסדות


}





let showLevels = function () {
    chooseLevel = document.getElementById("choose-level");//גישה לבחירת הקושי
    chooseLevel.style.visibility = "visible";// מגלה אותו
    document.getElementById("circles").innerHTML = " ";// מוחק את מה שיש על הלוח האפור
}





let openGame = function () {
    let newGame = document.getElementById("new-game");// גישה לכפתור של משחק חדש
    newGame.addEventListener("click", showLevels);//בלחיצה על הכפתור הוא פותח את בחירת הרמה
    showLevels();// זימון
}




let easy = document.getElementById("easy");// גישה לאפשרות הקלה
easy.addEventListener("click", function () {// בחירה על הקל 
    maxTrials = 10;// מאפשר 10 ניסיונות
    chooseLevel.style.visibility = "hidden";//מכסה את בחירת הרמה להתחלת המשחק
    startGame();// זימון
});


let medium = document.getElementById("medium");//
medium.addEventListener("click", function () {
    maxTrials = 8;
    chooseLevel.style.visibility = "hidden";
    startGame();
});
let hard = document.getElementById("hard");
hard.addEventListener("click", function () {
    maxTrials = 6;
    chooseLevel.style.visibility = "hidden";
    startGame();
});


openGame();
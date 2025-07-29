let currentUser;
const Name = document.getElementById('Name');
const email = document.getElementById('Email');
const password = document.getElementById('Password');
const confirmPassword = document.getElementById('confirmPassword');
const form = document.getElementById('form');
const submitButton = document.getElementById('submitionButton')
const ValidName = document.getElementById('ValidName');
const ValidEmail = document.getElementById('ValidEmail');
const ValidPassword = document.getElementById('ValidPassword');
const ValidConfirmation = document.getElementById('ValidConfirmation');
const players = JSON.parse(localStorage.getItem('players'));


form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (Name.value === null || Name.value === '') {
        ValidName.innerText = "A Name is required";
        ValidName.style.color = "red";
        Name.style.border = "2px red solid";
    }
    if (Name.value.length < 3 || Name.value.length > 15) {//if the userName isn't valid
       ValidName.innerText = "the Name must contain between 3 to 15 characters";
        ValidName.style.color = "red";
        Name.style.border = "2px red solid";
    }
    else {
       ValidName.innerText = "";
        Name.style.border = "2px green solid";
        
    }
    if (password.value === '' || password.value === null) {
       ValidPassword.innerText = "A PassWord is required!";
        ValidPassword.style.color = "red";
        password.style.border = "2px red solid";
    }
    if (password.value.length < 6 || password.value.length > 15) {
       ValidPassword.innerText = "the password must contain between 6 and 15 characters!";
        ValidPassword.style.color = "red";
        password.style.border = "2px red solid";
    }
    else {
        ValidPassword.innerText = "";
        password.style.border = "2px green solid";
    }
    if (!(password.value === '') && !(Name.value === null)&&!(password.value.length < 6 || password.value.length > 15)&&!(Name.value.length < 3 || Name.value.length > 15)) {
        const players = JSON.parse(localStorage.getItem('players')) || [];
        for (let i = 0; i < players.length; i++) {
            if (players[i].Name ===Name.value && players[i].password === password.value) {
                currentUser = players[i];
            }
        }
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            window.location.href = "../html/homePageGames.html";
            alert(`Hi ${Name.value}!`);
        }
        else {
            alert("User was not found! please sign-in!");
           ValidName.innerText = "";
            Name.style.border = "2px red solid";
           ValidPassword.innerText = "please sigh-in";
            ValidPassword.style.color = "red";
            ValidPassword.style.textAlign = 'center';
        password.style.border = "2px red solid";
        }
    }
    let players = localStorage.getItem('players');
    players = JSON.parse(players);
    let user
    for(p of players){
       if(p.name===inputname.value&&p.password===password.value){
           user=p
       }
       if(user){
        window.location.href = '/game.html';
       }
       else
       window.location.href ='/sing_up.html'

       }
});
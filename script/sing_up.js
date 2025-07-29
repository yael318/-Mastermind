

const loginform = document.getElementById('loginform')
const inputname = document.getElementById('inputname')
const inputEmail = document.getElementById('email')
const password = document.getElementById('password')
const PasswordAuthentication = document.getElementById('PasswordAuthentication')
/*div הרשאה ל */
const errorname = document.getElementById('errorname')
const erroremail = document.getElementById('erroremail')
const errorpassword = document.getElementById('errorpassword')
const errorPasswordAuthentication = document.getElementById('errorPasswordAuthentication')
/*בדיקת תקינות שם*/
const checkname = (name) => {
    if (!name || name.length < 2 || name.length > 20) {
        errorname.textContent = 'error in your name.'
        return false;
    }
    return true;
}
/*בדיקת תקינות אימייל*/
const checkemail = (email) => {
    const shtrudel = email.includes('@')
    const index = email.indexOf('@')
    const point = email.includes('.', index + 1)
    if (!(shtrudel && point)) {
        erroremail.textContent = 'error in your email.'
        return false
    }
    return true;
}

/*בדיקת תקינות סיסמה*/
const checkpassword = (password) => {
    if (!password || password.length < 10) {
        errorpassword.textContent = 'error in your password.'
        return false;
    }
    const string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < password.length; i++) {
        if (string.indexOf(password[i]) == -1) {
            errorpassword.textContent = 'error in your password.'
            return false;
        }
    }
    return true;
}
/*בדיקת תקינות אימות הסיסמא*/
const checkPasswordAuthentication = (PasswordAuthentication, password) => {
    if (!PasswordAuthentication || PasswordAuthentication != password) {
        errorPasswordAuthentication.textContent = 'error in your PasswordAuthentication.'
        return false;
    }
    return true;
    
}

const checkform = (event) => {
    event.preventDefault();
    const resultname = checkname(inputname.value);
    const resultemail = checkemail(inputEmail.value);
    const resultpassword = checkpassword(password.value);
    const resultPasswordAuthentication = checkPasswordAuthentication(PasswordAuthentication.value, password.value);
    if (resultname && resultemail &&  resultpassword && resultPasswordAuthentication) {
       //save user in local storage
       let players = localStorage.getItem('players');
       players = JSON.parse(players);
       if(!players) {
        players = [];
       }

       //create user
  const userName={
     name:inputname.value,
     email:inputEmail.value,
     password:password.value,
     PasswordAuthentication:PasswordAuthentication.value
  }

       //push the user to the arr
       players.push(userName);

       //convert the arr to string
        const playersstring=JSON.stringify(players);


       //set the stringArr in the local storage
       
localStorage.setItem("players",playersstring);

       
        window.location.href = '/game.html';
    }
}
loginform.addEventListener('submit', checkform);
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';

import { auth, ref } from "../firebase.js"

document.getElementById('form').addEventListener('submit', handleSignUp);

export function handleSignUp(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();


    //    validation
    const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const useremail = { Email: email }
    //     
    //check user email in format 
    if (email === "") {
        document.getElementById("errmessage1").innerHTML = "**Fill the email Please!";
        return false;
    }
    //check user email in format
    if (!email.match(checkEmail)) {
        document.getElementById("errmessage1").innerHTML = "**!Please enter a valid emaill address";
        return false;
    }
    if (password === "") {
        document.getElementById("message").innerHTML = "**Fill the Password Please!";
        return false;
    }
    //minimum Password length validation
    if (password.length < 6) {
        document.getElementById("message").innerHTML = "**Password Lenght must be at least 6 Character";
        return false;
    }
    if (confirmPassword !== password) {
        document.getElementById("confirm-Error").innerHTML = "**Password doesn't match";
        return false;
    }
    if (confirmPassword === "") {

        document.getElementById("confirm-Error").innerHTML = "**This Field cann't be empty";
        return false;

    }

    firebase.auth().fetchSignInMethodsForEmail(email)
        .then(signInMethods => {
            if (signInMethods.length === 0) {
                // user doesn't exist  
                // create an account
                let userID = createUserWithEmailAndPassword(auth, email, password)
                    .then((credential) => {

                        // authenticated and logged in
                        const userId = credential.user.uid;
                        // save into db
                        ref.push(userId)
                            .then(() => {
                                var params = new URLSearchParams();
                                params.append("userId", userId);
                                //read user data
                                // set(ref(db, 'users/' + userId))
                                var url = "../course.html?" + params.toString();
                                //console.log(url)
                                location.href = url;
                            })

                    })
            }
            else {
                // throw an error that email already exist
                alert("User already exists")
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

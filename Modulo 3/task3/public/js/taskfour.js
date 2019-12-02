//Google
// Shortcuts to DOM Elements.
var signInButton = document.getElementById('sign-in-button');
var signOutButton = document.getElementById('sign-out-button');
var splashPage = document.getElementById('page-splash');

var currentUID;
function onAuthStateChanged(user) {
  // We ignore token refresh events.
  if (user && currentUID === user.uid) {
    return;
  }

  cleanupUi();
  if (user) {
    currentUID = user.uid;
    splashPage.style.display = 'none';
    writeUserData(user.uid, user.displayName, user.email, user.photoURL);
    startDatabaseQueries();
  } else {
    // Set currentUID to null.
    currentUID = null;
    // Display the splash page where you can sign-in.
    splashPage.style.display = '';
  }
}

/**
 * Starts listening for new posts and populates posts lists.
 */

/**
 * Writes the user's data to the database.
 */
// [START basic_write]
function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

// Bindings on load.
window.addEventListener('load', function() {
  // Bind Sign in button.
  signInButton.addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });

  // Bind Sign out button.
  signOutButton.addEventListener('click', function() {
    firebase.auth().signOut();
  });

  // Listen for auth state changes
  firebase.auth().onAuthStateChanged(onAuthStateChanged);

  recentMenuButton.onclick();
}, false);

//Facebook
// document.addEventListener('DOMContentLoaded', function() {
//   // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
//   // // The Firebase SDK is initialized and available here!
//   //
//    firebase.auth().onAuthStateChanged(user => { });
//    firebase.database().ref('/path/to/ref').on('value', snapshot => { });
//    firebase.messaging().requestPermission().then(() => { });
//   // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
//   //
//   // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

//   try {
//     let app = firebase.app();
//     let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
//     console.log(`Firebase SDK loaded with ${features.join(', ')}`);
//   } catch (e) {
//     console.error(e);
//     console.log('Error loading the Firebase SDK, check the console.');
//   }
// });

// creo el provider de autenticación
var providerfacebook = new firebase.auth.FacebookAuthProvider();

// opcionalmente modifico el scope
providerfacebook.addScope('user_friends');

// accedo al servicio de autenticación
var authService = firebase.auth();

// evento para el botón de login con facebook
document.getElementById('loginfacebook').addEventListener('click', function() {
// autentico con Facebook
authService.signInWithPopup(providerfacebook)
      .then(function(result) {
          //todo correcto
          console.log('autenticado usuario ', result.user);
      })
      .catch(function(error) {
          console.log('Detectado un error:', error);
      });
})
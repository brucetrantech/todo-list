- Construct the project:
    + Set up react-navigation for all screens.
    + Handle UI for: Welcome / Sign-In / Home / Splash screen.
    + Set up themes / fonts / cores (internal UI-library) for the project.
    + Set up commons as images / contents / screeen names.
    + Set up redux with @reduxjs/toolkit (latest version: 2.2.1) and redux-thunk.
    + Set up AsyncStorage which works as the api-actions fully (CRUD).
    + Set up relative path for all folders.

- Splash Screen:
    + Check signed-in user with email firstly, and navigate to the right screen
    + Set up simple UI as the same as launched screen

- Welcome Screen:
    + Introduction and simeple UI.
    + Navigate to Sign-In screen.

- Sign-In screen:
    + focusable text input
    + validation email when entering
    + Click "Done"/"OK" on keyboard to effect the sign-in flow
    + Open / Dismiss the keyboard when typing email.

- Home screen:
    + Handle get-tasks / set-tasks / remove-tasks / edit-tasks.
    + Swipe item list to open the options: Edit / Delete
    + Handle "done" item list in checkbox-circle.
    + Open / Dismiss the keyboard when typing the new task.

- Write unit-test with Jest
    + ...
    + ...

- Setup to launch on Android
    + Set icon app / launch screen.

1. Improve swipe action automate close after clicking the detail action.
2. Write unit tests with Jest.
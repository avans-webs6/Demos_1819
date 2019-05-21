// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBYwHhTt04VeSjHbaM8OYNmZmJ-tCmKMOk",
    authDomain: "blogmanager-bdfa4.firebaseapp.com",
    databaseURL: "https://blogmanager-bdfa4.firebaseio.com",
    projectId: "blogmanager-bdfa4",
    storageBucket: "blogmanager-bdfa4.appspot.com",
    messagingSenderId: "340374091991"
  }
};

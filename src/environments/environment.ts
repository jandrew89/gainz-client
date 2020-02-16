// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  sessionPlanUrl: 'http://localhost:7071/api/',
  liftUrl: 'http://localhost:7080/api/',
  sessionUrl: 'http://localhost:7090/api/',
  authApiRoot: 'https://securingangularappscoursev2-api-unsecure.azurewebsites.net/api',
  stsAuthRoot: 'https://reactjs-dev.auth0.com/',
  //stsAuthRoot: 'https://securingangularappscoursev2-sts.azurewebsites.net/',
  
  clientId: 'wS6YWvYh4Utwb8KC4MjY5ETKsRuRIWOB',
  //clientId: 'spa-client',
  rootUrl: 'http://localhost:4200/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

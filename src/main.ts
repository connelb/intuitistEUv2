import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
//import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
//import API from '@aws-amplify/api';
import Amplify, { Auth } from 'aws-amplify';
import { ClientMetaData, SignInOpts } from '@aws-amplify/auth/src/types/Auth';

// import awsconfig from "./aws-exports";
//Amplify.configure(awsconfig);

import awsconfig from "./aws-exports"
Amplify.configure(awsconfig);

// Amplify.configure({
//   Auth: {
//     identityPoolId: awsconfig.aws_cognito_identity_pool_id,// 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab', //REQUIRED - Amazon Cognito Identity Pool ID
//     region: awsconfig.aws_cognito_region,//'XX-XXXX-X', // REQUIRED - Amazon Cognito Region
//     userPoolId: awsconfig.aws_user_pools_id,//'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito User Pool ID
//     userPoolWebClientId: awsconfig.aws_user_pools_web_client_id//'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito Web Client ID
//   }
// });

// const config = {
//   Auth: {
//     mandatorySignIn: true,
//     identityPoolId: AWS_COGNITO_IDENTITYPOOL_ID,
//     region: AWS_REGION,
//     userPoolId: AWS_COGNITO_USERPOOL_ID,
//     userPoolWebClientId: AWS_COGNITO_USERPOOL_WEBCLIENT_ID,
//   },
//   aws_appsync_graphqlEndpoint: '/graphql',
//   aws_appsync_region: AWS_REGION,
//   aws_appsync_authenticationType: APPSYNC_AUTH_TYPE,
// };


// const oauth = awsconfig.oauth
// Auth.configure({
//   oauth: oauth,
//   region:  "eu-west-1",
//   userPoolId: "eu-west-1_5Ieij0FKG",
//   userPoolWebClientId: "3hhmma3vbaptvj2kr10qftfder"
// });
// Amplify.configure({
//   "aws_appsync_region": "eu-west-1"
// })

// Amplify.configure({
//   Auth: {

//     // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
//     //identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
//     identityPoolId: "eu-west-1:306a8427-73f8-4068-b6d3-19cad50aa36c",

//     // REQUIRED - Amazon Cognito Region
//     //region: 'XX-XXXX-X',
//     region: "eu-west-1",

//     // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
//     // Required only if it's different from Amazon Cognito Region
//     //identityPoolRegion: 'XX-XXXX-X',

//     // OPTIONAL - Amazon Cognito User Pool ID
//     //userPoolId: 'XX-XXXX-X_abcd1234',
//     userPoolId: "eu-west-1_5Ieij0FKG",

//     // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//     // userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',
//     userPoolWebClientId: "3hhmma3vbaptvj2kr10qftfder",

//     // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//     mandatorySignIn: true,

//     // OPTIONAL - Configuration for cookie storage
//     // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
//     // cookieStorage: {
//     // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
//     //     domain: '.yourdomain.com',
//     // // OPTIONAL - Cookie path
//     //     path: '/',
//     // // OPTIONAL - Cookie expiration in days
//     //     expires: 365,
//     // // OPTIONAL - Cookie secure flag
//     // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
//     //     secure: true
//     // },

//     // OPTIONAL - customized storage object
//     // storage: new MyStorage(),

//     // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
//     authenticationFlowType: 'USER_SRP_AUTH',

//     // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
//     clientMetadata: { myCustomKey: 'myCustomValue' },

//     // OPTIONAL - Hosted UI configuration
//     oauth: {
//       domain: "intuitisteu503f9258-503f9258-dev.auth.eu-west-1.amazoncognito.com",
//       scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
//       redirectSignIn: 'https://www.vizsolution.com/',
//       redirectSignOut: 'https://www.vizsolution.com/',
//       responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
//     }
//   },
//   aws_appsync_graphqlEndpoint: "https://f4w5ugxydneezmrdeekp7xi4zy.appsync-api.eu-west-1.amazonaws.com/graphql",
//   aws_appsync_region: "eu-west-1",
//   aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
//   "aws_content_delivery_bucket": "intuitistu-20200314174821-hostingbucket-dev",
//   "aws_content_delivery_bucket_region": "eu-west-1",
//   "aws_content_delivery_url": "https://d1z1irm5w58syp.cloudfront.net",
//   Storage: {
//     AWSS3: {
//       bucket: "intuitisteuc85246d9d3644fd3868f842cfbbd038f142305-dev",//awsconfig.aws_user_files_s3_bucket,// '', //REQUIRED -  Amazon S3 bucket
//       region: "eu-west-1"//awsconfig.aws_user_files_s3_bucket_region//'XX-XXXX-X', //OPTIONAL -  Amazon service region
//     }
//   }
// });

//const currentConfig = Auth.configure();
// {
//   domain: awsconfig.aws_content_delivery_url'XXXXXX.auth.us-west-2.amazoncognito.com',
//   scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
//   redirectSignIn: 'http://localhost:3000/',
//   redirectSignOut: 'http://localhost:3000/',
//   responseType: 'code'
// };


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

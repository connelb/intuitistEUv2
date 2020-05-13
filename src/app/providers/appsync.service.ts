import { Injectable } from '@angular/core';
import AWSAppSyncClient from 'aws-appsync';
import aws_exports from '../../aws-exports';
//import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { AUTH_TYPE } from 'aws-appsync-auth-link/lib/auth-link'
import { Auth } from 'aws-amplify';



// import { reqQuery } from './graphql/queries/getAppsyncVote';
// import { reqSubscription } from './graphql/subscriptions/onUpdateAppsyncVote';
// import { Injectable } from '@angular/core';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
// import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable()
export class AppsyncService {

  _hc;

  constructor() {
    const client = new AWSAppSyncClient({
      url: aws_exports.aws_appsync_graphqlEndpoint,
      region: aws_exports.aws_project_region,
      auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
      }
    });
    // this.hc = client.hydrated;
    this._hc = client;
  }

  hc() {
    return this._hc.hydrated();
  }


  public updateAppsyncVote(): Observable<object> {
    return from(API.graphql(graphqlOperation(`mutation UpdateUser3Card3($input: UpdateUser3Card3Input!, $condition: ModelUser3Card3ConditionInput) {
      updateUser3Card3(input: $input, condition: $condition) {
        __typename
        id
        status
        score
        user3 {
          __typename
          id
          username
          firstName
          lastName
          email
          image
          level
          progress
          createdAt
          updatedAt
          userState
          cards3 {
            __typename
            nextToken
            startedAt
          }
          videos3 {
            __typename
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          owner
        }
        card3 {
          __typename
          id
          question
          answer
          audio
          video
          level
          order
          keywords
          lesson3 {
            __typename
            id
            name
            description
            section
            subSection
            level
            video
            keywords
            _version
            _deleted
            _lastChangedAt
          }
          users3 {
            __typename
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
    }`))).pipe(
      map(result => result['data']['updateAppsyncVote']['vote'])
    );
  }

  public getAppsyncVote(): Observable<object> {
    return from(API.graphql(graphqlOperation(`query {
      getAppsyncVote(id:"test"){
    vote
      }
    }`))).pipe(
      map(result => result['data']['getAppsyncVote']['vote'])
    );
  }

  public onUpdateAppsyncVote(): any {
    // return API.graphql(graphqlOperation(query:///.OnUpdateUser3Card3Listener
    return API.graphql(graphqlOperation(
      `subscription testsub {
      onUpdateAppsyncVote(id: "test") {
        vote
      }
    }`
  ));
  }

  



//   OnUpdateUser3Card3Listener: Observable<
//   OnUpdateUser3Card3Subscription
// > = API.graphql(
//   graphqlOperation(
//     `subscription OnUpdateUser3Card3 {
  
}
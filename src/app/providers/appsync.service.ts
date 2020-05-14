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


  public UpdateUser3Card3(): Observable<object> {
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

  public ListUser3Card3s(userId): Observable<Array<object>> {
    return from(API.graphql(graphqlOperation(`
    query ListLessonsByUser($user3Card3User3Id: ID!) {
      listLesson3s {
        __typename
        items {
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
          cards3(limit:60) {
            __typename
            items {
              id
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
              users3(filter: {user3Card3User3Id: {eq: $user3Card3User3Id}}) {
                __typename
                items {
                  user3 {
                    id
                    videos3 {
                      __typename
                      items {
                        id
                        status
                        score
                      }
                    }
                  }
                  id
                  score
                  status
                  
                }
              }
            }
          }
        }
      }
    }
    `,{user3Card3User3Id: userId}))).pipe(
      map(result => result['data']['listLesson3s']['items'])
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

  // async ListLessonsByUser() {
  //   await Auth.currentAuthenticatedUser({
  //     bypassCache: false
  //   }).then(async user => {
  //     this.user = user;
   

  //   await this.appsync.hc().then(client => {
  //     const observable: ObservableQuery = client.watchQuery({
  //       query: ListLessonsByUser,
  //       variables: { user3Card3User3Id: this.user.attributes.sub },
  //       fetchPolicy: 'cache-and-network'
  //     });

  //     observable.subscribe(({ data }) => {
  //       if (!data) { return console.log('ListLessonsByUser: no data'); }
        
  //       this.lessons = data.listLesson3s.items.sort((a, b) => +a.level - +b.level);
  //       //console.log('this.lessons',this.lessons)
  //       //this.formatListLessonsByUser(data);
  //     });


  //     // observable.subscribeToMore({
  //     //   document: subscribeToNewUserUsers,
  //     //   updateQuery: (prev: UsersQuery, {subscriptionData: {data: {subscribeToNewUsers: user }}}) => {
  //     //     console.log('updateQuery on convo subscription', user, prev);
  //     //     // return this._user.id === user.id ? prev : addUser(prev, user);
  //     //   }
  //     // });

  //     this.observedQuery = observable;
  //     return observable;
  //   });
  // })
  // }
  
}
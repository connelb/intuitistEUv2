import {
    APIService,
    CreateLesson3Input,
    ModelLesson3ConditionInput,
    CreateLesson3Mutation,
    CreateUser3Card3Input,
    OnCreateUser3Card3Subscription,
    OnUpdateUser3Card3Subscription,
OnDeleteVideoObjectSubscription,
OnUpdateVideoObjectSubscription,
OnCreateVideoObjectSubscription,
OnDeleteVodAssetSubscription,
OnUpdateVodAssetSubscription,
// OnCreateVodAssetSubscription,
OnDeleteUser3Video3Subscription,
OnUpdateUser3Video3Subscription,
 OnCreateUser3Video3Subscription,
OnDeleteUser3Card3Subscription,
OnDeleteUser3Subscription,
OnUpdateUser3Subscription,
OnCreateLesson3Subscription,
OnUpdateLesson3Subscription,
OnDeleteLesson3Subscription,
OnCreateCard3Subscription,
OnUpdateCard3Subscription,
OnDeleteCard3Subscription,
OnCreateUser3Subscription
    
  } from "./API.service";

  import API, { graphqlOperation } from "@aws-amplify/api";
  import * as Observable from "zen-observable";
  import { Injectable } from "@angular/core";
  // import * as Observable from "zen-observable";
import { Observable as rxObservable, Subject } from 'rxjs';


//   @Injectable({
//     providedIn: 'root'
//   })
//   export class AdminGuardService implements CanLoad {
  
  @Injectable({
    providedIn: "root"
  })

  export class MyAPIService extends APIService {
    constructor() {
      super();
    }

    OnCreateLesson3Listener: Observable<
    OnCreateLesson3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateLesson3 {
        onCreateLesson3 {
          __typename
          id
          name
          description
          section
          subSection
          level
          video
          keywords
          cards3 {
            __typename
            items {
              __typename
              id
              question
              answer
              audio
              video
              level
              order
              keywords
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnUpdateLesson3Listener: Observable<
    OnUpdateLesson3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateLesson3 {
        onUpdateLesson3 {
          __typename
          id
          name
          description
          section
          subSection
          level
          video
          keywords
          cards3 {
            __typename
            items {
              __typename
              id
              question
              answer
              audio
              video
              level
              order
              keywords
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnDeleteLesson3Listener: Observable<
    OnDeleteLesson3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteLesson3 {
        onDeleteLesson3 {
          __typename
          id
          name
          description
          section
          subSection
          level
          video
          keywords
          cards3 {
            __typename
            items {
              __typename
              id
              question
              answer
              audio
              video
              level
              order
              keywords
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnCreateCard3Listener: Observable<OnCreateCard3Subscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateCard3 {
        onCreateCard3 {
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
            cards3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnUpdateCard3Listener: Observable<OnUpdateCard3Subscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateCard3 {
        onUpdateCard3 {
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
            cards3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnDeleteCard3Listener: Observable<OnDeleteCard3Subscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteCard3 {
        onDeleteCard3 {
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
            cards3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnCreateUser3Listener: Observable<OnCreateUser3Subscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser3($owner: String) {
        onCreateUser3(owner: $owner) {
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
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          videos3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`
    )
  ) as any;

  OnUpdateUser3Listener: Observable<OnUpdateUser3Subscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser3($owner: String) {
        onUpdateUser3(owner: $owner) {
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
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          videos3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`
    )
  ) as any;

  OnDeleteUser3Listener: Observable<OnDeleteUser3Subscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser3($owner: String) {
        onDeleteUser3(owner: $owner) {
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
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          videos3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`
    )
  ) as any;

  OnCreateUser3Card3Listener: Observable<
    OnCreateUser3Card3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser3Card3 {
        onCreateUser3Card3 {
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
              createdAt
              updatedAt
            }
            users3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnUpdateUser3Card3Listener: Observable<
    OnUpdateUser3Card3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser3Card3 {
        onUpdateUser3Card3 {
          __typename
          id
          status
          score
        }
      }`
    )
  ) as any;

  OnDeleteUser3Card3Listener: Observable<
    OnDeleteUser3Card3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser3Card3 {
        onDeleteUser3Card3 {
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
              createdAt
              updatedAt
            }
            users3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnCreateUser3Video3Listener: Observable<
    OnCreateUser3Video3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser3Video3 {
        onCreateUser3Video3 {
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
          video3 {
            __typename
            id
            title
            description
            users3 {
              __typename
              nextToken
              startedAt
            }
            video {
              __typename
              id
              token
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnUpdateUser3Video3Listener: Observable<
    OnUpdateUser3Video3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser3Video3 {
        onUpdateUser3Video3 {
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
          video3 {
            __typename
            id
            title
            description
            users3 {
              __typename
              nextToken
              startedAt
            }
            video {
              __typename
              id
              token
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnDeleteUser3Video3Listener: Observable<
    OnDeleteUser3Video3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser3Video3 {
        onDeleteUser3Video3 {
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
          video3 {
            __typename
            id
            title
            description
            users3 {
              __typename
              nextToken
              startedAt
            }
            video {
              __typename
              id
              token
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  // OnCreateVodAssetListener: Observable<
  //   OnCreateVodAssetSubscription
  // > = API.graphql(
  //   graphqlOperation(
  //     `subscription OnCreateVodAsset {
  //       onCreateVodAsset {
  //         __typename
  //         id
  //         title
  //         description
  //         users3 {
  //           __typename
  //           items {
  //             __typename
  //             id
  //             status
  //             score
  //             _version
  //             _deleted
  //             _lastChangedAt
  //             createdAt
  //             updatedAt
  //           }
  //           nextToken
  //           startedAt
  //         }
  //         video {
  //           __typename
  //           id
  //           token
  //           _version
  //           _deleted
  //           _lastChangedAt
  //           createdAt
  //           updatedAt
  //         }
  //         _version
  //         _deleted
  //         _lastChangedAt
  //         createdAt
  //         updatedAt
  //       }
  //     }`
  //   )
  // ) as any;

  OnUpdateVodAssetListener: Observable<
    OnUpdateVodAssetSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVodAsset {
        onUpdateVodAsset {
          __typename
          id
          title
          description
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          video {
            __typename
            id
            token
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnDeleteVodAssetListener: Observable<
    OnDeleteVodAssetSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVodAsset {
        onDeleteVodAsset {
          __typename
          id
          title
          description
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
            }
            nextToken
            startedAt
          }
          video {
            __typename
            id
            token
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
          }
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnCreateVideoObjectListener: Observable<
    OnCreateVideoObjectSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVideoObject {
        onCreateVideoObject {
          __typename
          id
          token
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnUpdateVideoObjectListener: Observable<
    OnUpdateVideoObjectSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVideoObject {
        onUpdateVideoObject {
          __typename
          id
          token
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;

  OnDeleteVideoObjectListener: Observable<
    OnDeleteVideoObjectSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVideoObject {
        onDeleteVideoObject {
          __typename
          id
          token
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }`
    )
  ) as any;
      }

import {
    APIService,
    CreateLesson3Input,
    ModelLesson3ConditionInput,
    CreateLesson3Mutation
    
  } from "./API.service";

  import API, { graphqlOperation } from "@aws-amplify/api";
  import * as Observable from "zen-observable";
  import { Injectable } from "@angular/core";


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
}

    // async CreateLesson3(
    //     input: CreateLesson3Input,
    //     condition?: ModelLesson3ConditionInput
    //   ): Promise<CreateLesson3Mutation> {
    //     const statement = `mutation CreateLesson3($input: CreateLesson3Input!, $condition: ModelLesson3ConditionInput) {
    //         createLesson3(input: $input, condition: $condition) {
    //           __typename
    //           id
    //           name
    //           description
    //           section
    //           subSection
    //           level
    //           video
    //           keywords
    //           cards3 {
    //             __typename
    //             items {
    //               __typename
    //               id
    //               question
    //               answer
    //               audio
    //               video
    //               level
    //               order
    //               keywords
    //               _version
    //               _deleted
    //               _lastChangedAt
    //             }
    //             nextToken
    //             startedAt
    //           }
    //           _version
    //           _deleted
    //           _lastChangedAt
    //         }
    //       }`;
    //     const gqlAPIServiceArguments: any = {
    //       input
    //     };
    //     if (condition) {
    //       gqlAPIServiceArguments.condition = condition;
    //     }
    //     const response = (await API.graphql(
    //       graphqlOperation(statement, gqlAPIServiceArguments)
    //     )) as any;
    //     return <CreateLesson3Mutation>response.data.createLesson3;
    //   }

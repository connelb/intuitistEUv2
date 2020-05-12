import { Pipe, PipeTransform } from '@angular/core';
import gql from 'graphql-tag';
// import { API, graphqlOperation } from "aws-amplify";
// import { Auth } from 'aws-amplify';
import { AppsyncService } from '../../providers/appsync.service';

// import { AppsyncService } from '../appsync.service';
// import { Auth, Storage } from 'aws-amplify';
// import * as d3Array from 'd3-array';
// import * as d3Collection from 'd3-collection';
// import { CardsPage } from '../../cards/cards.page';
// import { ObservableQuery } from 'apollo-client';
// 

const GetUser3Video3 =
  gql`query GetUser3Video3Id($user3Video3User3Id: ID!, $user3Video3Video3Id: ID!){
  listUser3Video3s(filter: {user3Video3User3Id: {eq: $user3Video3User3Id}, user3Video3Video3Id: {eq: $user3Video3Video3Id} }){
    items {
      id
      score
      status
      _version
    }
  }
}`

@Pipe({
  name: 'videoScoreCards'
})
export class VideoScoreCardsPipe implements PipeTransform {

  // transform(value: any, ...args: any[]): any {
  // transform(lesson: any, userId: any, type?: any) {
  constructor(private appsync: AppsyncService) { }

  lesson: any;
  cachedData:any;
  transform(lesson: any, userId: any, type?: any) {
    this.lesson = Object.assign({}, lesson);
    this.cachedData = 0;

    this.appsync.hc().then(client => {
      client.watchQuery({
        query: GetUser3Video3,
        variables: { user3Video3User3Id: userId, user3Video3Video3Id: this.lesson.video },
        fetchPolicy: 'cache-only'
        // fetchPolicy: 'cache-and-network'
      }).subscribe(result => {
        if (!result) { };
        if (result.data.listUser3Video3s) {
          this.cachedData = (result.data.listUser3Video3s.items.length > 0) ? result.data.listUser3Video3s.items[0].score : 0.1
          console.log('result of videoScoreCards pipe?', this.cachedData)
        }
      });
    })

    console.log('return this.cachedData', this.cachedData)
    return this.cachedData / 30;

  }
}

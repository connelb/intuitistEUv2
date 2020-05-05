import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, AlertController, ToastController } from '@ionic/angular';
import { Network } from '@ngx-pwa/offline';
import gql from 'graphql-tag';
import { Auth } from 'aws-amplify';
import { AppsyncService } from '../providers/appsync.service';

const ListUserCardsByUser = gql
  `query ListUser3Card3s($filter: ModelUser3Card3FilterInput) {
  listUser3Card3s(filter: $filter) {
    items {
      __typename
      id
      status
      score
      _version
    }
    __typename
  }
}`

const ListLessonsByUserByLesson = gql`
query ListLessonsByUserByLesson($id:ID!,$user3Card3User3Id:ID){
  listLesson3s(filter:{id:{eq:$id}}) {
    items {
      __typename
      id
      name
      description
      section
      subSection
      video
      _version
      cards3(limit:60) {
        __typename
        items {
          id
          question
          answer
          audio
          order
          _version
          _deleted
          users3(filter: {user3Card3User3Id: {eq: $user3Card3User3Id}}) {
            __typename
            items {
              __typename
              id
              user3 {
                id
                username
                _lastChangedAt
                _version
                videos3 {
                  __typename
                  items {
                    id
                    status
                    score
                    _version
                  }
                }
              }
              score
              status
              _version
            }
          }
        }
      }
    }
  }
}
`

const ListLessonsByUser = gql`
query ListLessonsByUser($user3Card3User3Id: ID!) {
  listLesson3s {
    items {
      id
      name
      description
      section
      subSection
      level
      video
      keywords
      cards3(limit:60) {
        items {
          id
          question
          answer
          audio
          order
          _version
          lesson3 {
            id
            video
          }
          users3(filter: {user3Card3User3Id: {eq: $user3Card3User3Id}}) {
            items {
              user3 {
                id
                videos3 {
                  items {
                    id
                    status
                    score
                    _version
                  }
                }
              }
              id
              score
              status
              _version
            }
            __typename
          }
        }
      }
    }
  }
}
`

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  online$ = this.network.onlineChanges;
  public width: number = 0;
  public height: number = 0;
  user: any;
  myData: any[];

  constructor(private platform: Platform, private appsync: AppsyncService,protected network: Network) { }

  async ngOnInit() {
    await Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.user = user;
    });

    this.getUserCards();
  }

  getUserCards() {
    this.appsync.hc().then(client => {
      //id: "029da2be-42ae-4227-8c30-b0f260a0affc", 

      client.query({
        query: ListLessonsByUser,
        variables: { user3Card3User3Id: this.user.attributes.sub },
        fetchPolicy: 'network-only'
      })


        // const options = {
        //   query: ListUserCardsByUser,
        //   fetchPolicy: 'network-only',
        //   variables: {
        //     user3Card3User3Id: this.user.attributes.sub
        //   },
        //   __typename: "ModelUser3Card3Connection"
        // };

        // proxy.writeQuery({
        //   ...options, data: {
        //     listUser3Card3s: {
        //       items: [{ ..._UserCardToUpdate }],
        //       "__typename": "ModelUser3Card3Connection"
        //     }
        //   }
        // });


        //client.query({ query: query, fetchPolicy: 'network-only' })   //Uncomment for AWS Lambda
        .then(data => {
          let temp = [];
          //console.log("KJKKJ",data.data.listLesson3s.items)//.cards3.items.users3.items)//.cards3.items.users3.items)
          //cards.items.length>0
          data.data.listLesson3s.items.map(d => {
            if (d.cards3.items.length > 0) {
              d.cards3.items.map(dd => {
                if (dd.users3.items.length > 0) {
                  dd.users3.items.map(ddd => {
                    temp.push({
                      lesson: d.name,
                      usercardId: ddd.id,
                      status: ddd.status,
                      score: ddd.score
                    })
                  })
                }
              })
            }
          })
          console.log('temp', temp)
          this.myData = temp;

          // const reduceFn = data => d3Array.sum(data, d => d['score']);

          // const rollupData = d3Array.rollup(this.myData1, reduceFn, d => d['name']);

          // const childrenAccessorFn = ([key, value]) => value.size && Array.from(value)

          //   function logData(data) {
          //     console.log('results of query: ', data);
          // }


          // if ((data.data.listUser3Card3s.items.length) ? true : false) {
          //   //console.log('prior to update',data, data.data.listUser3Card3s.items)
          //   this.myUpdateUserCard(data, card, i)
          // } else {
          //   //console.log('prior to create',data, data.data.listUser3Card3s.items)
          //   this.myCreateUserCard(card, i);
          // }
        })
        .catch(console.error);
    });
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.width = this.platform.width();
      this.height = this.platform.height();
    });
  }

}

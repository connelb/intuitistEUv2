import { Component, OnInit, ElementRef, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { CardPage } from '../card/card.page';
import { BehaviorSubject } from 'rxjs';
import gql from 'graphql-tag';
import { AppsyncService } from '../providers/appsync.service';
import { Auth } from 'aws-amplify';


const getUserCardId =
  gql`query getCardsUserId($user3Card3User3Id: ID, $user3Card3Card3Id: ID)  {
  listUser3Card3s(filter: {user3Card3User3Id: {eq: $user3Card3User3Id}, user3Card3Card3Id: {eq: $user3Card3Card3Id} }) {
    items {
      __typename
      id
      _version
      status
      score
    }
  }
}
`
const updateUserCard = gql`
mutation updateUserCard ($id: ID, $status: cardStatus, $score: Int, $_version:Int){
  updateUser3Card3(input:{id: $id, status: $status, score: $score,_version:$_version}) {
    __typename
    status
    score
    id
    card3 {
      id
      __typename
   }
    user3 {
     id
     __typename
  }
    _version
  }
}
`

const createUserCardId = gql`
mutation createUser3Card3($user3Card3User3Id: ID,$user3Card3Card3Id: ID, $status:cardStatus, $score:Int) {
    createUser3Card3(input: {user3Card3User3Id:$user3Card3User3Id, user3Card3Card3Id: $user3Card3Card3Id, status: $status, score:$score}) {
      __typename
      id
      status
      score
      user3 {
        __typename
        id
      }
      _version
    }
}
`

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


@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.page.html',
  styleUrls: ['./review-modal.page.scss'],
})
export class ReviewModalPage implements OnInit {

  @Input() lesson: any;

  public width: number = 0;
  public height: number = 0;

  myCards: MyDataType[] = [];
  reviewList$: BehaviorSubject<MyDataType[]>;
  toUpdate: boolean = false;
  user: any;

  constructor(public modalController: ModalController, private platform: Platform, private appsync: AppsyncService) { }

  async ngOnInit() {
    await Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.user = user;
    })

    this.lesson.cards3.items.forEach(element => {
      this.myCards.push({
        answer: element.answer,
        audio: element.audio,
        cardId: element.id,
        question: element.question,
        order: element.order,
        user3Card3Card3Id: (element.users3.items.length > 0) ? element.users3.items[0].id : "",
        score: (element.users3.items.length > 0) ? element.users3.items[0].score : 0,
        status: (element.users3.items.length > 0) ? element.users3.items[0].status : "toDo",
        _version: (element.users3.items.length > 0) ? element.users3.items[0]._version : 0,
        toUpdate: this.toUpdate
      })

      this.reviewList$ = new BehaviorSubject<MyDataType[]>(this.myCards.sort((a, b) => +a.order - +b.order));
    });
  }


  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.width = this.platform.width();
      this.height = this.platform.height();
    });
  }

  dismiss() {
    var cardsToUpdate = this.myCards.filter(function (el) {
      return el.toUpdate == true
    });

    //appsync
    cardsToUpdate.forEach(d=>{
      // console.log('each card to update, cardId,user3Card3Card3Id, user3Card3Card3Id',d);
        this.createOrUpdateUserCard(d)
    })

    this.modalController.dismiss(cardsToUpdate);
  }

  async showCard(card) {
    return this.loadModal(card);
  }


  async loadModal(card) {
    const modal = await this.modalController.create({
      component: CardPage,
      componentProps: {
        card: card
      }
    });

    modal.onDidDismiss().then((data) => {

      // updating myCards from cards page, updates myCards
      for (var i = 0; i < this.myCards.length; i++) {
        if (this.myCards[i].cardId == data.data['cardId']) {
          if (data.data['status'] == "done") {
            this.myCards[i].status = "done";
            this.myCards[i].score = 1;
            this.myCards[i].toUpdate = true;
          } else {
            this.myCards[i].status = "doing";
            this.myCards[i].score = 0;
            this.myCards[i].toUpdate = true;
          }
        }
      }
    })

    return await modal.present();
  }



  async createOrUpdateUserCard(card) {
      this.appsync.hc().then(client => {
        client.query({
          query: getUserCardId,
          variables: { user3Card3User3Id: this.user.attributes.sub, user3Card3Card3Id: card.cardId },
          fetchPolicy: 'network-only'
        })
          .then(data => {
            if ((data.data.listUser3Card3s.items.length) ? true : false) {
              this.myUpdateUserCard(data, card)
            } else {
              this.myCreateUserCard(card);
            }
          })
          .catch(console.error);
      });
    }

    myCreateUserCard(card) {

      const myUser3Card3 = {
        user3Card3User3Id: this.user.attributes.sub,
        user3: { id: this.user.attributes.sub, username: this.user.username, __typename: "User3" },
        user3Card3Card3Id: card.user3Card3Card3Id,
        card3: { id: card.cardId, __typename: "Card3" },
        status: card.status,
        score: card.score,
        _version: 1
      }

  
      this.appsync.hc().then(client => {
        client.mutate({
          mutation: createUserCardId,
          variables: myUser3Card3,
  
          optimisticResponse: () => ({
            createUser3Card3: {
              ...myUser3Card3,
              __typename: "User3Card3"
            }
          }),
          
  
          update: (proxy, { data: { createUser3Card3: _myUser3Card3 } }) => {
  
            const options = {
              //   //getUserCard
              query: ListUserCardsByUser,
              fetchPolicy: 'network-only',
              variables: {
                user3Card3User3Id: this.user.attributes.sub,
                //__typename: "User3Card3"
              },
              //__typename: "ModelUser3Card3Connection"//{ conversationId: this.conversation.id, first: constants.messageFirst }
            };
            proxy.writeQuery({
              ...options, data: {
                listUser3Card3s: {
                  items: [{ ..._myUser3Card3 }],
                  "__typename": "ModelUser3Card3Connection"
                }
              }
            });
          }
        }).then(({ data }) => {
          console.log("created a new User3Card3")
          // this.score1.getGlobalScores(this.user).then(data => {
          //   if (!data) { () => console.log("no data") }
          //   this.doneScore1 = data[0];
          //   this.totalScore1 = data[1];
          // })
        
        }).catch(err => console.log('Error creating UserCard', err));
      })
    }
  
  
    myUpdateUserCard(res, card) {
      //console.log('res??',res.listUser3Card3s.items[0].id)
      const UserCardToUpdate = {
        id: res.data.listUser3Card3s.items[0].id,
        status: card.status,
        score: card.score,
        user3: { id: this.user.attributes.sub, __typename: "User3" },
        card3: { id: card.cardId, __typename: "Card3" },
        _version: +res.data.listUser3Card3s.items[0]._version,
        user3Card3User3Id: this.user.attributes.sub,
        user3Card3Card3Id: card.user3Card3Card3Id,
        __typename: "User3Card3"
      }
  
  
      this.appsync.hc().then(client => {
        client.mutate({
          mutation: updateUserCard,
          variables: UserCardToUpdate,
  
          optimisticResponse: () => ({
            updateUser3Card3: {
              ...UserCardToUpdate,
              __typename: "User3Card3"
            }
          }),
          update: (proxy, { data: { updateUser3Card3: _UserCardToUpdate } }) => {
  
            const options = {
              query: ListUserCardsByUser,
              fetchPolicy: 'network-only',
              variables: {
                user3Card3User3Id: this.user.attributes.sub
              },
              __typename: "ModelUser3Card3Connection"
            };
  
            proxy.writeQuery({
              ...options, data: {
                listUser3Card3s: {
                  items: [{ ..._UserCardToUpdate }],
                  "__typename": "ModelUser3Card3Connection"
                }
              }
            });
          }
        }).then(({ data }) => {
          console.log("updated a User3Card3")
          // this.score1.getGlobalScores(this.user).then(data => {
          //   if (!data) { () => console.log("no data") }
          //   this.doneScore1 = data[0];
          //   this.totalScore1 = data[1];
          // })
         
  
        }).catch(err => console.log('Error updating User3Card3', err));
      })
    }



  }

export class MyDataType {
  public answer: string;
  public audio: string;
  public cardId: string;
  public question: string;
  public order: number;
  public user3Card3Card3Id: string;
  public score: number
  public status: string;
  public _version: number;
  public toUpdate: boolean;
}

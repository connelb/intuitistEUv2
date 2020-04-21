import { Component, OnInit } from '@angular/core';
import Amplify, {
  Auth, API, graphqlOperation
} from 'aws-amplify';
import gql from 'graphql-tag';
import { AppsyncService } from '../../providers/appsync.service';
import { ToastController } from '@ionic/angular';
import { ObservableQuery } from 'apollo-client';
import * as _ from 'lodash';

const ListLessons = gql`  
  query listLesson3 {
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
        _version
        _deleted
      }
    }
  }
`;


const DeleteLesson = gql`
mutation DeleteLesson(
  $id:ID,
  $_version:Int
 ) {
  deleteLesson3(input: {
    id:$id,
    _version:$_version
  }) {
    id
    name
    description
    section
    subSection
    level
    video
    keywords
    _version
  }
}`;

// mutation DeleteLesson{
//   deleteLesson3(input:{id:"f15d0b1d-ed7e-4e58-9ab1-6b3bc9a4fa25"}){
//     id
//   }
// }

@Component({
  selector: 'app-lesson-delete',
  templateUrl: './lesson-delete.page.html',
  styleUrls: ['./lesson-delete.page.scss'],
})
export class LessonDeletePage implements OnInit {
  lessons: any;

  constructor(private appsync: AppsyncService, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.getLessons()
  }

  async getLessons() {
    const [lessons] = await Promise.all([
      API.graphql(graphqlOperation(ListLessons)) as Promise<any>
    ])
    this.lessons = lessons.data.listLesson3s.items;
  }

  async deleteToast() {
    const toast = await this.toastCtrl.create({
      message: 'Lesson deleted',
      duration: 1000
    });
    await toast.present();
  }


  async deleteLesson(lesson) {


    // Promise.all([
    //   API.graphql(graphqlOperation(DeleteCard, { id: card.id, _version:card._version })) as Promise<any>
    // ]).then(res=> {
    //   console.log('res??, deleted???',res)


    //   //this.getCards(this.lesson.id);
    //   var index = _.findIndex(this.cards, { id: res[0]['data'].deleteCard3.id });
    //   console.log('ok?',index)
    //   // // Replace item at index using native splice
    //   // this.cards.shift(index, 1, card);

    //   this.createToast();
    // })

   await Promise.all([
      API.graphql(graphqlOperation(DeleteLesson, {
        id: lesson.id,
        _version: lesson._version,
        name: lesson.name,
        description: lesson.description,
        section: lesson.section,
        subSection: lesson.subSection,
        level: lesson.level,
        video: lesson.video,
        keywords: lesson.keywords
      })) as Promise<any>
    ]).then(res =>{
      var index = _.findIndex(this.lessons, { id: res[0]['data'].deleteLesson3.id });
      this.lessons.shift(index, 1, lesson);

    })

    //   console.log('deleteLesson(lesson), what is lesson??',lesson)
    // const deleteLesson ={
    //   id: lesson.id,
    //   _version: lesson._version,
    //    name: lesson.name,
    //   description: lesson.description,
    //   section: lesson.section,
    //   subSection: lesson.subSection,
    //   level: lesson.level,
    //   video: lesson.video,
    //   keywords: lesson.keywords,
    //   __typename: 'UpdateLesson3Input'
    // }

    // // this.appsync.hc().then(client => {
    // //   client.mutate({
    // //     mutation: createUserCardId,
    // //     variables: myUser3Card3,

    // //     optimisticResponse: () => ({
    // //       createUser3Card3: {
    // //         ...myUser3Card3,
    // //         __typename: 'User3Card3'
    // //       }
    // //     }),
    // //     update: (proxy, { data: { createUser3Card3: _myUser3Card3 } }) => {

    //   this.appsync.hc().then(client => {
    //     const observable: ObservableQuery = client.mutate({
    //       mutation: DeleteLesson,
    //       variables: {
    //         id: lesson.id,
    //         _version: lesson._version,
    //         name: lesson.selectedLesson,
    //         description: lesson.description,
    //         section: lesson.section,
    //         subSection: lesson.subSection,
    //         level: lesson.level,
    //         video: lesson.video,
    //         keywords: lesson.keywords,
    //         __typename: 'DeleteLesson3Input'
    //       },
    //       optimisticResponse: () => ({
    //         deleteLesson3: {
    //           ...deleteLesson,
    //           __typename: 'DeleteLesson3Input'
    //         }
    //       }),
    //       update: (proxy, { data: { deleteLesson3: _deleteLesson } }) => {
    //         const options = {
    //           query: ListLessons,
    //           // variables: { id: this.cardId, status: "done", __typename: 'UpdateCard3Input' }
    //         };

    //          const data = proxy.readQuery(options);
    //       //   console.log("what is proxy data??", options, data)
    //       //   // const _tmp = unshiftMessage(data, _message);
    //       proxy.writeQuery({ ...options, data });
    //       // proxy.writeQuery({ ...options, data: { listLesson3s: { items: { ..._deleteLesson }} } });
    //       }
    //     }).then(({ data }) => {
    //       console.log('mutation complete', data);
    //       // this.lessonForm.reset();
    //       this.getLessons();
    //       this.deleteToast();
    //       // const toast = this.toastCtrl.create({
    //       //   message: 'lesson created',
    //       //   duration: 3000
    //       // });
    //       // toast.present();
    //       //this.router.navigate(['tabs/lessons', this.lessonId]);
    //     }).catch(err => console.log('Error creating message', err));
    //   });
  }



}

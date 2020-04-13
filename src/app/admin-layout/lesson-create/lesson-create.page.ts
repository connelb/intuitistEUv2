import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CreateLesson3Input } from './../../API.service';
import gql from 'graphql-tag';
import { AppsyncService } from '../../providers/appsync.service';
import { ObservableQuery } from 'apollo-client';
import { API, graphqlOperation } from "aws-amplify";
import { AlertController, ToastController } from '@ionic/angular';

const CreateLesson = gql`
mutation createLesson3(
  $name:String!,
  $description:String,
  $section:String,
  $subSection:String,
  $level:String,
  $video:String,
  $keywords:String
 ) {
  createLesson3(input: {
    name:$name,
    description:$description,
    section:$section,
    subSection:$subSection,
    level:$level,
    video:$video,
    keywords:$keywords
  }) {
    id
  }
}`;

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.page.html',
  styleUrls: ['./lesson-create.page.scss'],
})
export class LessonCreatePage implements OnInit {
  lessonForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private appsync: AppsyncService, public toastCtrl: ToastController) {
    this.createLessonForm();
  }

  ngOnInit() {}

  createLessonForm() {
    this.lessonForm = this.formBuilder.group({
      name: [''],
      description: [''],
      section: [''],
      subSection: [''],
      level: [''],
      image: [''],
      video: [''],
      keywords: ['']
    });
  }

  onSubmit() {
    this.createLesson(this.lessonForm.value);
  }


  createLesson(lesson) {
    this.appsync.hc().then(client => {
      const observable: ObservableQuery = client.mutate({
        mutation: CreateLesson,
        variables: {
          name: lesson.name,
          description: lesson.description,
          section: lesson.section,
          subSection: lesson.subSection,
          level: lesson.level,
          image: lesson.image,
          video: lesson.video,
          keywords: lesson.keywords,
          __typename: 'CreateLesson3Input'
        },
        // optimisticResponse: () => ({
        //   UpdateCard: {
        //     ...updateCard,
        //     __typename: 'UpdateCard3Input'
        //   }
        // }),
        // update: (proxy, { data: { updateUserCardPWA: _userCard } }) => {
        //   const options = {
        //     query: UpdateCard,
        //     variables: { id: this.cardId, status: "done", __typename: 'UpdateCard3Input' }
        //   };

        //   const data = proxy.readQuery(options);
        //   console.log("what is proxy data??", options, data)
        //   // const _tmp = unshiftMessage(data, _message);
        //   proxy.writeQuery({ ...options, data: { getCard3: { users3: { items: { ..._userCard } } } } });
        // }
      }).then(({ data }) => {
        console.log('mutation complete', data);
        this.lessonForm.reset();
        this.createToast();
        // const toast = this.toastCtrl.create({
        //   message: 'lesson created',
        //   duration: 3000
        // });
        // toast.present();
        //this.router.navigate(['tabs/lessons', this.lessonId]);
      }).catch(err => console.log('Error creating message', err));
    });
  }

  async createToast() {
    const toast = await this.toastCtrl.create({
      message: 'Lesson created',
      duration: 1000
    });
    await toast.present();
  }


}

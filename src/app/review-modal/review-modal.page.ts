import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.page.html',
  styleUrls: ['./review-modal.page.scss'],
})
export class ReviewModalPage implements OnInit {
  @Input() lesson: any;


  public width: number = 0;
  public height: number = 0;
  toDo: any = [];
  doing: any = [];
  done: any = [];



  constructor(public modalController: ModalController, private platform: Platform) { }

  ngOnInit() {
    for (let i = 0; i < this.lesson.cards3.items.length; i++) {
      // console.log('a', this.lesson.cards3.items[i].users3.items[0])
      if (this.lesson.cards3.items[i].users3.items[0]) {

        for (let j = 0; j < this.lesson.cards3.items[i].users3.items.length; j++) {
          if (this.lesson.cards3.items[i].users3.items[j].status == 'done') {
            // this.done.push(this.lesson.cards3.items[i].users3.items[j])
            this.done.push({
              question: this.lesson.cards3.items[i].question,
              audio: this.lesson.cards3.items[i].audio,
              id: this.lesson.cards3.items[i].users3.items[j].id,
              _version: this.lesson.cards3.items[i].users3.items[j]._version
            })

          }
          if (this.lesson.cards3.items[i].users3.items[j].status == 'doing') {
            this.doing.push({
              question: this.lesson.cards3.items[i].question,
              audio: this.lesson.cards3.items[i].audio,
              id: this.lesson.cards3.items[i].users3.items[j].id,
              _version: this.lesson.cards3.items[i].users3.items[j]._version
            })
          }

        }
        console.log('llk', this.done.sort((a, b) => +b._version - +a._version), this.doing.sort((a, b) => +b._version - +a._version))
      }

    }

    // console.log('this.toDo', this.toDo)
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.width = this.platform.width();
      this.height = this.platform.height();
    });

  }

  dismiss() {
    // let data = { duration: this.duration, currentTime: this.currentTime }

    // this.modalController.dismiss(data);
    this.modalController.dismiss();
  }


}

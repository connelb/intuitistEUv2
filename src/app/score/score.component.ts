import { Component, OnInit } from '@angular/core';
import { AppsyncService } from '../providers/appsync.service';
import { Auth} from 'aws-amplify';
import * as d3Array from 'd3-array';
import * as d3Collection from 'd3-collection';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  score;
  user: any;
  lessons: any;
  globalVideoTotal: number;
  temp = [];
  myScore: any;
  toDo: any;
  doing: any;
  done: any;
  myTotalArray: any[];
  doingScore: any;
  doneScore: any;
  total: any;
  constructor(private appsyncService: AppsyncService) { }

  async ngOnInit() {
    await Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(async user => {
      this.user = user;
      this.getUserCards(this.user.attributes.sub);
    });
  }


    getUserCards(userId): void {
    this.appsyncService.ListUser3Card3s(userId).subscribe(lessons => {
    
      this.globalVideoTotal = lessons.length*30;

      lessons.map((lesson: any) => {
        // this.getUserVideoId(user, lesson).then(d => this.globalVideoScore.push(d))
  
        lesson.cards3.items.map((card: any) => {
          this.temp.push({
            'name': lesson.name,
            'cardId': card.id,
            'status': (card.users3.items.length > 0) ? card.users3.items[0].status : 0,
            'score': (card.users3.items.length > 0) ? card.users3.items[0].score : 0
          })
        })
      })
  
      this.myScore = d3Collection.nest()
        .key(function (d: any) { return d['status']; })
        .rollup(function (leaves: any) {
          return {
            total: d3Array.sum(leaves, function (d) {
              return d['score'];
            }), tally: leaves.length
          } as any
        })
        .entries(this.temp);
  
      //   // console.log('getGlobalScores this.myScore??', this.myScore)
  
      this.toDo = (this.myScore[0].value.tally) ? this.myScore[0].value.tally : 0;
      this.doing = (this.myScore[1]) ? this.myScore[1].value.tally : 0;
      this.done = Math.round( (this.myScore[2]) ? this.myScore[2].value.tally : 0 );
      this.myTotalArray = [this.done, this.doing, this.toDo];
  
      this.doingScore = (this.myScore[1]) ? this.myScore[1].value.total : 0;
      this.doneScore = (this.myScore[2]) ? this.myScore[2].value.total : 0;
  
  
      // // this.myScoreArray = [this.done, this.doing];
  
      this.total = this.myTotalArray.reduce((a, b) => a + b, 0);
      // // this.score = this.myScoreArray.reduce((a, b) => a + b, 0);
      // // this.videoScore = globalVideoScore.reduce((a, b) => a + b, 0);
      // this.videoScore = this.globalVideoScore.reduce((a, b) => a + b, 0);
  
      
      // // console.log('this.globalVideoScore',this.globalVideoScore);
      // // console.log('this.done',this.done);
      // // console.log('this.videoScore',this.videoScore);

      //,  (this.videoScore/this.globalVideoTotal).toFixed(2)
  
      // return [Math.round(this.done), this.total, (this.done/this.total).toFixed(2), (this.doing/this.total).toFixed(2)]
    });
  }

  subscriptionUserCards(): void {
    this.appsyncService.onUpdateAppsyncVote().subscribe(result => {
      this.score = result['value']['data']['onUpdateAppsyncVote']['vote'];
    });
  }

}

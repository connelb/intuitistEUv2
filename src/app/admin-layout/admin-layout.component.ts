import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from  '@angular/forms';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {}


  appPages = [
    {
      title: 'Create Lesson',
      url: '/admin/lesson-create',
      icon: 'add-circle-outline'
    },
    {
      title: 'Update Lesson- add video',
      url: '/admin/lesson-update',
      icon: 'create'
    },
    {
      title: 'Create card',
      url: '/admin/card-create',
      icon: 'add-circle-outline'
    },
    {
      title: 'Update card',
      url: '/admin/card-update',
      icon: 'create'
    }
  ];

}

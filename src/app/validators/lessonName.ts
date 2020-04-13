import { FormControl } from '@angular/forms';

export class UpdateLessonValidator {

  static checkName(control: FormControl): any {

    return new Promise(resolve => {

      console.log('control.value',control.value, 'resolve',resolve)
        // if(control.value.toLowerCase() === "greg"){

        // }

      //Fake a slow response from server

    //   setTimeout(() => {
    //     if(control.value.toLowerCase() === "greg"){

    //       resolve({
    //         "username taken": true
    //       });

    //     } else {
    //       resolve(null);
    //     }
    //   }, 2000);

    });
  }

}
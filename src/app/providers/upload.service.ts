import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import awsconfig from './../../aws-exports';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  uploadFile(file) {
    const contentType = file.type;
    const bucket = new S3(
          {
              accessKeyId: awsconfig.aws_user_pools_id,//'YOUR-ACCESS-KEY-ID',
              secretAccessKey: awsconfig.aws_user_pools_id,//'YOUR-SECRET-ACCESS-KEY',
              region: awsconfig.aws_appsync_region//'YOUR-REGION'
          }
      );
      const params = {
          Bucket: 'YOUR-BUCKET-NAME',
          Key: "video" + file.name,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType
      };
      bucket.upload(params, function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      });
//for upload progress   
/*bucket.upload(params).on('httpUploadProgress', function (evt) {
          console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
      }).send(function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      });*/
}
}

// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const CardStatus = {
  "TO_DO": "toDo",
  "DOING": "doing",
  "DONE": "done"
};
const VideoStatus = {
  "TO_DO": "toDo",
  "DOING": "doing",
  "DONE": "done"
};

const { Lesson3, Card3, User3Card3, User3, User3Video3, vodAsset, videoObject } = initSchema(schema);

export {
  Lesson3,
  Card3,
  User3Card3,
  User3,
  User3Video3,
  vodAsset,
  videoObject,
  CardStatus,
  VideoStatus
};
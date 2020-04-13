/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type CreateLesson3Input = {
  id?: string | null;
  name: string;
  description?: string | null;
  section?: string | null;
  subSection?: string | null;
  level?: string | null;
  video?: string | null;
  keywords?: string | null;
  _version?: number | null;
};

export type ModelLesson3ConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  section?: ModelStringInput | null;
  subSection?: ModelStringInput | null;
  level?: ModelStringInput | null;
  video?: ModelStringInput | null;
  keywords?: ModelStringInput | null;
  and?: Array<ModelLesson3ConditionInput | null> | null;
  or?: Array<ModelLesson3ConditionInput | null> | null;
  not?: ModelLesson3ConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateLesson3Input = {
  id: string;
  name?: string | null;
  description?: string | null;
  section?: string | null;
  subSection?: string | null;
  level?: string | null;
  video?: string | null;
  keywords?: string | null;
  _version?: number | null;
};

export type DeleteLesson3Input = {
  id?: string | null;
  _version?: number | null;
};

export type CreateCard3Input = {
  id?: string | null;
  question: string;
  answer: string;
  audio?: string | null;
  video?: string | null;
  level?: string | null;
  order?: number | null;
  keywords?: string | null;
  lesson3?: Lesson3Input | null;
  _version?: number | null;
  card3Lesson3Id?: string | null;
};

export type Lesson3Input = {
  id: string;
  name: string;
  description?: string | null;
  section?: string | null;
  subSection?: string | null;
  level?: string | null;
  video?: string | null;
  keywords?: string | null;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ModelCard3ConditionInput = {
  question?: ModelStringInput | null;
  answer?: ModelStringInput | null;
  audio?: ModelStringInput | null;
  video?: ModelStringInput | null;
  level?: ModelStringInput | null;
  order?: ModelIntInput | null;
  keywords?: ModelStringInput | null;
  and?: Array<ModelCard3ConditionInput | null> | null;
  or?: Array<ModelCard3ConditionInput | null> | null;
  not?: ModelCard3ConditionInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export enum cardStatus {
  toDo = "toDo",
  doing = "doing",
  done = "done"
}

export type UpdateCard3Input = {
  id: string;
  question?: string | null;
  answer?: string | null;
  audio?: string | null;
  video?: string | null;
  level?: string | null;
  order?: number | null;
  keywords?: string | null;
  lesson3?: Lesson3Input | null;
  _version?: number | null;
  card3Lesson3Id?: string | null;
};

export type DeleteCard3Input = {
  id?: string | null;
  _version?: number | null;
};

export type CreateUser3Input = {
  id?: string | null;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  image?: string | null;
  level?: string | null;
  progress?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  userState?: string | null;
  _version?: number | null;
};

export type ModelUser3ConditionInput = {
  username?: ModelStringInput | null;
  firstName?: ModelStringInput | null;
  lastName?: ModelStringInput | null;
  email?: ModelStringInput | null;
  image?: ModelStringInput | null;
  level?: ModelStringInput | null;
  progress?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  userState?: ModelStringInput | null;
  and?: Array<ModelUser3ConditionInput | null> | null;
  or?: Array<ModelUser3ConditionInput | null> | null;
  not?: ModelUser3ConditionInput | null;
};

export enum videoStatus {
  toDo = "toDo",
  doing = "doing",
  done = "done"
}

export type UpdateUser3Input = {
  id: string;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  image?: string | null;
  level?: string | null;
  progress?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  userState?: string | null;
  _version?: number | null;
};

export type DeleteUser3Input = {
  id?: string | null;
  _version?: number | null;
};

export type CreateUser3Card3Input = {
  id?: string | null;
  status?: cardStatus | null;
  score?: number | null;
  user3: User3Input;
  card3: Card3Input;
  _version?: number | null;
};

export type User3Input = {
  id?: string | null;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  image?: string | null;
  level?: string | null;
  progress?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  userState?: string | null;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type Card3Input = {
  id: string;
  question: string;
  answer: string;
  audio?: string | null;
  video?: string | null;
  level?: string | null;
  order?: number | null;
  keywords?: string | null;
  lesson3?: Lesson3Input | null;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ModelUser3Card3ConditionInput = {
  status?: ModelcardStatusInput | null;
  score?: ModelIntInput | null;
  and?: Array<ModelUser3Card3ConditionInput | null> | null;
  or?: Array<ModelUser3Card3ConditionInput | null> | null;
  not?: ModelUser3Card3ConditionInput | null;
};

export type ModelcardStatusInput = {
  eq?: cardStatus | null;
  ne?: cardStatus | null;
};

export type UpdateUser3Card3Input = {
  id?: string | null;
  status?: cardStatus | null;
  score?: number | null;
  user3?: User3Input | null;
  card3?: Card3Input | null;
  _version?: number | null;
  user3Card3User3Id?: string | null;
  user3Card3Card3Id?: string | null;
};

export type DeleteUser3Card3Input = {
  id?: string | null;
  _version?: number | null;
};

export type CreateUser3Video3Input = {
  id?: string | null;
  status?: videoStatus | null;
  score?: number | null;
  user3?: User3Input | null;
  _version?: number | null;
  user3Video3User3Id: string;
  user3Video3Video3Id: string;
};

export type ModelUser3Video3ConditionInput = {
  status?: ModelvideoStatusInput | null;
  score?: ModelIntInput | null;
  and?: Array<ModelUser3Video3ConditionInput | null> | null;
  or?: Array<ModelUser3Video3ConditionInput | null> | null;
  not?: ModelUser3Video3ConditionInput | null;
};

export type ModelvideoStatusInput = {
  eq?: videoStatus | null;
  ne?: videoStatus | null;
};

export type UpdateUser3Video3Input = {
  id: string;
  status?: videoStatus | null;
  score?: number | null;
  user3?: User3Input | null;
  _version?: number | null;
  user3Video3User3Id?: string | null;
  user3Video3Video3Id?: string | null;
};

export type DeleteUser3Video3Input = {
  id?: string | null;
  _version?: number | null;
};

export type CreateVodAssetInput = {
  id?: string | null;
  title: string;
  description: string;
  users3?: Array<User3Video3Input | null> | null;
  _version?: number | null;
  vodAssetVideoId?: string | null;
};

export type User3Video3Input = {
  id?: string | null;
  status?: videoStatus | null;
  score?: number | null;
  user3: User3Input;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ModelvodAssetConditionInput = {
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelvodAssetConditionInput | null> | null;
  or?: Array<ModelvodAssetConditionInput | null> | null;
  not?: ModelvodAssetConditionInput | null;
};

export type UpdateVodAssetInput = {
  id: string;
  title?: string | null;
  description?: string | null;
  users3?: Array<User3Video3Input | null> | null;
  _version?: number | null;
  vodAssetVideoId?: string | null;
};

export type DeleteVodAssetInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateVideoObjectInput = {
  id?: string | null;
  token?: string | null;
  _version?: number | null;
};

export type ModelvideoObjectConditionInput = {
  token?: ModelStringInput | null;
  and?: Array<ModelvideoObjectConditionInput | null> | null;
  or?: Array<ModelvideoObjectConditionInput | null> | null;
  not?: ModelvideoObjectConditionInput | null;
};

export type UpdateVideoObjectInput = {
  id: string;
  token?: string | null;
  _version?: number | null;
};

export type DeleteVideoObjectInput = {
  id?: string | null;
  _version?: number | null;
};

export type ModelLesson3FilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  section?: ModelStringInput | null;
  subSection?: ModelStringInput | null;
  level?: ModelStringInput | null;
  video?: ModelStringInput | null;
  keywords?: ModelStringInput | null;
  and?: Array<ModelLesson3FilterInput | null> | null;
  or?: Array<ModelLesson3FilterInput | null> | null;
  not?: ModelLesson3FilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelCard3FilterInput = {
  id?: ModelIDInput | null;
  question?: ModelStringInput | null;
  answer?: ModelStringInput | null;
  audio?: ModelStringInput | null;
  video?: ModelStringInput | null;
  level?: ModelStringInput | null;
  order?: ModelIntInput | null;
  keywords?: ModelStringInput | null;
  and?: Array<ModelCard3FilterInput | null> | null;
  or?: Array<ModelCard3FilterInput | null> | null;
  not?: ModelCard3FilterInput | null;
};

export type ModelUser3FilterInput = {
  id?: ModelIDInput | null;
  username?: ModelStringInput | null;
  firstName?: ModelStringInput | null;
  lastName?: ModelStringInput | null;
  email?: ModelStringInput | null;
  image?: ModelStringInput | null;
  level?: ModelStringInput | null;
  progress?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  userState?: ModelStringInput | null;
  and?: Array<ModelUser3FilterInput | null> | null;
  or?: Array<ModelUser3FilterInput | null> | null;
  not?: ModelUser3FilterInput | null;
};

export type ModelUser3Card3FilterInput = {
  id?: ModelIDInput | null;
  status?: ModelcardStatusInput | null;
  score?: ModelIntInput | null;
  user3Card3User3Id?: ModelIDInput | null;
  user3Card3Card3Id?: ModelIDInput | null;
  and?: Array<ModelUser3Card3FilterInput | null> | null;
  or?: Array<ModelUser3Card3FilterInput | null> | null;
  not?: ModelUser3Card3FilterInput | null;
};

export type ModelUser3Video3FilterInput = {
  id?: ModelIDInput | null;
  status?: ModelvideoStatusInput | null;
  score?: ModelIntInput | null;
  user3Video3User3Id?: ModelIDInput | null;
  user3Video3Video3Id?: ModelIDInput | null;
  and?: Array<ModelUser3Video3FilterInput | null> | null;
  or?: Array<ModelUser3Video3FilterInput | null> | null;
  not?: ModelUser3Video3FilterInput | null;
};

export type ModelvodAssetFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelvodAssetFilterInput | null> | null;
  or?: Array<ModelvodAssetFilterInput | null> | null;
  not?: ModelvodAssetFilterInput | null;
};

export type ModelvideoObjectFilterInput = {
  id?: ModelIDInput | null;
  token?: ModelStringInput | null;
  and?: Array<ModelvideoObjectFilterInput | null> | null;
  or?: Array<ModelvideoObjectFilterInput | null> | null;
  not?: ModelvideoObjectFilterInput | null;
};

export type CreateLesson3Mutation = {
  __typename: "Lesson3";
  id: string;
  name: string;
  description: string | null;
  section: string | null;
  subSection: string | null;
  level: string | null;
  video: string | null;
  keywords: string | null;
  cards3: {
    __typename: "ModelCard3Connection";
    items: Array<{
      __typename: "Card3";
      id: string;
      question: string;
      answer: string;
      audio: string | null;
      video: string | null;
      level: string | null;
      order: number | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type UpdateLesson3Mutation = {
  __typename: "Lesson3";
  id: string;
  name: string;
  description: string | null;
  section: string | null;
  subSection: string | null;
  level: string | null;
  video: string | null;
  keywords: string | null;
  cards3: {
    __typename: "ModelCard3Connection";
    items: Array<{
      __typename: "Card3";
      id: string;
      question: string;
      answer: string;
      audio: string | null;
      video: string | null;
      level: string | null;
      order: number | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type DeleteLesson3Mutation = {
  __typename: "Lesson3";
  id: string;
  name: string;
  description: string | null;
  section: string | null;
  subSection: string | null;
  level: string | null;
  video: string | null;
  keywords: string | null;
  cards3: {
    __typename: "ModelCard3Connection";
    items: Array<{
      __typename: "Card3";
      id: string;
      question: string;
      answer: string;
      audio: string | null;
      video: string | null;
      level: string | null;
      order: number | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type CreateCard3Mutation = {
  __typename: "Card3";
  id: string;
  question: string;
  answer: string;
  audio: string | null;
  video: string | null;
  level: string | null;
  order: number | null;
  keywords: string | null;
  lesson3: {
    __typename: "Lesson3";
    id: string;
    name: string;
    description: string | null;
    section: string | null;
    subSection: string | null;
    level: string | null;
    video: string | null;
    keywords: string | null;
    cards3: {
      __typename: "ModelCard3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  users3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type UpdateCard3Mutation = {
  __typename: "Card3";
  id: string;
  question: string;
  answer: string;
  audio: string | null;
  video: string | null;
  level: string | null;
  order: number | null;
  keywords: string | null;
  lesson3: {
    __typename: "Lesson3";
    id: string;
    name: string;
    description: string | null;
    section: string | null;
    subSection: string | null;
    level: string | null;
    video: string | null;
    keywords: string | null;
    cards3: {
      __typename: "ModelCard3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  users3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type DeleteCard3Mutation = {
  __typename: "Card3";
  id: string;
  question: string;
  answer: string;
  audio: string | null;
  video: string | null;
  level: string | null;
  order: number | null;
  keywords: string | null;
  lesson3: {
    __typename: "Lesson3";
    id: string;
    name: string;
    description: string | null;
    section: string | null;
    subSection: string | null;
    level: string | null;
    video: string | null;
    keywords: string | null;
    cards3: {
      __typename: "ModelCard3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  users3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type CreateUser3Mutation = {
  __typename: "User3";
  id: string | null;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  image: string | null;
  level: string | null;
  progress: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  userState: string | null;
  cards3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  videos3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  owner: string | null;
};

export type UpdateUser3Mutation = {
  __typename: "User3";
  id: string | null;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  image: string | null;
  level: string | null;
  progress: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  userState: string | null;
  cards3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  videos3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  owner: string | null;
};

export type DeleteUser3Mutation = {
  __typename: "User3";
  id: string | null;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  image: string | null;
  level: string | null;
  progress: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  userState: string | null;
  cards3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  videos3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  owner: string | null;
};

export type CreateUser3Card3Mutation = {
  __typename: "User3Card3";
  id: string | null;
  status: cardStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  card3: {
    __typename: "Card3";
    id: string;
    question: string;
    answer: string;
    audio: string | null;
    video: string | null;
    level: string | null;
    order: number | null;
    keywords: string | null;
    lesson3: {
      __typename: "Lesson3";
      id: string;
      name: string;
      description: string | null;
      section: string | null;
      subSection: string | null;
      level: string | null;
      video: string | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    users3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type UpdateUser3Card3Mutation = {
  __typename: "User3Card3";
  id: string | null;
  status: cardStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  card3: {
    __typename: "Card3";
    id: string;
    question: string;
    answer: string;
    audio: string | null;
    video: string | null;
    level: string | null;
    order: number | null;
    keywords: string | null;
    lesson3: {
      __typename: "Lesson3";
      id: string;
      name: string;
      description: string | null;
      section: string | null;
      subSection: string | null;
      level: string | null;
      video: string | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    users3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type DeleteUser3Card3Mutation = {
  __typename: "User3Card3";
  id: string | null;
  status: cardStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  card3: {
    __typename: "Card3";
    id: string;
    question: string;
    answer: string;
    audio: string | null;
    video: string | null;
    level: string | null;
    order: number | null;
    keywords: string | null;
    lesson3: {
      __typename: "Lesson3";
      id: string;
      name: string;
      description: string | null;
      section: string | null;
      subSection: string | null;
      level: string | null;
      video: string | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    users3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type CreateUser3Video3Mutation = {
  __typename: "User3Video3";
  id: string | null;
  status: videoStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  video3: {
    __typename: "vodAsset";
    id: string;
    title: string;
    description: string;
    users3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    video: {
      __typename: "videoObject";
      id: string;
      token: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type UpdateUser3Video3Mutation = {
  __typename: "User3Video3";
  id: string | null;
  status: videoStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  video3: {
    __typename: "vodAsset";
    id: string;
    title: string;
    description: string;
    users3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    video: {
      __typename: "videoObject";
      id: string;
      token: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type DeleteUser3Video3Mutation = {
  __typename: "User3Video3";
  id: string | null;
  status: videoStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  video3: {
    __typename: "vodAsset";
    id: string;
    title: string;
    description: string;
    users3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    video: {
      __typename: "videoObject";
      id: string;
      token: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type CreateVodAssetMutation = {
  __typename: "vodAsset";
  id: string;
  title: string;
  description: string;
  users3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  video: {
    __typename: "videoObject";
    id: string;
    token: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type UpdateVodAssetMutation = {
  __typename: "vodAsset";
  id: string;
  title: string;
  description: string;
  users3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  video: {
    __typename: "videoObject";
    id: string;
    token: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type DeleteVodAssetMutation = {
  __typename: "vodAsset";
  id: string;
  title: string;
  description: string;
  users3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  video: {
    __typename: "videoObject";
    id: string;
    token: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type CreateVideoObjectMutation = {
  __typename: "videoObject";
  id: string;
  token: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type UpdateVideoObjectMutation = {
  __typename: "videoObject";
  id: string;
  token: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type DeleteVideoObjectMutation = {
  __typename: "videoObject";
  id: string;
  token: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type SyncLesson3sQuery = {
  __typename: "ModelLesson3Connection";
  items: Array<{
    __typename: "Lesson3";
    id: string;
    name: string;
    description: string | null;
    section: string | null;
    subSection: string | null;
    level: string | null;
    video: string | null;
    keywords: string | null;
    cards3: {
      __typename: "ModelCard3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type GetLesson3Query = {
  __typename: "Lesson3";
  id: string;
  name: string;
  description: string | null;
  section: string | null;
  subSection: string | null;
  level: string | null;
  video: string | null;
  keywords: string | null;
  cards3: {
    __typename: "ModelCard3Connection";
    items: Array<{
      __typename: "Card3";
      id: string;
      question: string;
      answer: string;
      audio: string | null;
      video: string | null;
      level: string | null;
      order: number | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type ListLesson3sQuery = {
  __typename: "ModelLesson3Connection";
  items: Array<{
    __typename: "Lesson3";
    id: string;
    name: string;
    description: string | null;
    section: string | null;
    subSection: string | null;
    level: string | null;
    video: string | null;
    keywords: string | null;
    cards3: {
      __typename: "ModelCard3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncCard3sQuery = {
  __typename: "ModelCard3Connection";
  items: Array<{
    __typename: "Card3";
    id: string;
    question: string;
    answer: string;
    audio: string | null;
    video: string | null;
    level: string | null;
    order: number | null;
    keywords: string | null;
    lesson3: {
      __typename: "Lesson3";
      id: string;
      name: string;
      description: string | null;
      section: string | null;
      subSection: string | null;
      level: string | null;
      video: string | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    users3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type GetCard3Query = {
  __typename: "Card3";
  id: string;
  question: string;
  answer: string;
  audio: string | null;
  video: string | null;
  level: string | null;
  order: number | null;
  keywords: string | null;
  lesson3: {
    __typename: "Lesson3";
    id: string;
    name: string;
    description: string | null;
    section: string | null;
    subSection: string | null;
    level: string | null;
    video: string | null;
    keywords: string | null;
    cards3: {
      __typename: "ModelCard3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  users3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type ListCard3sQuery = {
  __typename: "ModelCard3Connection";
  items: Array<{
    __typename: "Card3";
    id: string;
    question: string;
    answer: string;
    audio: string | null;
    video: string | null;
    level: string | null;
    order: number | null;
    keywords: string | null;
    lesson3: {
      __typename: "Lesson3";
      id: string;
      name: string;
      description: string | null;
      section: string | null;
      subSection: string | null;
      level: string | null;
      video: string | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    users3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncUser3sQuery = {
  __typename: "ModelUser3Connection";
  items: Array<{
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type GetUser3Query = {
  __typename: "User3";
  id: string | null;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  image: string | null;
  level: string | null;
  progress: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  userState: string | null;
  cards3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  videos3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  owner: string | null;
};

export type GetMeQuery = {
  __typename: "User3";
  id: string | null;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  image: string | null;
  level: string | null;
  progress: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  userState: string | null;
  cards3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  videos3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  owner: string | null;
};

export type ListUser3sQuery = {
  __typename: "ModelUser3Connection";
  items: Array<{
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncUser3Card3sQuery = {
  __typename: "ModelUser3Card3Connection";
  items: Array<{
    __typename: "User3Card3";
    id: string | null;
    status: cardStatus | null;
    score: number | null;
    user3: {
      __typename: "User3";
      id: string | null;
      username: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      image: string | null;
      level: string | null;
      progress: string | null;
      createdAt: string | null;
      updatedAt: string | null;
      userState: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      owner: string | null;
    };
    card3: {
      __typename: "Card3";
      id: string;
      question: string;
      answer: string;
      audio: string | null;
      video: string | null;
      level: string | null;
      order: number | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type GetUser3Card3Query = {
  __typename: "User3Card3";
  id: string | null;
  status: cardStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  card3: {
    __typename: "Card3";
    id: string;
    question: string;
    answer: string;
    audio: string | null;
    video: string | null;
    level: string | null;
    order: number | null;
    keywords: string | null;
    lesson3: {
      __typename: "Lesson3";
      id: string;
      name: string;
      description: string | null;
      section: string | null;
      subSection: string | null;
      level: string | null;
      video: string | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    users3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type ListUser3Card3sQuery = {
  __typename: "ModelUser3Card3Connection";
  items: Array<{
    __typename: "User3Card3";
    id: string | null;
    status: cardStatus | null;
    score: number | null;
    user3: {
      __typename: "User3";
      id: string | null;
      username: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      image: string | null;
      level: string | null;
      progress: string | null;
      createdAt: string | null;
      updatedAt: string | null;
      userState: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      owner: string | null;
    };
    card3: {
      __typename: "Card3";
      id: string;
      question: string;
      answer: string;
      audio: string | null;
      video: string | null;
      level: string | null;
      order: number | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncUser3Video3sQuery = {
  __typename: "ModelUser3Video3Connection";
  items: Array<{
    __typename: "User3Video3";
    id: string | null;
    status: videoStatus | null;
    score: number | null;
    user3: {
      __typename: "User3";
      id: string | null;
      username: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      image: string | null;
      level: string | null;
      progress: string | null;
      createdAt: string | null;
      updatedAt: string | null;
      userState: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      owner: string | null;
    };
    video3: {
      __typename: "vodAsset";
      id: string;
      title: string;
      description: string;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type GetUser3Video3Query = {
  __typename: "User3Video3";
  id: string | null;
  status: videoStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  video3: {
    __typename: "vodAsset";
    id: string;
    title: string;
    description: string;
    users3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    video: {
      __typename: "videoObject";
      id: string;
      token: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type ListUser3Video3sQuery = {
  __typename: "ModelUser3Video3Connection";
  items: Array<{
    __typename: "User3Video3";
    id: string | null;
    status: videoStatus | null;
    score: number | null;
    user3: {
      __typename: "User3";
      id: string | null;
      username: string;
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      image: string | null;
      level: string | null;
      progress: string | null;
      createdAt: string | null;
      updatedAt: string | null;
      userState: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      owner: string | null;
    };
    video3: {
      __typename: "vodAsset";
      id: string;
      title: string;
      description: string;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    };
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncVodAssetsQuery = {
  __typename: "ModelvodAssetConnection";
  items: Array<{
    __typename: "vodAsset";
    id: string;
    title: string;
    description: string;
    users3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    video: {
      __typename: "videoObject";
      id: string;
      token: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type GetVodAssetQuery = {
  __typename: "vodAsset";
  id: string;
  title: string;
  description: string;
  users3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  video: {
    __typename: "videoObject";
    id: string;
    token: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type ListVodAssetsQuery = {
  __typename: "ModelvodAssetConnection";
  items: Array<{
    __typename: "vodAsset";
    id: string;
    title: string;
    description: string;
    users3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    video: {
      __typename: "videoObject";
      id: string;
      token: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type SyncVideoObjectsQuery = {
  __typename: "ModelvideoObjectConnection";
  items: Array<{
    __typename: "videoObject";
    id: string;
    token: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type GetVideoObjectQuery = {
  __typename: "videoObject";
  id: string;
  token: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type ListVideoObjectsQuery = {
  __typename: "ModelvideoObjectConnection";
  items: Array<{
    __typename: "videoObject";
    id: string;
    token: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null> | null;
  nextToken: string | null;
  startedAt: number | null;
};

export type OnCreateLesson3Subscription = {
  __typename: "Lesson3";
  id: string;
  name: string;
  description: string | null;
  section: string | null;
  subSection: string | null;
  level: string | null;
  video: string | null;
  keywords: string | null;
  cards3: {
    __typename: "ModelCard3Connection";
    items: Array<{
      __typename: "Card3";
      id: string;
      question: string;
      answer: string;
      audio: string | null;
      video: string | null;
      level: string | null;
      order: number | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateLesson3Subscription = {
  __typename: "Lesson3";
  id: string;
  name: string;
  description: string | null;
  section: string | null;
  subSection: string | null;
  level: string | null;
  video: string | null;
  keywords: string | null;
  cards3: {
    __typename: "ModelCard3Connection";
    items: Array<{
      __typename: "Card3";
      id: string;
      question: string;
      answer: string;
      audio: string | null;
      video: string | null;
      level: string | null;
      order: number | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteLesson3Subscription = {
  __typename: "Lesson3";
  id: string;
  name: string;
  description: string | null;
  section: string | null;
  subSection: string | null;
  level: string | null;
  video: string | null;
  keywords: string | null;
  cards3: {
    __typename: "ModelCard3Connection";
    items: Array<{
      __typename: "Card3";
      id: string;
      question: string;
      answer: string;
      audio: string | null;
      video: string | null;
      level: string | null;
      order: number | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnCreateCard3Subscription = {
  __typename: "Card3";
  id: string;
  question: string;
  answer: string;
  audio: string | null;
  video: string | null;
  level: string | null;
  order: number | null;
  keywords: string | null;
  lesson3: {
    __typename: "Lesson3";
    id: string;
    name: string;
    description: string | null;
    section: string | null;
    subSection: string | null;
    level: string | null;
    video: string | null;
    keywords: string | null;
    cards3: {
      __typename: "ModelCard3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  users3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateCard3Subscription = {
  __typename: "Card3";
  id: string;
  question: string;
  answer: string;
  audio: string | null;
  video: string | null;
  level: string | null;
  order: number | null;
  keywords: string | null;
  lesson3: {
    __typename: "Lesson3";
    id: string;
    name: string;
    description: string | null;
    section: string | null;
    subSection: string | null;
    level: string | null;
    video: string | null;
    keywords: string | null;
    cards3: {
      __typename: "ModelCard3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  users3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteCard3Subscription = {
  __typename: "Card3";
  id: string;
  question: string;
  answer: string;
  audio: string | null;
  video: string | null;
  level: string | null;
  order: number | null;
  keywords: string | null;
  lesson3: {
    __typename: "Lesson3";
    id: string;
    name: string;
    description: string | null;
    section: string | null;
    subSection: string | null;
    level: string | null;
    video: string | null;
    keywords: string | null;
    cards3: {
      __typename: "ModelCard3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  users3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnCreateUser3Subscription = {
  __typename: "User3";
  id: string | null;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  image: string | null;
  level: string | null;
  progress: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  userState: string | null;
  cards3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  videos3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  owner: string | null;
};

export type OnUpdateUser3Subscription = {
  __typename: "User3";
  id: string | null;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  image: string | null;
  level: string | null;
  progress: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  userState: string | null;
  cards3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  videos3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  owner: string | null;
};

export type OnDeleteUser3Subscription = {
  __typename: "User3";
  id: string | null;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  image: string | null;
  level: string | null;
  progress: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  userState: string | null;
  cards3: {
    __typename: "ModelUser3Card3Connection";
    items: Array<{
      __typename: "User3Card3";
      id: string | null;
      status: cardStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  videos3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
  owner: string | null;
};

export type OnCreateUser3Card3Subscription = {
  __typename: "User3Card3";
  id: string | null;
  status: cardStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  card3: {
    __typename: "Card3";
    id: string;
    question: string;
    answer: string;
    audio: string | null;
    video: string | null;
    level: string | null;
    order: number | null;
    keywords: string | null;
    lesson3: {
      __typename: "Lesson3";
      id: string;
      name: string;
      description: string | null;
      section: string | null;
      subSection: string | null;
      level: string | null;
      video: string | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    users3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateUser3Card3Subscription = {
  __typename: "User3Card3";
  id: string | null;
  status: cardStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  card3: {
    __typename: "Card3";
    id: string;
    question: string;
    answer: string;
    audio: string | null;
    video: string | null;
    level: string | null;
    order: number | null;
    keywords: string | null;
    lesson3: {
      __typename: "Lesson3";
      id: string;
      name: string;
      description: string | null;
      section: string | null;
      subSection: string | null;
      level: string | null;
      video: string | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    users3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteUser3Card3Subscription = {
  __typename: "User3Card3";
  id: string | null;
  status: cardStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  card3: {
    __typename: "Card3";
    id: string;
    question: string;
    answer: string;
    audio: string | null;
    video: string | null;
    level: string | null;
    order: number | null;
    keywords: string | null;
    lesson3: {
      __typename: "Lesson3";
      id: string;
      name: string;
      description: string | null;
      section: string | null;
      subSection: string | null;
      level: string | null;
      video: string | null;
      keywords: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    users3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnCreateUser3Video3Subscription = {
  __typename: "User3Video3";
  id: string | null;
  status: videoStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  video3: {
    __typename: "vodAsset";
    id: string;
    title: string;
    description: string;
    users3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    video: {
      __typename: "videoObject";
      id: string;
      token: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateUser3Video3Subscription = {
  __typename: "User3Video3";
  id: string | null;
  status: videoStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  video3: {
    __typename: "vodAsset";
    id: string;
    title: string;
    description: string;
    users3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    video: {
      __typename: "videoObject";
      id: string;
      token: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteUser3Video3Subscription = {
  __typename: "User3Video3";
  id: string | null;
  status: videoStatus | null;
  score: number | null;
  user3: {
    __typename: "User3";
    id: string | null;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    image: string | null;
    level: string | null;
    progress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    userState: string | null;
    cards3: {
      __typename: "ModelUser3Card3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    videos3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  };
  video3: {
    __typename: "vodAsset";
    id: string;
    title: string;
    description: string;
    users3: {
      __typename: "ModelUser3Video3Connection";
      nextToken: string | null;
      startedAt: number | null;
    } | null;
    video: {
      __typename: "videoObject";
      id: string;
      token: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  };
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnCreateVodAssetSubscription = {
  __typename: "vodAsset";
  id: string;
  title: string;
  description: string;
  users3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  video: {
    __typename: "videoObject";
    id: string;
    token: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateVodAssetSubscription = {
  __typename: "vodAsset";
  id: string;
  title: string;
  description: string;
  users3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  video: {
    __typename: "videoObject";
    id: string;
    token: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteVodAssetSubscription = {
  __typename: "vodAsset";
  id: string;
  title: string;
  description: string;
  users3: {
    __typename: "ModelUser3Video3Connection";
    items: Array<{
      __typename: "User3Video3";
      id: string | null;
      status: videoStatus | null;
      score: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
  video: {
    __typename: "videoObject";
    id: string;
    token: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
  } | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnCreateVideoObjectSubscription = {
  __typename: "videoObject";
  id: string;
  token: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateVideoObjectSubscription = {
  __typename: "videoObject";
  id: string;
  token: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteVideoObjectSubscription = {
  __typename: "videoObject";
  id: string;
  token: string | null;
  _version: number;
  _deleted: boolean | null;
  _lastChangedAt: number;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateLesson3(
    input: CreateLesson3Input,
    condition?: ModelLesson3ConditionInput
  ): Promise<CreateLesson3Mutation> {
    const statement = `mutation CreateLesson3($input: CreateLesson3Input!, $condition: ModelLesson3ConditionInput) {
        createLesson3(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          section
          subSection
          level
          video
          keywords
          cards3 {
            __typename
            items {
              __typename
              id
              question
              answer
              audio
              video
              level
              order
              keywords
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateLesson3Mutation>response.data.createLesson3;
  }
  async UpdateLesson3(
    input: UpdateLesson3Input,
    condition?: ModelLesson3ConditionInput
  ): Promise<UpdateLesson3Mutation> {
    const statement = `mutation UpdateLesson3($input: UpdateLesson3Input!, $condition: ModelLesson3ConditionInput) {
        updateLesson3(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          section
          subSection
          level
          video
          keywords
          cards3 {
            __typename
            items {
              __typename
              id
              question
              answer
              audio
              video
              level
              order
              keywords
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateLesson3Mutation>response.data.updateLesson3;
  }
  async DeleteLesson3(
    input: DeleteLesson3Input,
    condition?: ModelLesson3ConditionInput
  ): Promise<DeleteLesson3Mutation> {
    const statement = `mutation DeleteLesson3($input: DeleteLesson3Input!, $condition: ModelLesson3ConditionInput) {
        deleteLesson3(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          section
          subSection
          level
          video
          keywords
          cards3 {
            __typename
            items {
              __typename
              id
              question
              answer
              audio
              video
              level
              order
              keywords
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteLesson3Mutation>response.data.deleteLesson3;
  }
  async CreateCard3(
    input: CreateCard3Input,
    condition?: ModelCard3ConditionInput
  ): Promise<CreateCard3Mutation> {
    const statement = `mutation CreateCard3($input: CreateCard3Input!, $condition: ModelCard3ConditionInput) {
        createCard3(input: $input, condition: $condition) {
          __typename
          id
          question
          answer
          audio
          video
          level
          order
          keywords
          lesson3 {
            __typename
            id
            name
            description
            section
            subSection
            level
            video
            keywords
            cards3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCard3Mutation>response.data.createCard3;
  }
  async UpdateCard3(
    input: UpdateCard3Input,
    condition?: ModelCard3ConditionInput
  ): Promise<UpdateCard3Mutation> {
    const statement = `mutation UpdateCard3($input: UpdateCard3Input!, $condition: ModelCard3ConditionInput) {
        updateCard3(input: $input, condition: $condition) {
          __typename
          id
          question
          answer
          audio
          video
          level
          order
          keywords
          lesson3 {
            __typename
            id
            name
            description
            section
            subSection
            level
            video
            keywords
            cards3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCard3Mutation>response.data.updateCard3;
  }
  async DeleteCard3(
    input: DeleteCard3Input,
    condition?: ModelCard3ConditionInput
  ): Promise<DeleteCard3Mutation> {
    const statement = `mutation DeleteCard3($input: DeleteCard3Input!, $condition: ModelCard3ConditionInput) {
        deleteCard3(input: $input, condition: $condition) {
          __typename
          id
          question
          answer
          audio
          video
          level
          order
          keywords
          lesson3 {
            __typename
            id
            name
            description
            section
            subSection
            level
            video
            keywords
            cards3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCard3Mutation>response.data.deleteCard3;
  }
  async CreateUser3(
    input: CreateUser3Input,
    condition?: ModelUser3ConditionInput
  ): Promise<CreateUser3Mutation> {
    const statement = `mutation CreateUser3($input: CreateUser3Input!, $condition: ModelUser3ConditionInput) {
        createUser3(input: $input, condition: $condition) {
          __typename
          id
          username
          firstName
          lastName
          email
          image
          level
          progress
          createdAt
          updatedAt
          userState
          cards3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          videos3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUser3Mutation>response.data.createUser3;
  }
  async UpdateUser3(
    input: UpdateUser3Input,
    condition?: ModelUser3ConditionInput
  ): Promise<UpdateUser3Mutation> {
    const statement = `mutation UpdateUser3($input: UpdateUser3Input!, $condition: ModelUser3ConditionInput) {
        updateUser3(input: $input, condition: $condition) {
          __typename
          id
          username
          firstName
          lastName
          email
          image
          level
          progress
          createdAt
          updatedAt
          userState
          cards3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          videos3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUser3Mutation>response.data.updateUser3;
  }
  async DeleteUser3(
    input: DeleteUser3Input,
    condition?: ModelUser3ConditionInput
  ): Promise<DeleteUser3Mutation> {
    const statement = `mutation DeleteUser3($input: DeleteUser3Input!, $condition: ModelUser3ConditionInput) {
        deleteUser3(input: $input, condition: $condition) {
          __typename
          id
          username
          firstName
          lastName
          email
          image
          level
          progress
          createdAt
          updatedAt
          userState
          cards3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          videos3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUser3Mutation>response.data.deleteUser3;
  }
  async CreateUser3Card3(
    input: CreateUser3Card3Input,
    condition?: ModelUser3Card3ConditionInput
  ): Promise<CreateUser3Card3Mutation> {
    const statement = `mutation CreateUser3Card3($input: CreateUser3Card3Input!, $condition: ModelUser3Card3ConditionInput) {
        createUser3Card3(input: $input, condition: $condition) {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          card3 {
            __typename
            id
            question
            answer
            audio
            video
            level
            order
            keywords
            lesson3 {
              __typename
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
              _lastChangedAt
            }
            users3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUser3Card3Mutation>response.data.createUser3Card3;
  }
  async UpdateUser3Card3(
    input: UpdateUser3Card3Input,
    condition?: ModelUser3Card3ConditionInput
  ): Promise<UpdateUser3Card3Mutation> {
    const statement = `mutation UpdateUser3Card3($input: UpdateUser3Card3Input!, $condition: ModelUser3Card3ConditionInput) {
        updateUser3Card3(input: $input, condition: $condition) {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          card3 {
            __typename
            id
            question
            answer
            audio
            video
            level
            order
            keywords
            lesson3 {
              __typename
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
              _lastChangedAt
            }
            users3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUser3Card3Mutation>response.data.updateUser3Card3;
  }
  async DeleteUser3Card3(
    input: DeleteUser3Card3Input,
    condition?: ModelUser3Card3ConditionInput
  ): Promise<DeleteUser3Card3Mutation> {
    const statement = `mutation DeleteUser3Card3($input: DeleteUser3Card3Input!, $condition: ModelUser3Card3ConditionInput) {
        deleteUser3Card3(input: $input, condition: $condition) {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          card3 {
            __typename
            id
            question
            answer
            audio
            video
            level
            order
            keywords
            lesson3 {
              __typename
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
              _lastChangedAt
            }
            users3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUser3Card3Mutation>response.data.deleteUser3Card3;
  }
  async CreateUser3Video3(
    input: CreateUser3Video3Input,
    condition?: ModelUser3Video3ConditionInput
  ): Promise<CreateUser3Video3Mutation> {
    const statement = `mutation CreateUser3Video3($input: CreateUser3Video3Input!, $condition: ModelUser3Video3ConditionInput) {
        createUser3Video3(input: $input, condition: $condition) {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          video3 {
            __typename
            id
            title
            description
            users3 {
              __typename
              nextToken
              startedAt
            }
            video {
              __typename
              id
              token
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUser3Video3Mutation>response.data.createUser3Video3;
  }
  async UpdateUser3Video3(
    input: UpdateUser3Video3Input,
    condition?: ModelUser3Video3ConditionInput
  ): Promise<UpdateUser3Video3Mutation> {
    const statement = `mutation UpdateUser3Video3($input: UpdateUser3Video3Input!, $condition: ModelUser3Video3ConditionInput) {
        updateUser3Video3(input: $input, condition: $condition) {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          video3 {
            __typename
            id
            title
            description
            users3 {
              __typename
              nextToken
              startedAt
            }
            video {
              __typename
              id
              token
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUser3Video3Mutation>response.data.updateUser3Video3;
  }
  async DeleteUser3Video3(
    input: DeleteUser3Video3Input,
    condition?: ModelUser3Video3ConditionInput
  ): Promise<DeleteUser3Video3Mutation> {
    const statement = `mutation DeleteUser3Video3($input: DeleteUser3Video3Input!, $condition: ModelUser3Video3ConditionInput) {
        deleteUser3Video3(input: $input, condition: $condition) {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          video3 {
            __typename
            id
            title
            description
            users3 {
              __typename
              nextToken
              startedAt
            }
            video {
              __typename
              id
              token
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUser3Video3Mutation>response.data.deleteUser3Video3;
  }
  async CreateVodAsset(
    input: CreateVodAssetInput,
    condition?: ModelvodAssetConditionInput
  ): Promise<CreateVodAssetMutation> {
    const statement = `mutation CreateVodAsset($input: CreateVodAssetInput!, $condition: ModelvodAssetConditionInput) {
        createVodAsset(input: $input, condition: $condition) {
          __typename
          id
          title
          description
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          video {
            __typename
            id
            token
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVodAssetMutation>response.data.createVodAsset;
  }
  async UpdateVodAsset(
    input: UpdateVodAssetInput,
    condition?: ModelvodAssetConditionInput
  ): Promise<UpdateVodAssetMutation> {
    const statement = `mutation UpdateVodAsset($input: UpdateVodAssetInput!, $condition: ModelvodAssetConditionInput) {
        updateVodAsset(input: $input, condition: $condition) {
          __typename
          id
          title
          description
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          video {
            __typename
            id
            token
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVodAssetMutation>response.data.updateVodAsset;
  }
  async DeleteVodAsset(
    input: DeleteVodAssetInput,
    condition?: ModelvodAssetConditionInput
  ): Promise<DeleteVodAssetMutation> {
    const statement = `mutation DeleteVodAsset($input: DeleteVodAssetInput!, $condition: ModelvodAssetConditionInput) {
        deleteVodAsset(input: $input, condition: $condition) {
          __typename
          id
          title
          description
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          video {
            __typename
            id
            token
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVodAssetMutation>response.data.deleteVodAsset;
  }
  async CreateVideoObject(
    input: CreateVideoObjectInput,
    condition?: ModelvideoObjectConditionInput
  ): Promise<CreateVideoObjectMutation> {
    const statement = `mutation CreateVideoObject($input: CreateVideoObjectInput!, $condition: ModelvideoObjectConditionInput) {
        createVideoObject(input: $input, condition: $condition) {
          __typename
          id
          token
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateVideoObjectMutation>response.data.createVideoObject;
  }
  async UpdateVideoObject(
    input: UpdateVideoObjectInput,
    condition?: ModelvideoObjectConditionInput
  ): Promise<UpdateVideoObjectMutation> {
    const statement = `mutation UpdateVideoObject($input: UpdateVideoObjectInput!, $condition: ModelvideoObjectConditionInput) {
        updateVideoObject(input: $input, condition: $condition) {
          __typename
          id
          token
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateVideoObjectMutation>response.data.updateVideoObject;
  }
  async DeleteVideoObject(
    input: DeleteVideoObjectInput,
    condition?: ModelvideoObjectConditionInput
  ): Promise<DeleteVideoObjectMutation> {
    const statement = `mutation DeleteVideoObject($input: DeleteVideoObjectInput!, $condition: ModelvideoObjectConditionInput) {
        deleteVideoObject(input: $input, condition: $condition) {
          __typename
          id
          token
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteVideoObjectMutation>response.data.deleteVideoObject;
  }
  async SyncLesson3s(
    filter?: ModelLesson3FilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncLesson3sQuery> {
    const statement = `query SyncLesson3s($filter: ModelLesson3FilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncLesson3s(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            name
            description
            section
            subSection
            level
            video
            keywords
            cards3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncLesson3sQuery>response.data.syncLesson3s;
  }
  async GetLesson3(id: string): Promise<GetLesson3Query> {
    const statement = `query GetLesson3($id: ID!) {
        getLesson3(id: $id) {
          __typename
          id
          name
          description
          section
          subSection
          level
          video
          keywords
          cards3 {
            __typename
            items {
              __typename
              id
              question
              answer
              audio
              video
              level
              order
              keywords
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetLesson3Query>response.data.getLesson3;
  }
  async ListLesson3s(
    filter?: ModelLesson3FilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListLesson3sQuery> {
    const statement = `query ListLesson3s($filter: ModelLesson3FilterInput, $limit: Int, $nextToken: String) {
        listLesson3s(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            description
            section
            subSection
            level
            video
            keywords
            cards3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListLesson3sQuery>response.data.listLesson3s;
  }
  async SyncCard3s(
    filter?: ModelCard3FilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncCard3sQuery> {
    const statement = `query SyncCard3s($filter: ModelCard3FilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncCard3s(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            question
            answer
            audio
            video
            level
            order
            keywords
            lesson3 {
              __typename
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
              _lastChangedAt
            }
            users3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncCard3sQuery>response.data.syncCard3s;
  }
  async GetCard3(id: string): Promise<GetCard3Query> {
    const statement = `query GetCard3($id: ID!) {
        getCard3(id: $id) {
          __typename
          id
          question
          answer
          audio
          video
          level
          order
          keywords
          lesson3 {
            __typename
            id
            name
            description
            section
            subSection
            level
            video
            keywords
            cards3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCard3Query>response.data.getCard3;
  }
  async ListCard3s(
    filter?: ModelCard3FilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCard3sQuery> {
    const statement = `query ListCard3s($filter: ModelCard3FilterInput, $limit: Int, $nextToken: String) {
        listCard3s(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            question
            answer
            audio
            video
            level
            order
            keywords
            lesson3 {
              __typename
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
              _lastChangedAt
            }
            users3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCard3sQuery>response.data.listCard3s;
  }
  async SyncUser3s(
    filter?: ModelUser3FilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncUser3sQuery> {
    const statement = `query SyncUser3s($filter: ModelUser3FilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncUser3s(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncUser3sQuery>response.data.syncUser3s;
  }
  async GetUser3(id: string): Promise<GetUser3Query> {
    const statement = `query GetUser3($id: ID!) {
        getUser3(id: $id) {
          __typename
          id
          username
          firstName
          lastName
          email
          image
          level
          progress
          createdAt
          updatedAt
          userState
          cards3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          videos3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUser3Query>response.data.getUser3;
  }
  async GetMe(id: string): Promise<GetMeQuery> {
    const statement = `query GetMe($id: ID!) {
        getMe(id: $id) {
          __typename
          id
          username
          firstName
          lastName
          email
          image
          level
          progress
          createdAt
          updatedAt
          userState
          cards3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          videos3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMeQuery>response.data.getMe;
  }
  async ListUser3s(
    filter?: ModelUser3FilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUser3sQuery> {
    const statement = `query ListUser3s($filter: ModelUser3FilterInput, $limit: Int, $nextToken: String) {
        listUser3s(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUser3sQuery>response.data.listUser3s;
  }
  async SyncUser3Card3s(
    filter?: ModelUser3Card3FilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncUser3Card3sQuery> {
    const statement = `query SyncUser3Card3s($filter: ModelUser3Card3FilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncUser3Card3s(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            status
            score
            user3 {
              __typename
              id
              username
              firstName
              lastName
              email
              image
              level
              progress
              createdAt
              updatedAt
              userState
              _version
              _deleted
              _lastChangedAt
              owner
            }
            card3 {
              __typename
              id
              question
              answer
              audio
              video
              level
              order
              keywords
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncUser3Card3sQuery>response.data.syncUser3Card3s;
  }
  async GetUser3Card3(id: string): Promise<GetUser3Card3Query> {
    const statement = `query GetUser3Card3($id: ID!) {
        getUser3Card3(id: $id) {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          card3 {
            __typename
            id
            question
            answer
            audio
            video
            level
            order
            keywords
            lesson3 {
              __typename
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
              _lastChangedAt
            }
            users3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUser3Card3Query>response.data.getUser3Card3;
  }
  async ListUser3Card3s(
    filter?: ModelUser3Card3FilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUser3Card3sQuery> {
    const statement = `query ListUser3Card3s($filter: ModelUser3Card3FilterInput, $limit: Int, $nextToken: String) {
        listUser3Card3s(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            status
            score
            user3 {
              __typename
              id
              username
              firstName
              lastName
              email
              image
              level
              progress
              createdAt
              updatedAt
              userState
              _version
              _deleted
              _lastChangedAt
              owner
            }
            card3 {
              __typename
              id
              question
              answer
              audio
              video
              level
              order
              keywords
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUser3Card3sQuery>response.data.listUser3Card3s;
  }
  async SyncUser3Video3s(
    filter?: ModelUser3Video3FilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncUser3Video3sQuery> {
    const statement = `query SyncUser3Video3s($filter: ModelUser3Video3FilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncUser3Video3s(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            status
            score
            user3 {
              __typename
              id
              username
              firstName
              lastName
              email
              image
              level
              progress
              createdAt
              updatedAt
              userState
              _version
              _deleted
              _lastChangedAt
              owner
            }
            video3 {
              __typename
              id
              title
              description
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncUser3Video3sQuery>response.data.syncUser3Video3s;
  }
  async GetUser3Video3(id: string): Promise<GetUser3Video3Query> {
    const statement = `query GetUser3Video3($id: ID!) {
        getUser3Video3(id: $id) {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          video3 {
            __typename
            id
            title
            description
            users3 {
              __typename
              nextToken
              startedAt
            }
            video {
              __typename
              id
              token
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUser3Video3Query>response.data.getUser3Video3;
  }
  async ListUser3Video3s(
    filter?: ModelUser3Video3FilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUser3Video3sQuery> {
    const statement = `query ListUser3Video3s($filter: ModelUser3Video3FilterInput, $limit: Int, $nextToken: String) {
        listUser3Video3s(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            status
            score
            user3 {
              __typename
              id
              username
              firstName
              lastName
              email
              image
              level
              progress
              createdAt
              updatedAt
              userState
              _version
              _deleted
              _lastChangedAt
              owner
            }
            video3 {
              __typename
              id
              title
              description
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUser3Video3sQuery>response.data.listUser3Video3s;
  }
  async SyncVodAssets(
    filter?: ModelvodAssetFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncVodAssetsQuery> {
    const statement = `query SyncVodAssets($filter: ModelvodAssetFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncVodAssets(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            title
            description
            users3 {
              __typename
              nextToken
              startedAt
            }
            video {
              __typename
              id
              token
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncVodAssetsQuery>response.data.syncVodAssets;
  }
  async GetVodAsset(id: string): Promise<GetVodAssetQuery> {
    const statement = `query GetVodAsset($id: ID!) {
        getVodAsset(id: $id) {
          __typename
          id
          title
          description
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          video {
            __typename
            id
            token
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVodAssetQuery>response.data.getVodAsset;
  }
  async ListVodAssets(
    filter?: ModelvodAssetFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListVodAssetsQuery> {
    const statement = `query ListVodAssets($filter: ModelvodAssetFilterInput, $limit: Int, $nextToken: String) {
        listVodAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            title
            description
            users3 {
              __typename
              nextToken
              startedAt
            }
            video {
              __typename
              id
              token
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVodAssetsQuery>response.data.listVodAssets;
  }
  async SyncVideoObjects(
    filter?: ModelvideoObjectFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncVideoObjectsQuery> {
    const statement = `query SyncVideoObjects($filter: ModelvideoObjectFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncVideoObjects(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            token
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncVideoObjectsQuery>response.data.syncVideoObjects;
  }
  async GetVideoObject(id: string): Promise<GetVideoObjectQuery> {
    const statement = `query GetVideoObject($id: ID!) {
        getVideoObject(id: $id) {
          __typename
          id
          token
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetVideoObjectQuery>response.data.getVideoObject;
  }
  async ListVideoObjects(
    filter?: ModelvideoObjectFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListVideoObjectsQuery> {
    const statement = `query ListVideoObjects($filter: ModelvideoObjectFilterInput, $limit: Int, $nextToken: String) {
        listVideoObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            token
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListVideoObjectsQuery>response.data.listVideoObjects;
  }
  OnCreateLesson3Listener: Observable<
    OnCreateLesson3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateLesson3 {
        onCreateLesson3 {
          __typename
          id
          name
          description
          section
          subSection
          level
          video
          keywords
          cards3 {
            __typename
            items {
              __typename
              id
              question
              answer
              audio
              video
              level
              order
              keywords
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnCreateLesson3Subscription>;

  OnUpdateLesson3Listener: Observable<
    OnUpdateLesson3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateLesson3 {
        onUpdateLesson3 {
          __typename
          id
          name
          description
          section
          subSection
          level
          video
          keywords
          cards3 {
            __typename
            items {
              __typename
              id
              question
              answer
              audio
              video
              level
              order
              keywords
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnUpdateLesson3Subscription>;

  OnDeleteLesson3Listener: Observable<
    OnDeleteLesson3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteLesson3 {
        onDeleteLesson3 {
          __typename
          id
          name
          description
          section
          subSection
          level
          video
          keywords
          cards3 {
            __typename
            items {
              __typename
              id
              question
              answer
              audio
              video
              level
              order
              keywords
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnDeleteLesson3Subscription>;

  OnCreateCard3Listener: Observable<OnCreateCard3Subscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateCard3 {
        onCreateCard3 {
          __typename
          id
          question
          answer
          audio
          video
          level
          order
          keywords
          lesson3 {
            __typename
            id
            name
            description
            section
            subSection
            level
            video
            keywords
            cards3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnCreateCard3Subscription>;

  OnUpdateCard3Listener: Observable<OnUpdateCard3Subscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateCard3 {
        onUpdateCard3 {
          __typename
          id
          question
          answer
          audio
          video
          level
          order
          keywords
          lesson3 {
            __typename
            id
            name
            description
            section
            subSection
            level
            video
            keywords
            cards3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnUpdateCard3Subscription>;

  OnDeleteCard3Listener: Observable<OnDeleteCard3Subscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteCard3 {
        onDeleteCard3 {
          __typename
          id
          question
          answer
          audio
          video
          level
          order
          keywords
          lesson3 {
            __typename
            id
            name
            description
            section
            subSection
            level
            video
            keywords
            cards3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnDeleteCard3Subscription>;

  OnCreateUser3Listener: Observable<OnCreateUser3Subscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser3($owner: String) {
        onCreateUser3(owner: $owner) {
          __typename
          id
          username
          firstName
          lastName
          email
          image
          level
          progress
          createdAt
          updatedAt
          userState
          cards3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          videos3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`
    )
  ) as Observable<OnCreateUser3Subscription>;

  OnUpdateUser3Listener: Observable<OnUpdateUser3Subscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser3($owner: String) {
        onUpdateUser3(owner: $owner) {
          __typename
          id
          username
          firstName
          lastName
          email
          image
          level
          progress
          createdAt
          updatedAt
          userState
          cards3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          videos3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`
    )
  ) as Observable<OnUpdateUser3Subscription>;

  OnDeleteUser3Listener: Observable<OnDeleteUser3Subscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser3($owner: String) {
        onDeleteUser3(owner: $owner) {
          __typename
          id
          username
          firstName
          lastName
          email
          image
          level
          progress
          createdAt
          updatedAt
          userState
          cards3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          videos3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          _version
          _deleted
          _lastChangedAt
          owner
        }
      }`
    )
  ) as Observable<OnDeleteUser3Subscription>;

  OnCreateUser3Card3Listener: Observable<
    OnCreateUser3Card3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser3Card3 {
        onCreateUser3Card3 {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          card3 {
            __typename
            id
            question
            answer
            audio
            video
            level
            order
            keywords
            lesson3 {
              __typename
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
              _lastChangedAt
            }
            users3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnCreateUser3Card3Subscription>;

  OnUpdateUser3Card3Listener: Observable<
    OnUpdateUser3Card3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser3Card3 {
        onUpdateUser3Card3 {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          card3 {
            __typename
            id
            question
            answer
            audio
            video
            level
            order
            keywords
            lesson3 {
              __typename
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
              _lastChangedAt
            }
            users3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnUpdateUser3Card3Subscription>;

  OnDeleteUser3Card3Listener: Observable<
    OnDeleteUser3Card3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser3Card3 {
        onDeleteUser3Card3 {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          card3 {
            __typename
            id
            question
            answer
            audio
            video
            level
            order
            keywords
            lesson3 {
              __typename
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
              _lastChangedAt
            }
            users3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnDeleteUser3Card3Subscription>;

  OnCreateUser3Video3Listener: Observable<
    OnCreateUser3Video3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser3Video3 {
        onCreateUser3Video3 {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          video3 {
            __typename
            id
            title
            description
            users3 {
              __typename
              nextToken
              startedAt
            }
            video {
              __typename
              id
              token
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnCreateUser3Video3Subscription>;

  OnUpdateUser3Video3Listener: Observable<
    OnUpdateUser3Video3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser3Video3 {
        onUpdateUser3Video3 {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          video3 {
            __typename
            id
            title
            description
            users3 {
              __typename
              nextToken
              startedAt
            }
            video {
              __typename
              id
              token
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnUpdateUser3Video3Subscription>;

  OnDeleteUser3Video3Listener: Observable<
    OnDeleteUser3Video3Subscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser3Video3 {
        onDeleteUser3Video3 {
          __typename
          id
          status
          score
          user3 {
            __typename
            id
            username
            firstName
            lastName
            email
            image
            level
            progress
            createdAt
            updatedAt
            userState
            cards3 {
              __typename
              nextToken
              startedAt
            }
            videos3 {
              __typename
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
            owner
          }
          video3 {
            __typename
            id
            title
            description
            users3 {
              __typename
              nextToken
              startedAt
            }
            video {
              __typename
              id
              token
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnDeleteUser3Video3Subscription>;

  OnCreateVodAssetListener: Observable<
    OnCreateVodAssetSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVodAsset {
        onCreateVodAsset {
          __typename
          id
          title
          description
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          video {
            __typename
            id
            token
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnCreateVodAssetSubscription>;

  OnUpdateVodAssetListener: Observable<
    OnUpdateVodAssetSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVodAsset {
        onUpdateVodAsset {
          __typename
          id
          title
          description
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          video {
            __typename
            id
            token
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnUpdateVodAssetSubscription>;

  OnDeleteVodAssetListener: Observable<
    OnDeleteVodAssetSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVodAsset {
        onDeleteVodAsset {
          __typename
          id
          title
          description
          users3 {
            __typename
            items {
              __typename
              id
              status
              score
              _version
              _deleted
              _lastChangedAt
            }
            nextToken
            startedAt
          }
          video {
            __typename
            id
            token
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnDeleteVodAssetSubscription>;

  OnCreateVideoObjectListener: Observable<
    OnCreateVideoObjectSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateVideoObject {
        onCreateVideoObject {
          __typename
          id
          token
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnCreateVideoObjectSubscription>;

  OnUpdateVideoObjectListener: Observable<
    OnUpdateVideoObjectSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateVideoObject {
        onUpdateVideoObject {
          __typename
          id
          token
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnUpdateVideoObjectSubscription>;

  OnDeleteVideoObjectListener: Observable<
    OnDeleteVideoObjectSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteVideoObject {
        onDeleteVideoObject {
          __typename
          id
          token
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<OnDeleteVideoObjectSubscription>;
}

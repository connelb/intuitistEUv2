import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum CardStatus {
  TO_DO = "toDo",
  DOING = "doing",
  DONE = "done"
}

export enum VideoStatus {
  TO_DO = "toDo",
  DOING = "doing",
  DONE = "done"
}



export declare class Lesson3 {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly section?: string;
  readonly subSection?: string;
  readonly level?: string;
  readonly video?: string;
  readonly keywords?: string;
  readonly cards3?: Card3[];
  constructor(init: ModelInit<Lesson3>);
  static copyOf(source: Lesson3, mutator: (draft: MutableModel<Lesson3>) => MutableModel<Lesson3> | void): Lesson3;
}

export declare class Card3 {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly audio?: string;
  readonly video?: string;
  readonly level?: string;
  readonly order?: number;
  readonly keywords?: string;
  readonly lesson3?: Lesson3;
  readonly users3?: User3Card3[];
  constructor(init: ModelInit<Card3>);
  static copyOf(source: Card3, mutator: (draft: MutableModel<Card3>) => MutableModel<Card3> | void): Card3;
}

export declare class User3Card3 {
  readonly id: string;
  readonly status?: CardStatus | keyof typeof CardStatus;
  readonly score?: number;
  readonly user3: User3;
  readonly card3: Card3;
  constructor(init: ModelInit<User3Card3>);
  static copyOf(source: User3Card3, mutator: (draft: MutableModel<User3Card3>) => MutableModel<User3Card3> | void): User3Card3;
}

export declare class User3 {
  readonly id: string;
  readonly username: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly image?: string;
  readonly level?: string;
  readonly progress?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly userState?: string;
  readonly cards3?: User3Card3[];
  readonly videos3?: User3Video3[];
  constructor(init: ModelInit<User3>);
  static copyOf(source: User3, mutator: (draft: MutableModel<User3>) => MutableModel<User3> | void): User3;
}

export declare class User3Video3 {
  readonly id: string;
  readonly status?: VideoStatus | keyof typeof VideoStatus;
  readonly score?: number;
  readonly user3: User3;
  readonly video3: vodAsset;
  constructor(init: ModelInit<User3Video3>);
  static copyOf(source: User3Video3, mutator: (draft: MutableModel<User3Video3>) => MutableModel<User3Video3> | void): User3Video3;
}

export declare class vodAsset {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly users3?: User3Video3[];
  readonly video?: videoObject;
  constructor(init: ModelInit<vodAsset>);
  static copyOf(source: vodAsset, mutator: (draft: MutableModel<vodAsset>) => MutableModel<vodAsset> | void): vodAsset;
}

export declare class videoObject {
  readonly id: string;
  readonly token?: string;
  constructor(init: ModelInit<videoObject>);
  static copyOf(source: videoObject, mutator: (draft: MutableModel<videoObject>) => MutableModel<videoObject> | void): videoObject;
}
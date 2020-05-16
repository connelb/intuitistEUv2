export const schema = {
    "models": {
        "Lesson3": {
            "name": "Lesson3",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "section": {
                    "name": "section",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "subSection": {
                    "name": "subSection",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "level": {
                    "name": "level",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "video": {
                    "name": "video",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "keywords": {
                    "name": "keywords",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "cards3": {
                    "name": "cards3",
                    "isArray": true,
                    "type": {
                        "model": "Card3"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "lesson3"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Lesson3s",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "User"
                                ],
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Card3": {
            "name": "Card3",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "question": {
                    "name": "question",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "answer": {
                    "name": "answer",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "audio": {
                    "name": "audio",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "video": {
                    "name": "video",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "level": {
                    "name": "level",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "order": {
                    "name": "order",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "keywords": {
                    "name": "keywords",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "lesson3": {
                    "name": "lesson3",
                    "isArray": false,
                    "type": {
                        "model": "Lesson3"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "card3Lesson3Id"
                    }
                },
                "users3": {
                    "name": "users3",
                    "isArray": true,
                    "type": {
                        "model": "User3Card3"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "card3"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Card3s",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "User"
                                ],
                                "operations": [
                                    "read",
                                    "update"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "User3Card3": {
            "name": "User3Card3",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": {
                        "enum": "CardStatus"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "score": {
                    "name": "score",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "user3": {
                    "name": "user3",
                    "isArray": false,
                    "type": {
                        "model": "User3"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "user3Card3User3Id"
                    }
                },
                "card3": {
                    "name": "card3",
                    "isArray": false,
                    "type": {
                        "model": "Card3"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "user3Card3Card3Id"
                    }
                }
            },
            "syncable": true,
            "pluralName": "User3Card3s",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "User"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "User3": {
            "name": "User3",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "username": {
                    "name": "username",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "firstName": {
                    "name": "firstName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "lastName": {
                    "name": "lastName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "image": {
                    "name": "image",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "level": {
                    "name": "level",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "progress": {
                    "name": "progress",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "userState": {
                    "name": "userState",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "cards3": {
                    "name": "cards3",
                    "isArray": true,
                    "type": {
                        "model": "User3Card3"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "user3"
                    }
                },
                "videos3": {
                    "name": "videos3",
                    "isArray": true,
                    "type": {
                        "model": "User3Video3"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "user3"
                    }
                }
            },
            "syncable": true,
            "pluralName": "User3s",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "User"
                                ],
                                "operations": [
                                    "update",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "User3Video3": {
            "name": "User3Video3",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": {
                        "enum": "VideoStatus"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "score": {
                    "name": "score",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "user3": {
                    "name": "user3",
                    "isArray": false,
                    "type": {
                        "model": "User3"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "user3Video3User3Id"
                    }
                },
                "video3": {
                    "name": "video3",
                    "isArray": false,
                    "type": {
                        "model": "vodAsset"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "user3Video3Video3Id"
                    }
                }
            },
            "syncable": true,
            "pluralName": "User3Video3s",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "User"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "vodAsset": {
            "name": "vodAsset",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "users3": {
                    "name": "users3",
                    "isArray": true,
                    "type": {
                        "model": "User3Video3"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "video3"
                    }
                },
                "video": {
                    "name": "video",
                    "isArray": false,
                    "type": {
                        "model": "videoObject"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "vodAssetVideoId"
                    }
                }
            },
            "syncable": true,
            "pluralName": "vodAssets",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "subscriptions": {
                            "level": "public"
                        }
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "videoObject": {
            "name": "videoObject",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "token": {
                    "name": "token",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "videoObjects",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "CardStatus": {
            "name": "CardStatus",
            "values": [
                "toDo",
                "doing",
                "done"
            ]
        },
        "VideoStatus": {
            "name": "VideoStatus",
            "values": [
                "toDo",
                "doing",
                "done"
            ]
        }
    },
    "nonModels": {},
    "version": "b8caa4850aaa7d43a6f4e570a40d4265"
};
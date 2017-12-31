exports.getRecommendations = function( ) {
        return {
            "id": "1",
            "tags": [
                "mongo",
                "Kafka",
                "Redis",
                "ES"
            ],
            "videos": {
                "all": [],
                "mongo": [{
                    "videoId": "f0EfmBKV_PI",
                    "tags": [
                        "mongo"
                    ],
                    "description": "Mongo e Drongo morrem e vão pro céu - desenho animado infantil - animação",
                    "thumbImage": "https://img.youtube.com/vi/f0EfmBKV_PI/0.jpg"
                },
                    {
                        "videoId": "oS_18_jRpyo",
                        "tags": [
                            "mongo"
                        ],
                        "description": "Premiere: Mongo - Planet Mongo (Original Mix)",
                        "thumbImage": "https://img.youtube.com/vi/oS_18_jRpyo/0.jpg"
                    },
                    {
                        "videoId": "tgAj4uOXyus",
                        "tags": [
                            "mongo"
                        ],
                        "description": "Verrückter Mongo",
                        "thumbImage": "https://img.youtube.com/vi/tgAj4uOXyus/0.jpg"
                    },
                    {
                        "videoId": "TTbjiSjEEMY",
                        "tags": [
                            "mongo"
                        ],
                        "description": "Mongo e Drongo Show - todos os episódios - 46 minutos de desenho animado - coleção Volume 1",
                        "thumbImage": "https://img.youtube.com/vi/TTbjiSjEEMY/0.jpg"
                    },

                ],
            },
            "users": [],
            "seminars": [
                {
                    "_id" : "Bk3RJQigz",
                    "videoId" : "B1lhRkXiez",
                    "title" : "title 1",
                    "mType" : "SEMINAR",
                    "mReq" : "MODERATE",
                    "from" : 1511973023000,
                    "to" : 1512063023000,
                    "description" : "u2semdesc",
                    "tags" : [
                        "mongodb",
                        "redis"
                    ],
                    "aTags" : [],
                    "requestor" :  0,
                    "requestee" :  2,
                    "state" : "ACCEPTED",
                    "createdAt" :  1511890899767,
                    "updatedAt" :  1511890899767
                },
                {
                    "_id" : "B1sVbXjgz",
                    "videoId" : "ryxoVb7ilf",
                    "title" : "title 2",
                    "mType" : "SEMINAR",
                    "mReq" : "MODERATE",
                    "from" :  1511977378000,
                    "to" :  1512063778000,
                    "description" : "u1semdesc",
                    "tags" : [
                        "mongodb",
                        "elasticsearch"
                    ],
                    "aTags" : [],
                    "requestor" :  0,
                    "requestee" :  1,
                    "state" : "ACCEPTED",
                    "createdAt" :  1511891250900,
                    "updatedAt" :  1511891250900
                }
            ]
        }
}

exports.getPendingSeminars = function ( ) {
    return [
        {
            "_id" : "Bk3RJQigz",
            "videoId" : "B1lhRkXiez",
            "title" : "title 1",
            "mType" : "SEMINAR",
            "mReq" : "MODERATE",
            "from" : 1511973023000,
            "to" : 1512063023000,
            "description" : "u2semdesc",
            "tags" : [
                "mongodb",
                "redis"
            ],
            "aTags" : [],
            "requestor" :  0,
            "requestee" :  2,
            "state" : "ACCEPTED",
            "createdAt" :  1511890899767,
            "updatedAt" :  1511890899767
        },
        {
            "_id" : "B1sVbXjgz",
            "videoId" : "ryxoVb7ilf",
            "title" : "title 2",
            "mType" : "SEMINAR",
            "mReq" : "MODERATE",
            "from" :  1511977378000,
            "to" :  1512063778000,
            "description" : "u1semdesc",
            "tags" : [
                "mongodb",
                "elasticsearch"
            ],
            "aTags" : [],
            "requestor" :  0,
            "requestee" :  1,
            "state" : "ACCEPTED",
            "createdAt" :  1511891250900,
            "updatedAt" :  1511891250900
        }
    ]
}
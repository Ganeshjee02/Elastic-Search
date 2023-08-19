const { Client } = require('@elastic/elasticsearch');
const { studentType } = require('./models/student')
const client = new Client({
    cloud: {
        id: 'MyFirst:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDEzNmIxM2RlNDMxMjQ1NGY4NDIzNmI2NDVkMmU1MmVmJDkzZGU2YTczY2IwYzQyMWU4MzI2NDFmMjBiODFhMTNj',
    },
    node: "https://example.com:9200",
    auth: {
        username: 'elastic',
        password: '1xWSeQsLRDYSHvvXvZPzUIhV'
    }
})
var index = 'students';
var type = 'document';

handleResolve =(body)=> {

    if (!body.error) {

        console.log('\x1b[32m' + 'Success' + '\x1b[37m');
    } else {

        console.log('\x1b[33m' + 'Failed' + '\x1b[37m');
    }

    return Promise.resolve();
}

deleteIndex = async() => {
    console.log('Deleting old index ...');

    return client.indices.delete({
        index: index,
    }).then(handleResolve);
}

// checkIndices = () => {
//     client.indices.exists({ index: index }, (err, res, status) => {
//         if (res) {
//             console.log('index already exists');
//         } else {
//             client.indices.create({ index: index }, (err, res, status) => {
//                 console.log(err, res, status);
//             })
//         }
//     })
// }

 createIndex = ()=> {
    console.log('Creating new index ...');
    return client.indices.create({
      index: index,
    //   body: {
    //     settings: {
    //       index: {
    //         number_of_replicas: 0 // for local development
    //       }
    //     }
    //   }
    }).then(handleResolve);
  }
  
  // This isn't strictly necessary, but it solves a problem with closing
  // the index before it has been created
   checkStatus= () => {
    console.log('Checking status ...');
    return client.cluster.health({
      index: index
    }).then(handleResolve);
  }
  

closeIndex=async()=> {

    console.log('Closing index ...');

    return client.indices.close({
        index: index
    }).then(handleResolve);
}
const studentPutSetting = async () => {
    client.indices.putSettings({
        index: index,
        // type: type,
        body: {
            "settings": {
                // "number_of_shards": 1,
                // "number_of_replicas": 1,
                "analysis": {
                    "analyzer": {
                        "default": {
                            "type": "custom",
                            "tokenizer": "standard",
                            "filter": [
                                "lowercase",
                                "asciifolding",
                                "my_stopwords",
                                "my_synonyms"
                            ]
                        }
                    },
                    "filter": {
                        "my_stopwords": {
                            "type": "stop",
                            "stopwords": ["a", "an", "and", "the"]
                        },
                        "my_synonyms": {
                            "type": "synonym",
                            "synonyms_path": "/etc/elasticsearch/C:/elasticsearch-6.2.2/config/synonym.txt",
                            "updateable": true
                        }
                    }
                }
            }
        }
    }).then(handleResolve)
}

studentPutMapping = async () => {
    client.indices.putMapping({
        index: index,
        // type:'document',
        body: {
            "properties": {
                // body: {
                //     type:'string',
                    "id": {
                        "type": "integer"
                    },
                    "name": {
                        "type": "text",
                        "analyzer": "default"
                    },
                    "email": {
                        "type": "keyword"
                    },
                    "address": {
                        "properties": {
                            "street": {
                                "type": "text",
                                "analyzer": "default"
                            },
                            "city": {
                                "type": "text",
                                "analyzer": "default"
                            },
                            "state": {
                                "type": "keyword"
                            },
                            "zip": {
                                "type": "keyword"
                            }
                        }
                    },
                    "major": {
                        "type": "text",
                        "analyzer": "default"
                    },
                    "courses": {
                        "type": "nested",
                        "properties": {
                            "course_id": {
                                "type": "integer"
                            },
                            "course_name": {
                                "type": "text",
                                "analyzer": "default"
                            },
                            "semester": {
                                "type": "keyword"
                            },
                            "grade": {
                                "type": "keyword"
                            }
                        }
                        // }
                    }
                // }
            }
        }

    }).then(handleResolve)

}

 openIndex = async()=> {

    console.log('Open index ...');

    return client.indices.open({
        index: index
    }).then(handleResolve);
}

// client.info()
//   .then(response => console.log(response))
//   .catch(error => console.error(error))

// deleteIndex();
// createIndex()
// checkStatus()
// checkIndices();
// closeIndex()
// studentPutSetting();
studentPutMapping();
// openIndex();




module.exports = client;
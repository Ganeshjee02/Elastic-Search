studentType ={
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
    }
  };
module.exports = studentType;
const express = require('express');
const router = express.Router();
const client = require('../clientConnection');
const { studentType } = require('../models/student')

router.post('/new', async (req, res) => {
  for (let i = 0; i < 100; i++) {
    const blog = {
      title: "title" + i,
      description: 'description' + i,
      name: i,
    };
    await client.index({
      index: "blog",
      body: { ...blog }
    })
  }
  res.status(200).json('New Record Created Successfully')
})

router.get('/serch', async (req, res) => {
  try {
    const body = await client.search({
      index: "blog",
      query: {
        match_all: {},
      },
      "from": 0,
      "size": 1260
    })
    if (body) {
      res.status(200).json(body)
    }
  } catch (err) {
    console.log(err)
  }
})

router.post('/countries', async (req, res) => {
  await client.index({
    index: 'countries',
    body: { ...req.body }
  })
  res.status(200).json('New Record Created Successfully')
})

router.get('/countries/:searchText?', async (req, res) => {
  console.log(req.query.searchText);
  try {
    const body = await client.search({
      index: "countries",
      body: {
        query: {
          match: { states: req.query.searchText },
          // bool: {
          //   must: [
          //     {
          //       match: {
          //         country: req.query.searchText
          //       }
          //     }
          //   ]}
        }

      },
    })
    console.log(body);
    if (body) {
      res.status(200).json(body)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json('error');
  }
})
/**delete complete index */
// const run = async()=>{
//   client.indices.delete({
//     index: 'countries',
//   }).then(function(resp) {
//     console.log("Successful query!");
//     console.log(JSON.stringify(resp, null, 4));
//   }, function(err) {
//     console.trace(err.message);
//   });
// }

/**Student */


router.post('/student', async (req, res) => {
  await client.index({
    index: 'students',
    type: studentType,
    body: { ...req.body }
  })
  res.status(200).json('New Record Created Successfully')
})

router.get('/student/:searchText?', async (req, res) => {
  console.log(req.query.searchText);
  try {
    const body = await client.search({
     index: "students",
  body: {
        // query: {
        //   match_all:{}
        //   // match:{'address.zip':req.query.searchText},
        // }
    //     // query: {
    //     //   nested: {
    //     //     path: 'courses',
    //     //     query: {
    //     //       bool: {
    //     //         must: [
    //     //           { 
    //     //             match: { 'courses.course_id': req.query.searchText } 
    //     //           }
    //     //         ]
    //     //       }
    //     //     }
    //     //   }
    //     // }
        // "query": {
        //   "nested": {
        //     "path": "student",
            "query": {
              "nested": {
                "path": "courses",
                "query": {
                  "bool": {
                    "must": [
                      { "match": { "courses.course_id":  req.query.searchText} },
                      // { "match": { "driver.vehicle.model": "Canyonero" } }
                    ]
                  }
              //   }
              // }
          //   }
          }
        }


       }
    }
    })


    // const getMapp = await client.indices.getMapping('students')
    console.log(body);
    if (body) {
      res.status(200).json(body)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json('error');
  }
})

module.exports = router;

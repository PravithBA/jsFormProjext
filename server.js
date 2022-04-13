const fs = require('fs');
const express = require('express');
const app = express();

app.listen(6969, () => console.log('hahaha funny number'));

app.use(express.static('Public/'));
app.use(express.json())

let data = {}

app.post('/api', (req, res) => {

    data = req.body;

    fs.readFile('./Public/data.json', (err, jsondata) => {
        if (err) throw err;

        jsondataArr = String(jsondata).slice(11,-1)

        jsondataArr = JSON.parse(jsondataArr)

        for(let i = 0; i < jsondataArr.length; i++){

            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++")
            
            let obj = jsondataArr[i];
            console.log(jsondataArr.length)

            console.log("1st",obj['name'])
            if (obj['name'] == data.name){

                return res.json({

                    ye:false

                })

            }
            console.log("type -",typeof(obj),"objest -",obj)
            console.log("-------------------------------------------------")
        }

        jsondataSl = String(jsondata).slice(12,-2);

        addData = jsondataSl+","+JSON.stringify(data);

        fs.writeFile('./Public/data.json','{"users" : ['+addData+']}', function writeJSON(err) {
            if (err) return console.log(err);
        });

        return res.json({

            ye:true

        })

    })
})
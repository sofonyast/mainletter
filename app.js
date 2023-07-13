const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get('/',function(req , res){
    res.sendFile(__dirname+'/signup.html')
})

app.post('/',function(req,res){
    let fname = req.body.fname
    let lname = req.body.lname
    let email = req.body.email
    let data = {
        members:[{
            email_address:email,
            status: 'subscribed',
            merge_fields:{
            FNAME : fname,
            LNAME : lname
            }
        }
        ]
    };
    let jsonData = JSON.stringify(data)
    const url = "https://us21.api.mailchimp.com/3.0/lists/ee9ce75bb1"
    const options = {
        method : "POST",
        auth : "sofonyas:005ae77d3473e4c8f6081704a849b9e5-us21"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+'/success.html')
        }else{
            res.sendFile(__dirname+'/failure.html')
        }
        response.on('data',function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData)
    request.end()
})

app.post('/failure',function(req,res){
    res.redirect('/')
})

app.listen(process.env.PORT||3000,function(){
    console.log('server is running on port 3000')
})

// API key 
// 005ae77d3473e4c8f6081704a849b9e5-us21

// Audience Key
//ee9ce75bb1

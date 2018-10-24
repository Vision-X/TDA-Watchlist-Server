console.log("____ Bot is running ____");

const env = require('dotenv').load();

//tda auth stuff
const fs = require('fs');
const http = require('http');
const https = require('https');
const request = require('request');

//discord stuff
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const accountId = process.env.ACCOUNT_ID;

//server stuff
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());



/////////////////////////////////////////////
const privateKey  = fs.readFileSync('/key.pem', 'utf8');
const certificate = fs.readFileSync('/certificate.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};

app.get('/', function(req, res){

	var headers = {
		'Content-Type': 'application/x-www-form-urlencoded'
	}

	var options = {
                //see the Authentication API's Post Access Token method for more information
		url: 'https://api.tdameritrade.com/v1/oauth2/token',
		method: 'POST',
		headers: headers,
                //POST Body params
		form: {
			'grant_type': 'authorization_code',
			'access_type': 'offline',
			'code': req.query.code, //get the code
			'client_id': 'OAuth User ID',
			'redirect_uri': 'Redirect URI'
		}
	}

        //Post Access Token request
	request(options, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			//see Post Access Token response summary for what authReply contains
			authReply = JSON.parse(body);

			//the line below is for convenience to test that it's working after authenticating
			res.send(authReply);
		}
	})

	function errorHandler (err, req, res, next) {
		res.status(500)
		res.render('error', { error: err })
}
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//Set to 8080, but can be any port, code will only come over https, even if you specified http in your Redirect URI
httpServer.listen(8080);
httpsServer.listen(Port of Redirect URI);




///////////////////////////////////////////////////////

const fetchTDA = () => {
  return fetch(`https://api.tdameritrade.com/v1/accounts/${accountId}/watchlists`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",

    }
  })
         .then(response => response.json())
         .then(console.log(response))
         .catch(console.error)
}


app.get("/", (req, res, next) => {
  res.send({ "hello": "bro"})
  // return fetch(`https://api.tdameritrade.com/v1/accounts/${accountId}/watchlists`)
  //        .then(response => response.json())
  //        .then(console.log(response))
  //        .catch(console.log(error))
  // console.log(response);
})

bot.on('message', function(message) {
  if (message.content === '!commands') {
    message.reply("!latest");
    message.reply("!help");
    message.reply("!twitter");
  }
});

bot.on('message', function(m) {
  if (m.content === '!latest') {
    m.reply("*** Latest Trending Stocks... ***  \n 1) DVLP - 253.62 USD \n 2) SMDB - 1,200.33 USD");
  }
})



bot.login(TOKEN);

////
// const port = 3000;
// app.listen(port, () => {
//   console.log('listening on port ', port);
// })

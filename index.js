const Discord = require("discord.js");
const Client = new Discord.Client();
const express = require('express');
const Config = require("./config.json");
const http = require('http');
const mysql = require("mysql");
const fivereborn = require('fivereborn-query');
const app = express();
const server = http.createServer(app);

Client.login(Config.token);

// activity in server

function activity() {
  setTimeout(() => {
	   	fivereborn.query(Config.serverInfo[0], Config.serverInfo[1], (err, data) => {
   		  if (err) {
   		    console.log(err);
   		  } else {
   		    Client.user.setActivity(Config.nomServ + " " + data.clients + "/" + data.maxclients, { type: Config.activityType });
   		  }
   		});
    
    activity();
  }, 10000);
}
activity();

app.set('port', 3000);
server.listen(app.get('port'), () => {
	console.log(`Open to work !`);
});
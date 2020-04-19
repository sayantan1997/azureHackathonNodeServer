var express=require("express");
var cors=require("cors");
const { Connection, Request } = require("tedious");
var sql = require("mssql");
const axios = require('axios');
const cheerio = require('cheerio');

var app=express();
var data=[];


var config = {
	user: 'Codemasters',
	password: 'Alladmin900',
	server: 'azurehackathon.database.windows.net', 
	database: 'AzureHackathon',
	options: {
        encrypt: true
    } 
};


app.use(cors());
app.use(express.urlencoded());
app.use(express.json());


app.listen(process.env.PORT || 4000,()=>{
	console.log("server running");
	
});

app.post("/logicApps",(req,res)=>{

	
	
	console.log(req.query.brand+" "+req.query.category+" "+req.query.quantity);
	var url="https://prod-19.eastasia.logic.azure.com:443/workflows/5298bc5e6dd443af9db88f1149024264/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hgyKmqLYRgJyB6nJh3frEUAFT8ZJdUe0jcxsaX-7mt0";

	axios.post(url,null,{params:{'category':req.query.category,'brand':req.query.brand,'quantity':req.query.quantity}}).then(res => {
        console.log(res);
      });






	
	

})

app.get("/warehouse",(req,res)=>{

	//console.log("name requested :"+req.query.name);
	
	sql.connect(config, function (err) {
    
		if (err) console.log(err);
	
		// create Request object
		var request = new sql.Request();
		   
		// query to the database and get the records
		request.query('select * from [dbo].[ItemDetails]', function (err, recordset) {
			
			if (err) console.log(err)
	
			// send records as a response
			//console.log(recordset.recordset);
			res.send(recordset.recordset);
			
		});
	});
	
	

})

app.get("/category",(req,res)=>{

	//console.log("name requested :"+req.query.name);
	
	sql.connect(config, function (err) {
    
		if (err) console.log(err);
	
		// create Request object
		var request = new sql.Request();
		   
		// query to the database and get the records
		request.query('select distinct(category) from [dbo].[ItemDetails]', function (err, recordset) {
			
			if (err) console.log(err)
	
			// send records as a response
			//console.log(recordset.recordset);
			res.send(recordset.recordset);
			
		});
	});
	
	

})


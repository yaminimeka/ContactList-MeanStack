var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var db= mongojs('contactlist',['contactlist']);
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.get('/contactlist',function(req,res){
				db.contactlist.find(function(error,data){
				if (error){
					console.log("error while parsing the data");
				}else{
					res.json(data);
				}
				});
});

app.post('/contactlist',function(req,res) {
	console.log(req.body);
	db.contactlist.insert(req.body, function (error, data) {
		if (error) {
			console.log("error while entering the data into the database");
		} else {
			res.json(data);
		}

	});
});

	app.put('/contactlist/:id' , function (req,res) {
		var id = req.params.id;
		console.log(id);
		console.log(req.body.name);
		db.contactlist.findAndModify({
			query: {_id: mongojs.ObjectId(id)},
			update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}},
			new: true
		}, function (err, data) {
			console.log(data);
			res.json(data);

		});


	});

app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err,data) {
		res.json(data);

	});

});

app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)},function(error,data){
		if (error){
					console.log("error while entering the data into the database");
				}else {
			res.json(data);}

});
});

app.listen(3000);
console.log("the server is running on port 3000");

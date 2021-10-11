var express = require('express');
const koii = require('../src');

var app = express();
var router = express.Router();
var PORT = 3000;

// Setting single route
router.all('/user', function (req, res) {
    console.log("User Page Called");
    res.end();
});

app.use(router);
app.use(koii)

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

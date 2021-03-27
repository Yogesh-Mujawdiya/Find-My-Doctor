//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/Find-My-Doctor'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname,'/dist/Find-My-Doctor/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
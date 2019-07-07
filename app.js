const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      path       = require('path')

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/restful_blog_app", {
     useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
      
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send('Home Page!');
})


// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'));

//     app.get('*', (req,res) => {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); //relative path
//     });
// }

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running");
});
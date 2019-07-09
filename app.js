const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      path       = require('path');

//APP/CONFIG
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/restful_blog_app", {
     useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));     
app.set('view engine', 'ejs');
app.use(express.static("public"));


//MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
const Blog = mongoose.model('Blog',blogSchema);

// Blog.create({
// 	title: 'Test',
// 	image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
// 	body: 'Hello this is a blog post!'
// });

//RESTFUL ROUTES 
app.get('/', (req, res) => {
    res.redirect('blogs');
});

//INDEX ROUTE
app.get('/blogs', (req,res) => {
	Blog.find({}, (err,blogs) => {
		if(err){
			console.log('ERROR!');
			console.log(err);
		} else {
			res.render('index', {blogs: blogs});
		}
	});
});

//NEW ROUTE
app.get('/blogs/new', (req,res) => {
	res.render('new');
});

//CREATE ROUTE
app.post('/blogs', (req,res) => {
	//Create blog
	Blog.create( req.body.blog, (err,newBlog) => {
		if(err){
			console.log('ERROR!');
			res.render('new');
		} else {
			//then, redirect
			res.redirect('/blogs');
		}
	});
	
});
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'));

//     app.get('*', (req,res) => {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); //relative path
//     });
// }

app.listen( process.env.PORT || 3000, () => {
    console.log("Server is running");
});
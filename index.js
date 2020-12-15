const { urlencoded } = require('express')
const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5050

app.set("views", "./views")
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static(__dirname + 'public/css'))
app.use(express.static(__dirname + 'public/js'))
app.use(express.static(__dirname + 'public/img'))

app.use(urlencoded({ extended: false }))

//login
app.get('/', (req, res) => res.render('index'))
app.get('/index.html', (req, res) => res.render('index'))
let login = false;
const checkLogin = (req, res, next) => {
    if (!login) res.redirect("/404");
    else next();
};
//404
app.get('/404', (req, res) => res.render('404'))
app.get('/404.html', (req, res) => res.render('404'))
//files
app.get('/files', checkLogin, (req, res) => res.render('files'))
app.get('/files', checkLogin, (req, res) => res.render('files'))
//teampage
app.get('/teampage', checkLogin, (req, res) => res.render('teampage'))
app.get('/teampage', checkLogin, (req, res) => res.render('teampage'))
//download
app.get('/download/files/:filename', checkLogin, (req, res) => {
    res.download('files/' + req.params.filename);
})

app.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    login = checkPass(username, password);
    if (login)
        res.redirect('teampage');
    else res.redirect('404');
})

const checkPass = (user, pass) => {
    return user === "admin" && pass === "admin";
}


app.listen(port, () => {
    console.log(`App Listening at http://localhost:${port}`);
})
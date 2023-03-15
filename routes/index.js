var express = require('express');
var router = express.Router();
let cookieParser = require("cookie-parser");
let session = require('express-session');
let nocache = require('nocache');

router.use(cookieParser())
router.use(nocache())
router.use(session({
  secret: "key",
  saveUninitialized: true,
  cookie: { maxAge: 30000 },
  resave: false
}));

router.get('/', function (req, res,) {
  res.send('WELCOME TO THE LOCAL SERVER')
});

router.get('/login', function (req, res) {
  session = req.session;
  if (session.userid) {
    res.redirect('/home')
  } else {
    res.render('index')
  }
});

router.get('/home', function (req, res,) {
  session = req.session;
  if (session.userid) {
    res.render('home', { username })
  } else {
    res.redirect('/login')
  }
});

const username = "Afeef"
const password = 123

router.post("/home", function (req, res) {
  if (req.body.uname == username && req.body.pass == password) {
    session = req.session;
    session.userid = req.body.uname
    console.log(req.session)
    res.render('home', { username });
  } else {
    req.session.error = true
    res.render("index", { error: req.session.error })
  }
});


router.get('/logout', function (req, res) {
  req.session.destroy()
  res.redirect('/login')
})

let products = [
  {
    name: "Oppo",
    Image: "https://m.media-amazon.com/images/I/61SA4jZ51jS.jpg",
    price: 10000
  },
  {
    name: "iphone",
    Image: "https://cdn1.smartprix.com/rx-i3rAnwOtl-w420-h420/apple-iphone-14-pro.jpg",
    price: 20000
  },
  {
    name: "Samsung",
    Image: "https://images.samsung.com/is/image/samsung/assets/sg/smartphones/galaxy-s22-ultra/specs/galaxy-s22-ultra/galaxy-s22-ultra_specs_design_colors_phantom-white.jpg?$163_346_PNG$",
    price: 7000
  },
  {
    name: "MI",
    Image: "https://resim.epey.com/739539/m_xiaomi-12-pro-1.png",
    price: 10000
  },
];

router.get("/cart", function (req, res) {
  res.render("cart", { products });
});

module.exports = router;
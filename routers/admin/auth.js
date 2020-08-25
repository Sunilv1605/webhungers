const express = require('express');
const router = express.Router();
var md5 = require('md5');
var path = require('path');
router.get('/', reverseBackdoorEntry, (req, res) => {
  // const { email, password } = req.body;
  
  var pageData = { title: "Admin Login", pageName: 'login' };
  // var pageData = { title: "Admin Login", pageName: 'login', errorMsg: req.flash('errorMsg') };
  res.render('admin/layout', pageData);
});

router.post('/auth', (req, res) => {
  const { userEmail, userPassword } = req.body;
  var convertedPass = md5(userPassword);
  req.getConnection((err, conn) => {
    if (err) {
      return res.send({
        success: false,
        msg: 'Database Connection Failed!'
      });
    }
    conn.query(`SELECT id FROM admins WHERE (email='${userEmail}' OR username='${userEmail}' ) AND password='${convertedPass}'`, (err, rows) => {
      if (err) {
        return res.send({
          success: false,
          msg: 'Server Internal Error!'
        });
      }
      if (rows.length === 0) {
        /*  return res.send({
          success: false,
          msg: 'Email or Password is Incorrect!'
        }); */
        // req.flash("errorMsg", "Error! The password is wrong");
        res.redirect('/admin');
      }
      req.session.isUserLoggedIn = true;
      res.redirect('/admin/dashboard');
    });
  });
});

function reverseBackdoorEntry(req, res, next){
  if(req.session.isUserLoggedIn){
    res.redirect('admin/dashboard');
  }
  next();
}

function isUserloggedIn(req, res, next){
  if(!req.session.isUserLoggedIn){
    console.log('Yes User is logged In');
    res.redirect('/admin');
  }
  next();
}

// router.get('/dashboard', isUserloggedIn, function(req, res){ //uncomment this line later
router.get('/dashboard', function(req, res){
  // console.log('res.session.isUserLoggedIn', req.session.isUserLoggedIn);
  var pageData = { title: "Welcome Admin", pageName: 'dashboard', errorMsg: req.flash('errorMsg') };
  res.render('admin/layout', pageData);
});

/* 
* product page where list of products is dislayed product-list page
*/
router.get('/product', function (req, res) {
  // console.log('res.session.isUserLoggedIn', req.session.isUserLoggedIn);

  req.getConnection((err, conn) => {
    if (err) {
      return res.send({
        success: false,
        msg: 'Database Connection Failed!'
      });
    }
    conn.query(`SELECT * FROM products WHERE status='1' `, (err, rows) => {
      if (err) {
        return res.send({
          success: false,
          msg: 'Server Internal Error!'
        });
      }
      var products = rows;
      // var products = JSON.parse(rows);
      /* console.log('final : : : ', history);
      console.log('length : ', final[0].length);
      console.log('rows', rows); */
      var imagePath = path.resolve() + '/public/product/images/';
      var pageData = { title: "Products", pageName: 'product', products: products, imagePath: imagePath, errorMsg: req.flash('errorMsg')};
      res.render('admin/layout', pageData);
    });
  });
  
});


router.get('/products/add', function(req, res){
  
  var pageData = { title: "Add New Product", pageName: 'addProduct' };
  res.render('admin/layout', pageData);
});

router.post('/products/add', function(req, res){

  var nPhoto = req.files.productImage;
  if (nPhoto.mimetype == 'image/jpeg' || nPhoto.mimetype == 'image/png' || nPhoto.mimetype == 'image/jpg' || nPhoto.mimetype == 'image/gif') {
    if (nPhoto.size <= 1024 * 1024 * 2) {
      var destinationPath = path.resolve() + '/public/product/images/' + nPhoto.name;
      nPhoto.mv(destinationPath, function (error, result) {
        if (error) {
          req.flash('errorMsg', "Error! Due to technical issue, unable to post Product");
          res.redirect('/products/add');
        }
        // console.log('Image Uploaded Successfully');
        var newProduct = { title: req.body.title, description: req.body.description, prodImage: nPhoto.name, price: req.body.price, discountedPrice: req.body.discountedPrice, inventory: req.body.inventory  };

        req.getConnection((err, conn) => {
          if (err) {
            return res.send({
              success: false,
              msg: 'Database Connection Failed!'
            });
          }
          conn.query(`INSERT INTO products(title, description, image, price, discounted_price, inventory, status) VALUES('${newProduct.title}','${newProduct.description}', '${newProduct.prodImage}','${newProduct.price}','${newProduct.discountedPrice}','${newProduct.inventory}', '1' )`, (err, rows) => {
            if (err) {
              console.log('Error! Unbale to insert product data in DB');
              req.flash('errorMsg', "Error! Due to technical issue, unable to post product");
              res.redirect('/admin/product');
            }
            res.redirect('/admin/product');
          });
        });
      });
    }
    else {
      req.flash('errorMsg', "Error! Image size is too large.");
      res.redirect('/products/add');
    }
  } else {
    req.flash('errorMsg', "Error! Image type is not allowed");
    res.redirect('/products/add');
  }
  
  console.log(req.body);
  console.log(req.files);
});

module.exports = router;

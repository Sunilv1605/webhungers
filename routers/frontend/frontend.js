const express = require('express');
const router = express.Router();

// var path = require('path');

/* 
* Homepage of the website, Dislay all products on this page
*/
router.get('/', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      return res.send({
        success: false,
        msg: 'Database Connection Failed!'
      });
    }
    conn.query(`SELECT * FROM products WHERE status='1' ORDER BY is_featured DESC `, (err, rows) => {
      if (err) {
        return res.send({
          success: false,
          msg: 'Server Internal Error!'
        });
      }
      // if (rows.length === 0) {
      //   // req.flash("errorMsg", "Error! The password is wrong");
      //   res.redirect('/admin');
      // }
      var productsList = rows;
      var pageData = { title: "Homepage", pageName: 'homepage', productsList: productsList, successMsg: req.flash('successMsg') };
      res.render('frontend/layout', pageData);
    });
  });
});

router.get('/product/:productId', (req, res) => {
  const { productId } = req.params;
  req.getConnection((err, conn) => {
    if (err) {
      return res.send({
        success: false,
        msg: 'Database Connection Failed!'
      });
    }
    conn.query(`SELECT * FROM products WHERE status='1' AND id='${productId}' `, (err, rows) => {
      if (err) {
        return res.send({
          success: false,
          msg: 'Server Internal Error!'
        });
      }
      // if (rows.length === 0) {
      //   // req.flash("errorMsg", "Error! The password is wrong");
      //   res.redirect('/admin');
      // }
      var productData = rows[0];
      var pageData = { title: "Homepage", pageName: 'product', productData: productData };
      res.render('frontend/layout', pageData);
    });
  });
});

/* 
* add product to the cart
*/
router.get('/add_to_cart/:productId', (req, res) => {
  const { productId } = req.params;
  if (req.session.addToCart) {
    var addToCart = req.session.addToCart;
    addToCart.push(productId);
    req.session.addToCart = addToCart;
    console.log('addToCart', addToCart);
    // res.send("You visited this page " + req.session.addToCart + " times");
  }
  else {
    let addToCart = new Array();
    addToCart.push(productId);
    req.session.addToCart = addToCart;
    // res.send("Welcome to this page for the first time!");
  }
  // var pageData = { title: "Homepage", pageName: 'product' };
  req.flash('successMsg', "Product has been added to cart");
  res.redirect('/');
});

/* 
* Cart Page
*/
router.get('/cart', (req, res) => {
  const { productId } = req.params;
  var addToCart = req.session.addToCart;
  if (req.session.addToCart){
    var count = Object.keys(addToCart).length;
  }
  else{
    addToCart = ['0'];
  }

  console.log('addToCart', addToCart, addToCart, count);
  req.getConnection((err, conn) => {
    if (err) {
      return res.send({
        success: false,
        msg: 'Database Connection Failed!'
      });
    }
    
    conn.query(`SELECT * FROM products WHERE  id IN (${addToCart}) AND status='1' `, (err, rows) => {
      if (err) {
        return res.send({
          success: false,
          msg: 'Server Internal Error!'
        });
      }
      var productList = rows;
      // console.log('productList', productList);
      var pageData = { title: "My Cart", pageName: 'cart', productList: productList, successMsg: req.flash('successMsg') };
      res.render('frontend/layout', pageData);
    });
  });
});

router.get('/remove_from_cart/:productId', (req, res) => {
  const { productId } = req.params;
  var addToCart = req.session.addToCart;
  if (req.session.addToCart) {
    var count = Object.keys(addToCart).length;
    if (count>0){
      addToCart.pop(productId);
      req.session.addToCart = addToCart;
      req.flash('successMsg', "Product removed from Cart");
    }
    if(count>1){
      res.redirect('/cart');
    }
    else{
      res.redirect('/');
    }
  }
});

module.exports = router;
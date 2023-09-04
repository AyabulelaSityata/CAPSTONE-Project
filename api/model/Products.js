const db = require("../config");

class Products {
  addProduct(req, res) {
    const product = {
      prodName: req.body.prodName,
      quantity: req.body.quantity,
      prodPrice: req.body.prodPrice,
      Category: req.body.Category,
      prodUrl: req.body.prodUrl,
    };

    const query = "INSERT INTO Products SET ?";
    db.query(query, product, (err, result) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Product added successfully",
        productID: result.insertID,
      });
    });
  }
  //retrieving products

  fetchProducts(req, res) {
    const query = `
            SELECT prodID, prodName, quantity, prodPrice, Category, prodUrl FROM Products 
        `;

    db.query(query, (err, results) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        results,
      });
    });
  }

  //retrieving a single product
  fetchProduct(req, res) {
    const query = `
            SELECT prodID, prodName, quantity, prodPrice, Category, prodUrl FROM Products WHERE prodID = ${req.params.id}
        `;
    db.query(query, (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(404).json({
          status: 404,
          msg: "Product not found",
        });
      } else {
        res.json({
          status: res.statusCode,
          results: result[0],
        });
      }
    });
  }

  // updating a product
  updateProduct(req, res) {
    const product = {
      prodName: req.body.prodName,
      quantity: req.body.quantity,
      prodPrice: req.body.prodPrice,
      Category: req.body.Category,
      prodUrl: req.body.prodUrl,
    };
    const query = `
            UPDATE Products SET ? WHERE prodID = ${req.params.id}
        `;

    db.query(query, product, (err, results) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "The product was successfully updated",
      });
    });
  }
  // deleting a record
  deleteProduct(req, res) {
    const query = `
      DELETE FROM Products WHERE prodID = ${req.params.id}
      `;

    db.query(query, (err, results) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Product deleted successfully",
      });
    });
  }
}
module.exports = Products;
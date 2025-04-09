// ============= Answer to question 1==================================//
//npm init to initialize a new Node.js project and create a package.json file in the current directory.
//npm i mysql2 to install the mysql2 Node.js package as a dependency in the current project.
// the below is to connect and to check if the database is connected.

// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "myDBuser",
//   password: "123456",
//   database: "myDB",
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("error connectiong to the database:", err.message);
//     return;
//   }
//   console.log("connected to the database.");
// });



//===========================================================================//

// ============= Answer to question 2==================================//

// npm i express to install Express from NPM

//2.1. executing the code directly without using Express

//putting query on a variable

//   let product = `CREATE TABLE product (
//     product_id INT PRIMARY KEY AUTO_INCREMENT,
//     product_url VARCHAR(255),
//     product_name VARCHAR(255)
// )`;

//   let user_table = `CREATE TABLE user_table (
//     user_id INT PRIMARY KEY AUTO_INCREMENT,
//     user_name VARCHAR(100),
//     user_password VARCHAR(255)
// )`;

//   let product_description = `CREATE TABLE product_description (
//     description_id INT PRIMARY KEY AUTO_INCREMENT,
//     product_id INT,
//     product_brief_description TEXT,
//     product_description TEXT,
//     product_image VARCHAR(255),
//     product_link VARCHAR(255),
//     FOREIGN KEY (product_id) REFERENCES product(product_id)
// )`;

//   let product_price = `CREATE TABLE product_price (
//     price_id INT PRIMARY KEY AUTO_INCREMENT,
//     product_id INT,
//     starting_price DECIMAL(10, 2),
//     price_range VARCHAR(100),
//     FOREIGN KEY (product_id) REFERENCES product(product_id)
// )`;

//   let orders = `CREATE TABLE orders (
//     order_id INT PRIMARY KEY AUTO_INCREMENT,
//     product_id INT,
//     user_id INT,
//     FOREIGN KEY (product_id) REFERENCES product(product_id),
//     FOREIGN KEY (user_id) REFERENCES user_table(user_id)
// )`;
// //executing the querys'  wrote above

//   connection.query(product, (err, results, fields) => {
//     if (err) console.log(`Error Found: ${err}`);
//   });

//   connection.query(product_description, (err, results, fields) => {
//     if (err) console.log(`Error Found: ${err}`);
//   });

//   connection.query(product_price, (err, results, fields) => {
//     if (err) console.log(`Error Found: ${err}`);
//   });

//   connection.query(orders, (err, results, fields) => {
//     if (err) console.log(`Error Found: ${err}`);
//   });

//   connection.query(user_table, (err, results, fields) => {
//     if (err) console.log(`Error Found: ${err}`);
//   });

//********************************************************** //

//2.2 using Express module to receive requests

// const express = require("express"); //to import and make express available
// const app = express();
// const prot = 3000;
// app.get("/install", (req, res) => {
//   let products = `CREATE TABLE product (
//     product_id INT PRIMARY KEY AUTO_INCREMENT,
//     product_url VARCHAR(255),
//     product_name VARCHAR(255)
// )`;

//   let user_table = `CREATE TABLE user_table (
//     user_id INT PRIMARY KEY AUTO_INCREMENT,
//     user_name VARCHAR(100),
//     user_password VARCHAR(255)
// )`;

//   let product_description = `CREATE TABLE product_description (
//     description_id INT PRIMARY KEY AUTO_INCREMENT,
//     product_id INT,
//     product_brief_description TEXT,
//     product_description TEXT,
//     product_image VARCHAR(255),
//     product_link VARCHAR(255),
//     FOREIGN KEY (product_id) REFERENCES product(product_id)
// )`;

//   let product_price = `CREATE TABLE product_price (
//     price_id INT PRIMARY KEY AUTO_INCREMENT,
//     product_id INT,
//     starting_price DECIMAL(10, 2),
//     price_range VARCHAR(100),
//     FOREIGN KEY (product_id) REFERENCES product(product_id)
// )`;

//   let orders = `CREATE TABLE orders (
//     order_id INT PRIMARY KEY AUTO_INCREMENT,
//     product_id INT,
//     user_id INT,
//     FOREIGN KEY (product_id) REFERENCES product(product_id),
//     FOREIGN KEY (user_id) REFERENCES user_table(user_id)
// )`;

//   connection.query(products, (err, results, fields) => {
//     if (err) console.log(`Error Found: ${err}`);
//   });

//   connection.query(user_table, (err, results, fields) => {
//     if (err) console.log(`Error Found: ${err}`);
//   });

//   connection.query(product_description, (err, results, fields) => {
//     if (err) console.log(`Error Found: ${err}`);
//   });

//   connection.query(product_price, (err, results, fields) => {
//     if (err) console.log(`Error Found: ${err}`);
//   });

//   connection.query(orders, (err, results, fields) => {
//     if (err) console.log(`Error Found: ${err}`);
//   });

//   res.send("Your Tables are created!");
// });

// app.listen(prot, (err) => {
//   if (err) console.log(err.message);
//   else console.log("server is running on port" + prot);
// });

//====================================================================================//


//=========================Answer Q3 =================================================//

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2"); 

const app = express();
const port = 3000; 

// Enable CORS
app.use(cors());

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false })); 

//  MySQL Connection 

const connection = mysql.createConnection({
  host: "localhost", 
  user: "myDBuser", 
  password: "123456", 
  database: "myDB", 
});

//to check if the database is connected.

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Route to handle the POST request from the form
app.post("/add-product", (req, res) => {
  const {
    product_url,
    product_name,
    user_name,
    user_password,
    product_brief_description,
    product_description,
    product_image,
    product_link,
    starting_price,
    price_range,
  } = req.body;

  // SQL query to insert data into the  table
  const product =
    "INSERT INTO product (product_url, product_name) VALUES (?, ?)";
  const userTable =
    "INSERT INTO user_table (user_name, user_password) VALUES (?, ?)";
  const productDescription =
    "INSERT INTO product_description (product_brief_description, product_description, product_image, product_link) VALUES (?, ?, ?, ?)";
  const price =
    "INSERT INTO product_price (starting_price, price_range) VALUES (?, ?)";

  // Execute the SQL query
  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      return res.status(500).send(`Database error: ${err.message}`);
    }

    connection.query(
      product,
      [product_url, product_name],
      (err, productResult) => {
        if (err) {
          return connection.rollback(() => {
            console.error("Error inserting product:", err);
            res
              
              .send(`Error adding product to the database: ${err.message}`);
          });
        }
        console.log("Product details added successfully:", productResult);

        connection.query(
          userTable,
          [user_name, user_password],
          (err, userResult) => {
            if (err) {
              return connection.rollback(() => {
                console.error("Error inserting user:", err);
                res
                  
                  .send(`Error adding user details: ${err.message}`);
              });
            }
            console.log("User details added successfully:", userResult);

            connection.query(
              productDescription,
              [
                product_brief_description,
                product_description,
                product_image,
                product_link,
              ],
              (err, descriptionResult) => {
                if (err) {
                  return connection.rollback(() => {
                    console.error("Error inserting product description:", err);
                    res
                      
                      .send(`Error adding product description: ${err.message}`);
                  });
                }
                console.log(
                  "Product description added successfully:",
                  descriptionResult
                );

                connection.query(
                  price,
                  [starting_price, price_range],
                  (err, priceResult) => {
                    if (err) {
                      return connection.rollback(() => {
                        console.error("Error inserting price:", err);
                        res
                          
                          .send(`Error adding product price: ${err.message}`);
                      });
                    }
                    console.log(
                      "Product price added successfully:",
                      priceResult
                    );

                    connection.commit((err) => {
                      if (err) {
                        return connection.rollback(() => {
                          console.error("Error committing transaction:", err);
                          res
                            
                            .send(
                              `Database error during commit: ${err.message}`
                            );
                        });
                      }
                      res.send("Product details added successfully!");
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});




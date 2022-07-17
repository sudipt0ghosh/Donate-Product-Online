const express = require("express");
const app = express();
require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/reg");
const Product = require("./models/pro");
const multer = require("multer");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/products", (req, res) => {
  res.render("products");
});
// app.get("/register", (req, res) => {
//   res.render("register");
// });
// app.get("/login", (req, res) => {
//   res.render("login");
// });
app.get("/contacts", (req, res) => {
  res.render("contacts");
});
app.get("/aboutus", (req, res) => {
  res.render("aboutus");
});
app.get("/donate", (req, res) => {
  res.render("donate");
});
app.get("/reg-sig", (req, res) => {
  res.render("reg-sig");
});

//user db create and register
app.post("/register", async (req, res) => {
  try {
    const pass = req.body.pass;
    const cpass = req.body.cnfpass;
    if (pass === cpass) {
      const registerEmp = new Register({
        name: req.body.fullName,
        email: req.body.email,
        mobile: req.body.mobile,
        password: pass,
        cnfpass: cpass,
      });
      const registerd = await registerEmp.save();
      res.status(201).render("index");
    } else {
      console.log("password not match");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//user login
app.post("/login", async (req, res) => {
  try {
    const em = req.body.email;
    const pass = req.body.pass;
    const userEmail = await Register.findOne({ email: em });
    if (userEmail.password === pass) {
      res.status(201).render("index");
    } else {
      res.send("invalid login");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//products insert
var StorageEng = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: StorageEng,
}).single("pimage");

app.post("/donate", upload, async(req, res) => {
  try {
  const addProduct = new Product({
    product_name: req.body.pname,
    product_catagory: req.body.pcatagory,
    product_manufacturing_date: req.body.pdate,
    product_cost: req.body.pcost,
    product_description: req.body.pdes,
    product_image: req.file.filename,
  });
    const added = await addProduct.save();
    res.status(201).send("successfull");
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});

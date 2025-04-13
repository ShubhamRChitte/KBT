const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const port = 3000;
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const multer = require('multer');
const fs = require('fs');

// Models
const Menu = require("./models/menu.js");
const Reserv = require("./models/table_reserv.js");
const User = require("./models/user.js");

// Middleware
const { isLoggedIn, isAdmin, isAuthenticated } = require("./middleware/auth.js");

// Routes
const authRoutes = require("./routes/auth.js");
const adminRoutes = require("./routes/admin.js");

app.use(methodOverride("_method"));

// connect the views path
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// connect the public path
app.use(express.static(path.join(__dirname, "public")));

// convert to parse data
app.use(express.urlencoded({ extended: true }));

// use for json data
app.use(express.json());

// Configure session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// Flash messages
app.use(flash());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require('./config/passport.js')(passport);

// Middleware to pass session data to views
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.isAdmin = req.user && req.user.role === 'admin';
    res.locals.isLoggedIn = req.isAuthenticated();
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.cartCount = req.session.cart ? req.session.cart.length : 0;
    next();
});

// MongoDB connection
const mongoURL = "mongodb://127.0.0.1:27017/kbtcafe";
main().then((res) => {
    console.log("connected DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongoURL);
}

// Use routes
app.use('/kbt/auth', authRoutes);
app.use('/kbt/admin', adminRoutes);

// initialize cart
let select_itm = new Set();

// ROUTES

// home of the website
app.get("/kbt", async (req, res) => {
    let items = await Menu.find({});
    res.render("kbtcafe.ejs", { items });
});

// about
app.get("/kbt/about", (req, res) => {
    res.render("about.ejs");
});

// menu
app.get("/kbt/menu", async (req, res) => {
    res.render("menu.ejs");
});

// view all menu
app.get("/kbt/all_menu", async (req, res) => {
    let items = await Menu.find({});
    res.render("all.ejs", { items });
});

// contact page
app.get("/kbt/contact", (req, res) => {
    res.render("contact/index.ejs");
});

// handle contact form submission
app.post("/kbt/contact/send", (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    
    // Here you would normally send an email or save the contact message
    // For now we'll just flash a success message
    
    req.flash('success', 'Thank you for your message! We will get back to you soon.');
    res.redirect('/kbt/contact');
});

// table reservation - requires login
app.get("/kbt/reservation", isLoggedIn, (req, res) => {
    res.render("new-reservation.ejs");
});

// quantity select
app.get("/kbt/itm-qty", (req, res) => {
    res.render("item-qty.ejs", { result: req.session.cart });
});

// Add item to cart
app.post("/kbt/:id/itm", async (req, res) => {
    const { id } = req.params;
    const item = await Menu.findById(id);
    
    if (!item) {
        return res.status(404).send("Item not found");
    }
    
    if (!req.session.cart) req.session.cart = [];
    
    const exists = req.session.cart.some(i => i._id === item._id.toString());
    if (!exists) {
        req.session.cart.push({
            _id: item._id.toString(),
            title: item.title,
            price: item.price,
            image: item.image
        });
    }
    
    res.send(String(req.session.cart.length)); // Return count as plain text
});

// Admin only routes - protected by middleware
app.get("/kbt/reserv_all", isAdmin, async (req, res) => {
    let reservs = await Reserv.find({});
    res.render("reserv_all.ejs", { reservs });
});

// Configure storage for payment proof uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/uploads/payments';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, 'payment-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        // Accept only images
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Bill
app.post("/kbt/bill", async (req, res) => {
    const selectedItems = req.body.items; // key: itemId, value: quantity
    const itemIds = Object.keys(selectedItems).filter(id => parseInt(selectedItems[id]) > 0);
    
    // Fetch full item details
    const items = await Menu.find({ _id: { $in: itemIds } });
    
    // Prepare bill data
    const billItems = items.map(item => {
        const qty = parseInt(selectedItems[item._id]);
        return {
            title: item.title,
            price: item.price,
            quantity: qty,
            total: item.price * qty
        };
    });
    
    const grandTotal = billItems.reduce((sum, item) => sum + item.total, 0);
    const itemTotal = billItems.reduce((sum, item) => sum + item.quantity, 0);
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    
    // Generate order number
    const orderNumber = Math.floor(100000 + Math.random() * 900000); // Generate a random order number
    
    // Store order information in session for payment page
    req.session.orderInfo = {
        orderNumber,
        grandTotal,
        itemTotal,
        date,
        time,
        billItems
    };
    
    res.render("bill.ejs", { 
        billItems, 
        grandTotal, 
        date, 
        time, 
        itemTotal,
        orderNumber,
        req // Pass the request object to access user information
    });
});

// Payment page - displays payment options
app.get("/kbt/payment", (req, res) => {
    // Check if order info exists
    if (!req.session.orderInfo) {
        req.flash('error', 'No order information found. Please create a new order.');
        return res.redirect('/kbt');
    }
    
    const { orderNumber, grandTotal, date } = req.session.orderInfo;
    
    res.render('payment.ejs', { 
        orderNumber, 
        grandTotal, 
        date
    });
});

// Payment confirmation - process the payment
app.post("/kbt/payment/confirm", upload.single('paymentProof'), (req, res) => {
    // Check if order info exists
    if (!req.session.orderInfo) {
        req.flash('error', 'No order information found. Please create a new order.');
        return res.redirect('/kbt');
    }
    
    const { orderNumber, grandTotal, date } = req.session.orderInfo;
    const { paymentMethod, paymentId } = req.body;
    
    // Here you would normally process the payment with a payment gateway
    // For now we'll just simulate a successful payment
    
    // Get file path if uploaded
    let uploadedFile = null;
    if (req.file) {
        uploadedFile = `/uploads/payments/${req.file.filename}`;
    }
    
    // Clear cart after successful payment
    req.session.cart = [];
    
    // Show success page
    res.render('payment-success.ejs', {
        orderNumber,
        grandTotal,
        date,
        paymentMethod,
        transactionId: paymentId || '',
        uploadedFile
    });
});

// remove the item from cart
app.get("/kbt/:id/remove", async (req, res) => {
    let { id } = req.params;
    req.session.cart = req.session.cart.filter(item => item._id !== id);
    res.redirect("/kbt/itm-qty");
});

// show item
app.get("/kbt/:id/show", async (req, res) => {
    let { id } = req.params;
    let item = await Menu.findById(id);
    res.render("item_show.ejs", { item });
});

// Table reservation
app.post("/kbt/reserv", isLoggedIn, async (req, res) => {
    let { name, phone, person, date, time, message } = req.body;
    let addTableReservation = new Reserv({
        name,
        phone,
        person,
        date,
        time,
        message
    });
    
    await addTableReservation.save();
    req.flash('success', 'Reservation successfully created!');
    res.redirect("/kbt");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 
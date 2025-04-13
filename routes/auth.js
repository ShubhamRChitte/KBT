const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');

// Register page - Display the registration form
router.get('/register', (req, res) => {
    res.render('auth/register');
});

// Register logic - Create new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            req.flash('error', 'Username or email already in use');
            return res.redirect('/kbt/auth/register');
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'user'  // Default role is user
        });
        
        await newUser.save();
        req.flash('success', 'Account created successfully! Please login');
        res.redirect('/kbt/auth/login');
    } catch (error) {
        req.flash('error', 'Error creating account');
        res.redirect('/kbt/auth/register');
    }
});

// Login page - Display login form
router.get('/login', (req, res) => {
    res.render('auth/login');
});

// Login logic
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/kbt/auth/login',
    failureFlash: true
}), (req, res) => {
    req.flash('success', `Welcome back, ${req.user.username}!`);
    // Redirect to admin panel if admin, otherwise to home
    if (req.user.role === 'admin') {
        res.redirect('/kbt/admin');
    } else {
        res.redirect('/kbt');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have been logged out');
        res.redirect('/kbt');
    });
});

// Create Admin - Only for initial setup (should be removed or secured in production)
router.get('/setup-admin', async (req, res) => {
    try {
        // Check if an admin already exists
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            req.flash('error', 'Admin already exists');
            return res.redirect('/kbt');
        }
        
        // Create default admin
        const hashedPassword = await bcrypt.hash('admin123', 12);
        const adminUser = new User({
            username: 'admin',
            email: 'admin@kbtcafe.com',
            password: hashedPassword,
            role: 'admin'
        });
        
        await adminUser.save();
        req.flash('success', 'Admin account created');
        res.redirect('/kbt/auth/login');
    } catch (error) {
        req.flash('error', 'Error creating admin');
        res.redirect('/kbt');
    }
});

module.exports = router; 
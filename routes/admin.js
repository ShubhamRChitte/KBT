const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');
const Reserv = require('../models/table_reserv');
const { isAdmin } = require('../middleware/auth');

// Admin dashboard
router.get('/', isAdmin, async (req, res) => {
    try {
        const menuCount = await Menu.countDocuments();
        const reservCount = await Reserv.countDocuments();
        res.render('admin/dashboard', { menuCount, reservCount });
    } catch (err) {
        req.flash('error', 'Error loading dashboard');
        res.redirect('/kbt');
    }
});

// MENU MANAGEMENT ROUTES
// List all menu items
router.get('/menu', isAdmin, async (req, res) => {
    try {
        const menuItems = await Menu.find({});
        res.render('admin/menu/index', { menuItems });
    } catch (err) {
        req.flash('error', 'Error loading menu items');
        res.redirect('/kbt/admin');
    }
});

// New menu item form
router.get('/menu/new', isAdmin, (req, res) => {
    res.render('admin/menu/new');
});

// Create new menu item
router.post('/menu', isAdmin, async (req, res) => {
    try {
        const { title, description, price, image } = req.body;
        const newMenuItem = new Menu({
            title,
            description,
            price,
            image: {
                filename: 'default.jpg',
                url: image || '/images/default-food.jpg'
            }
        });
        await newMenuItem.save();
        req.flash('success', 'Menu item added successfully!');
        res.redirect('/kbt/admin/menu');
    } catch (err) {
        req.flash('error', 'Error creating menu item');
        res.redirect('/kbt/admin/menu/new');
    }
});

// Edit menu item form
router.get('/menu/:id/edit', isAdmin, async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) {
            req.flash('error', 'Menu item not found');
            return res.redirect('/kbt/admin/menu');
        }
        res.render('admin/menu/edit', { menuItem });
    } catch (err) {
        req.flash('error', 'Error loading menu item');
        res.redirect('/kbt/admin/menu');
    }
});

// Update menu item
router.put('/menu/:id', isAdmin, async (req, res) => {
    try {
        const { title, description, price, image } = req.body;
        const updatedItem = await Menu.findByIdAndUpdate(req.params.id, {
            title,
            description,
            price,
            'image.url': image || '/images/default-food.jpg'
        }, { new: true });
        
        req.flash('success', 'Menu item updated successfully!');
        res.redirect('/kbt/admin/menu');
    } catch (err) {
        req.flash('error', 'Error updating menu item');
        res.redirect(`/kbt/admin/menu/${req.params.id}/edit`);
    }
});

// Delete menu item
router.delete('/menu/:id', isAdmin, async (req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        req.flash('success', 'Menu item deleted successfully!');
        res.redirect('/kbt/admin/menu');
    } catch (err) {
        req.flash('error', 'Error deleting menu item');
        res.redirect('/kbt/admin/menu');
    }
});

// RESERVATION MANAGEMENT ROUTES
// List all reservations
router.get('/reservations', isAdmin, async (req, res) => {
    try {
        const reservations = await Reserv.find({}).sort({ date: 1 });
        res.render('admin/reservations/index', { reservations });
    } catch (err) {
        req.flash('error', 'Error loading reservations');
        res.redirect('/kbt/admin');
    }
});

// Edit reservation form
router.get('/reservations/:id/edit', isAdmin, async (req, res) => {
    try {
        const reservation = await Reserv.findById(req.params.id);
        if (!reservation) {
            req.flash('error', 'Reservation not found');
            return res.redirect('/kbt/admin/reservations');
        }
        res.render('admin/reservations/edit', { reservation });
    } catch (err) {
        req.flash('error', 'Error loading reservation');
        res.redirect('/kbt/admin/reservations');
    }
});

// Update reservation
router.put('/reservations/:id', isAdmin, async (req, res) => {
    try {
        const { name, phone, person, date, time, message } = req.body;
        await Reserv.findByIdAndUpdate(req.params.id, {
            name,
            phone,
            person,
            date,
            time,
            message
        });
        
        req.flash('success', 'Reservation updated successfully!');
        res.redirect('/kbt/admin/reservations');
    } catch (err) {
        req.flash('error', 'Error updating reservation');
        res.redirect(`/kbt/admin/reservations/${req.params.id}/edit`);
    }
});

// Delete reservation
router.delete('/reservations/:id', isAdmin, async (req, res) => {
    try {
        await Reserv.findByIdAndDelete(req.params.id);
        req.flash('success', 'Reservation deleted successfully!');
        res.redirect('/kbt/admin/reservations');
    } catch (err) {
        req.flash('error', 'Error deleting reservation');
        res.redirect('/kbt/admin/reservations');
    }
});

module.exports = router; 
const express = require("express");
const Registration = require("../models/Registration");

const router = express.Router();

// Register a new entry
// Register a new entry
router.post("/", async (req, res) => {
  try {
    const { sno, name, members, remark } = req.body; // Accept remark from frontend

    // Check if the serial number already exists
    const existingEntry = await Registration.findOne({ sno });
    if (existingEntry) {
      return res.status(400).json({ error: "Serial Number already exists!" });
    }

    const totalRupees = 60 * members;
    const year = new Date().getFullYear();

    const newEntry = new Registration({ sno, name, members, totalRupees, remark, year }); // Store remark
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

  

// Get all registrations grouped by year
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});
// In your router (backend)

router.put('/:id', async (req, res) => {
  try {
    const { sno, name, members, totalRupees, remark, year } = req.body; // Ensure remark is included

    // Find and update the registration
    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      { sno, name, members, totalRupees, remark, year }, // Add remark here
      { new: true } // Ensure the updated document is returned
    );
    
    if (!updatedRegistration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json(updatedRegistration); // Return the updated registration
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error updating registration", error: err.message });
  }
});


  
  // Delete registration
  router.delete('/:id', async (req, res) => {
    try {
      await Registration.findByIdAndDelete(req.params.id);
      res.json({ message: 'Registration deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;

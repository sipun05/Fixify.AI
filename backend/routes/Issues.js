const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');


// Create Issue
router.post('/', async (req, res) => {
  try {

    const issue = await Issue.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Issue created successfully',
      issue
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


// Get All Issues
router.get('/', async (req, res) => {
  try {

    const issues = await Issue.find();

    res.status(200).json({
      success: true,
      count: issues.length,
      issues
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


// Get Single Issue
router.get('/:id', async (req, res) => {
  try {

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    res.status(200).json({
      success: true,
      issue
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


// Update Issue Status
router.patch('/:id/status', async (req, res) => {
  try {

    const allowedStatuses = [
      'OPEN',
      'ASSIGNED',
      'IN_PROGRESS',
      'RESOLVED'
    ];

    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({
      success: true,
      issue
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.patch('/:id/assign', async (req, res) => {
  try {

    const { technicianId } = req.body;

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      {
        assignedTechnician: technicianId,
        status: 'ASSIGNED'
      },
      { new: true }
    );

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Technician assigned successfully',
      issue
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});


module.exports = router;
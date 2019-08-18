const express = require('express');

const Hubs = require('./hubs-model.js');

const router = express.Router();
// URI: /api/hubs

// GET /api/hubs
// File paths are assumed to be the above stated URI. Only / is neccessary in the router file path...
// router.get('/', (req, res) => {
//   Hubs.find(req.query)
//   .then(hubs => {
//     res.status(200).json(hubs);
//   })
//   .catch(error => {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: 'Error retrieving the hubs',
//     });
//   });
// });

// Try Catch
router.get('/', async (req, res) => {
  try {
    // console.log('query', req.query);
    const hubs = await Hubs.find(req.query);
    res.status(200).json(hubs);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  }
});

// This is also a GET to /api/hubs/:id
router.get('/:id', (req, res) => {
  Hubs.findById(req.params.id)
  .then(hub => {
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  });
});

router.post('/', (req, res) => {
  Hubs.add(req.body)
  .then(hub => {
    res.status(201).json(hub);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  });
});

router.delete('/:id', (req, res) => {
  Hubs.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The hub has been nuked' });
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Hubs .update(req.params.id, changes)
  .then(hub => {
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the hub',
    });
  });
});

// add an endpoint that returns all the message for a hub
// GET /api/hubs/:id/messages
router.get('/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await Hubs.findHubMessages(id);
    res.status(200).json(messages);
  } catch (error) {
    // log error to database
    res.status(500).json({
      message: 'Error finding hub messages',
    });
  }
});

// add endpoint for adding new message to a hub
router.post('/:id/messages', async (req, res) => {
  const messageInfo = {...req.body, hub_id: req.params.id };

  try {
    const savedMessage = await Hubs.addMessage(messageInfo);
    res.status(201).json(savedMessage);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error saving hub message',
    });
  }
});

module.exports = router;

router.post('/', (req, res) => {
  Hubs.add(req.body)
  .then(hub => {
    res.status(201).json(hub);
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  });
});
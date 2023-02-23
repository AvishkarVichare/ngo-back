const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const Campaign = require('../models/Campaign');

// @route   POST api/campaigns
// @desc    Create a campaign
// @access  Private
router.post('/add', async (req, res) => {
  const { name, target } = req.body;

  try {
    let campaign = new Campaign({
      name,
      target
    });

    campaign = await campaign.save();

    res.json(campaign);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.delete('/delete/:id', async (req, res) => {
    try {
      const campaign = await Campaign.findById(req.params.id);
  
      if (!campaign) {
        return res.status(404).json({ msg: 'Campaign not found' });
      }
  
      await campaign.remove();
  
      res.json({ msg: 'Campaign removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Campaign not found' });
      }
      res.status(500).send('Server Error');
    }
  });
  
  
  router.patch('/vote/:id', auth, async (req, res) => {
    try {
      let campaign = await Campaign.findById(req.params.id);
  
      if (!campaign) {
        return res.status(404).json({ msg: 'Campaign not found' });
      }
  
      const voterIndex = campaign.votes.findIndex(
        vote => vote.user.toString() === req.user.id
      );
  
      if (voterIndex !== -1) {
        return res.status(400).json({ msg: 'User has already voted' });
      }
  
      campaign.votes.push({ user: req.user.id });
  
      campaign = await campaign.save();
  
      res.json(campaign);
    } catch(err){
        res.status(500).json({
            msg: err
        });
    }    
  });
  

  
router.get('/get', async(req, res)=>{
try{
    const campaigns = await Campaign.find();

campaigns.sort((a, b) => b.votes.length - a.votes.length);

    res.status(200).json({
        campaigns
    })

}catch(err){
    res.status(500).json({
        msg: err
    });

}
})
  
  
module.exports = router;

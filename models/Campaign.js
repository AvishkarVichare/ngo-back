const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    target: {
        type: Number,
        required: true
    }
});





module.exports = Campaign = mongoose.model('campaign', CampaignSchema);

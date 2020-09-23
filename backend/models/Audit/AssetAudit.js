const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssetAuditSchema = new Schema ({

    asset_id: {
        type: String,
        required: true
    },
    asset_name: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

module.exports = AssetAudit = mongoose.model("asset_audit", AssetAuditSchema);
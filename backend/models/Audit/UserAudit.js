const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAuditSchema = new Schema ({

    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true,
    },
    superuser_id: {
        type: String,
        required: true,
    },
    superuser_name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

module.exports = UserAudit = mongoose.model("user_audit", UserAuditSchema);
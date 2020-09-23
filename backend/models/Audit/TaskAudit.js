const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskAuditSchema = new Schema ({

    task_id: {
        type: String,
        required: true
    },
    task_asset: {
        type: String,
        required: true
    },
    task_type: {
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

module.exports = TaskAudit = mongoose.model("task_audit", TaskAuditSchema);
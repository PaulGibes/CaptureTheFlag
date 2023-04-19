const { Schema, model } = require("mongoose");

const queueSchema = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    });


// Create a virtual property to count the current amount of users in the queue
queueSchema.virtual('userCount').get(function () {
    return this.users.length;
});



const Queue = model("Queue", queueSchema);

module.exports = Queue;

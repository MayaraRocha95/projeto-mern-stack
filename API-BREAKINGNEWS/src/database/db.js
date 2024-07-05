const mongoose = require('mongoose');

const connectDataBase = () => {
    console.log("wait connecting to the database");

    mongoose.connect("mongodb+srv://root:root@cluster0.0umz9nw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => console.log("MongoDB atlas Connected")).catch((error) => console.log(error));
};

module.exports = connectDataBase;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({

    _id : mongoose.Schema.Types.ObjectId,
    firstname : {
        type : String,
        required : true
    },
    lastname :{
        type : String,
        required : true
    },
    place :{
        type : String,
        required : true
    }

})

const Student = mongoose.model("Student",studentSchema);
module.exports = Student;
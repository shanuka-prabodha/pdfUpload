const router = require("express").Router();
let Student = require("../models/Student");
const mongoose = require("mongoose");



router.route("/add").post((req,res)=>{

    const firstname= req.body.firstname;
    const lastname = req.body.lastname;
    const place = req.body.place;

    const newStudent = new Student({
        _id : new mongoose.Types.ObjectId,
        firstname,
        lastname,
        place
    });
    newStudent.save().then(()=>{
        res.json("Student Added");
    }).catch((err)=>{
        console.log(err);
    });
})

router.route("/").get((req,res)=>{

    Student.find().then((student)=>{
        res.json(student)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/update/:id").put(async (req,res)=>{
    let userId = req.params.id;

    const {firstname,lastname,place} =req.body;
    const  updateStudents = {
        firstname,
        lastname,
        place
    }
    const update = await Student.findByIdAndUpdate(userId,updateStudents).then(()=>{
        res.status(200).send({status : "User updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })
})

router.route("/delete/:id").delete(async (req,res)=>{
    let userId = req.params.id;
    await Student.remove({_id:userId}).then(()=>{
        res.status(200).send({status: "User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting data",error:err.message});
    })
})

router.route("/get/:id").get(async (req,res)=>{
    let userId = req.params.id;
   const user = await Student.findById(userId).then((student)=>{
        res.status(200).send({status: "User fetched",student})
    }).catch((err)=>{
       console.log(err.message);
       res.status(500).send({status:"Error with getting user",error:err.message});
   })
})


module.exports = router;
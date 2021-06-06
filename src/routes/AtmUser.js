const router=require('express').Router();
let Atm=require('../models/Atm');
const mongoose=require('mongoose');



router.route("/adding").post((req,res)=>{

    const type= req.body.type;
    const number = Number(req.body.number);
    const year = Number(req.body.year);
    const date = Number(req.body.date);
    const cvc = Number(req.body.cvc);
    const amount = Number(req.body.amount);
    const payable = Number(req.body.payable);


    const newatm = new Atm({
        _id : new mongoose.Types.ObjectId,
        type,
        number,
        year,
        date,
        cvc,
        amount,
        payable
    });
    newatm.save().then(()=>{
        res.json("Atm Added");
    }).catch((err)=>{
        console.log(err);
    });
})

router.route("/").post(async(req,res)=>{

    const type = req.body.type;
    const number = Number(req.body.number);
    const year = Number(req.body.year);
    const date = Number(req.body.date);
    const cvc = Number(req.body.cvc);
    const payable = Number(req.body.payable);

    let query ={type:type,number:number,year:year,date:date,cvc:cvc};
    await Atm.find(query).then((atm)=>{

        try{
        if (Atm.length>0) {
            //res.json(atm)
            // res.json(payable)
            console.log(atm)
            console.log(payable)

            const user = atm[0];
            const a = new Atm();
            a._id = user._id
            a.amount = user.amount;


            console.log(a._id)
            console.log(a.amount)


            if(a.amount>=payable){

                let balance=a.amount-payable
                let query2 ={amount:balance};


                const update =  Atm.findByIdAndUpdate(a._id,query2).then(()=>{
                   // res.status(200).send({status : "User updated"})
                    res.json("payment successfully");




                }).catch((err)=>{
                    console.log(err);
                    res.status(500).send({status:"Error with updating data",error:err.message});
                })
            }else {
                res.json("balance insufficient");
            }




        }else {
            res.json("invalid inputs");
        }

        }
        catch(e){
            res.json("invalid data");
        }


    }).catch((err)=>{
        console.log(err);
    })
})




router.route("/atms").get((req,res)=>{

    Atm.find().then((atm)=>{

        res.json(atm)
        console.log(atm)

    }).catch((err)=>{
        console.log(err)
    })
})


module.exports = router;

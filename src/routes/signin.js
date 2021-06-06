const User=require('../models/User');
const UserSession=require('../models/UserSession');
const router = require("express").Router();
const bcrypt=require('bcrypt');


    router.route("/signup").post((req,res)=>{

        const {body}=req;

        const {
            firstname,
            lastname,
            password
        }=body;

        let {email}=body;
        if(!firstname){
            return res.send({
                success:false,
                message:'Error Firstname cannot be blank'
            })
        }

        if(!lastname){
            return res.send({
                success:false,
                message:'Error Firstname cannot be blank'
            })
        }

        if(!email){
            return res.send({
                success:false,
                message:'Error email cannot be blank'
            })
        }

        if(!password){
            return res.send({
                success:false,
                message:'Error password cannot be blank'
            });
        }
        console.log('here')

        email=email.toLowerCase();

        User.find({
            email:email
        },(err,previousUsers)=> {
            if (err) {
                return res.send({
                    success:false,
                    message:'Error :Server error'
                })
            } else if(previousUsers.length>0){
                return res.send({
                    success:false,
                    message:'Error :Account already exist'
                })
            }


            const newUser=new User();

            newUser.email = email;
            newUser.firstname=firstname;
            newUser.lastname=lastname;
            newUser.password = newUser.generateHash(password);

            newUser.save((err,user)=>{
                if (err) {
                    return res.send({
                        success:false,
                        message:'Error :Server error'
                    });
                }
                return res.send({
                    success:true,
                    message:'Signed up'
                });
            });

        });
    });



router.route("/signin").post((req,res)=> {

    const {body} = req;

    const {
        firstname,
        lastname,
        password
    } = body;

    let {email}=body;

    if(!email){
        return res.send({
            success:false,
            message:'Error email cannot be blank'
        })
    }

    if(!password){
        return res.send({
            success:false,
            message:'Error password cannot be blank'
        });
    }
    email=email.toLowerCase();

    User.find({
        email:email
    },(err,users)=>{
        if (err) {
            return res.send({
                success:false,
                message:'Error :Server error'
            });
        }
        if (users.length!=1) {
            return res.send({
                success:false,
                message:'Error :Invalid'
            });
        }

        const user=users[0];
           if(!user.validPassword(password)){
            return res.send({
                success:false,
                message:'Error :Invalid'
            });
        }

        const  userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err,doc)=>{
            if (err) {
                return res.send({
                    success:false,
                    message:'Error :Server error'
                });
            }

            return res.send({
                success:true,
                message:'Valid sign in',
                token:doc._id
            })
        })



    })

})

router.route("/verify").get((req,res)=> {

    const {query} = req;
    const {token} = query;

    UserSession.find({
        _id:token,
        isDeleted:false
    },(err,sessions)=>{
        if(err){

            return res.send({
                success:false,
                message:'Error: server error'
            });
        }
        if(sessions.length!=1){

            return res.send({
                success:false,
                message:'Error: Invalid'
            });
        }else{

            return res.send({
                success:true,
                message:'Good'
            });

        }


    })


})

router.route("/logout").get((req,res)=> {

    const {query} = req;
    const {token} = query;

    UserSession.findOneAndUpdate({
        _id:token,
        isDeleted:false
    },{
    $set:{
        isDeleted:true
        }
    },null,(err,sessions)=>{
        if(err){

            return res.send({
                success:false,
                message:'Error: server error'
            });
        }

            return res.send({
                success:true,
                message:'Good'
            });




    })

})

module.exports = router;
const bcrypt = require ("bcrypt")
const jwt = require("jsonwebtoken")
const config = require('../config/config')
const Logintest = require('../models/loginSystem')
const nodemailer = require('nodemailer')
const randomstring = require('randomstring')

//function to send email using smtp of google
const sendResetPasswordMail = async(name,email,token) =>{
    try{
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:5000,
            secure: false,
            requireTLS: true,
            auth:{
                user: config.emailUser,
                pass: config.emailPassword
            }
        });

        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: "For reset Password",
            html:'<p>Hi '+name +', Please copy the link and <a href="http://localhost/4000/reset-password?token='+token+'"> reset your password</a>'
        }
        transporter.sendMail(mailOptions,function(error,info){
            if(error)
            {
                console.log(error)
            }
            else{
                console.log("mail has been sent", info.response)
            }

        })
    }
    catch(error)
    {
        res.status(400).send({msg: error.message});
    }
      
}

//SignUP API - Post
const SignUp = async(req,res) =>{
    try{
        const {username,email,password} =req.body;
        const hashpassword = await bcrypt.hash(password,10) // to hash the password to a binary code of 10 characters
        const loginUser = new Logintest({username,email, password:hashpassword})
        await loginUser.save()
        res.status(201).json({message: "User created"})
    }
    catch(error)
    {
        res.status(500).json({error:error.message})
    }
}


const LoginUser =async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user =await Logintest.findOne({email}) //const user has the whole object containing email and password
        if(user && await bcrypt.compare(password,user.password))
        {
            const token = jwt.sign({userId: user.id},"thisIsAScretKeyWord",{expiresIn: "1 minute"})
            res.status(200).json({token})
        }
        else
        {
            res.status(401).json({error: "Invalid credentials"});
        }

    }
    catch(error)
    {
        res.status(500).json({error: error.message})
    }
}


const forget_password = async(req,res) =>{
    try{
        const email = req.body.email;
        const userData = await Logintest.findOne({email:email});
        if(userData)
        {
            
           const randomString =randomstring.generate();
           const data = await Logintest.updateOne({email:email},{$set:{token:randomString}});
           sendResetPasswordMail(userData.name,userData.email,randomString);
           res.status(200).json({msg: "Please Check your email inbox to reset password"})
        }
        else{
            res.status(200).json({msg: "This email does not exist"})
        }
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {SignUp,
    LoginUser,
    forget_password   
}
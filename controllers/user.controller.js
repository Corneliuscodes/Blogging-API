const models = require(`../models`);
const bcryptjs = require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);

function signUp(req, res){
    const {name, email, password} = req.body;

    models.user.findOne({where:{email:email}}).then(result=>{
        if(result){
            res.status(409).json({
                message: "Email already exist"
            })
        }else{
        //function for generating the salt
        bcryptjs.genSalt(10, function(err, salt){
        //function for hashing the password
        bcryptjs.hash(password, salt, function(err, hash){
            const user = {
                name: name,
                email: email,
                password: hash
            }
        
            models.user.create(user).then(result => {
                res.status(200).json({
                    message:"user created successfully",
                    post: result
                })
            }).catch(error=>{
                res.status(500).json({
                    message:"Something went wrong",
                    error: error
                })
            })
        })
        })
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Something went wrong",
            error: error
        })
    })

}

function login(req, res){
    models.user.findOne({where:{email:req.body.email}}).then(user=>{
        if(user === null){
            res.status(401).json({
                message:"invalid credentials",
            })
        }else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    },process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message:"Authentication successful",
                            token: token
                        })
                    })
                }
                else{
                    res.status(401).json({
                        message:"invalid credentials",
                    })
                }
            })
        }
    }).catch(error=>{
        res.status(500).json({
            message:"Something went wrong",
            error: error
        })
    })
}

module.exports = {
    signup: signUp,
    login: login
}
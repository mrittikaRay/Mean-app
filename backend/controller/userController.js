const userModel = require('../models/user.model');

exports.userRegister = async (req,res) =>{
    try{
        const {userName, userEmail , password} = req.body;

        if( !userName || !userEmail || !password) {
            res.status(404).json({message: 'username, email, and password are required'})
        }

        const existingUser = await userModel.findOne({userEmail});
        if (existingUser) {
             return res.status(400).json({ message: 'User with this userEmail already exists' });
        }

        const newUser = new userModel({ userName, userEmail, password });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }

}

exports.userLogin = async (req,res) =>{
    try{
        const {userEmail,password} = req.body;
        if(!userEmail || !password){
            res.status(404).json({message: 'email, and password are required'})
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
}

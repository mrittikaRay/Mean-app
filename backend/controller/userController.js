const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Create a new instance of MongoStore using the mongoose connection

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

exports.userLogin = async (req, res) => {
    try {
        const { userEmail, password } = req.body;

        if (!userEmail || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await userModel.findOne({ userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        req.session.user = {id : user._id,userEmail: user.userEmail};
        
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.cookie("access_token", token, { httpOnly: true });
        return res.status(200).json({ message: 'Login successful', token, data: user });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.authenticated = async (req,res) =>{
    try{
        res.status(200).json("success fully ")
    }catch(err){
        res.status(500).json({message: "not authenticated"})
    }
}

exports.userLogout = async (req,res) =>{
    try {
        res.clearCookie('connect.sid');
        
        res.clearCookie('access_token');
        req.session.destroy();

        return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}











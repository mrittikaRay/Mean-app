const isAuthenticated = (req,res) =>{
    if(req.session && req.session.user){
        return next();
    }else{
        res.status(401).send({message:'You must be logged in to access this'})
    }
}

module.exports = isAuthenticated;
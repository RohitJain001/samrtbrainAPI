
const handleSignIn = (req,res, db,passwordHash)=>{
    const { email,password } = req.body;
    if(!email || !password){
        return res.status(400).json("Can't Register");     
    }

    db.select('email','hash').from('login')
    .where('email', '=' , email)
    .then(data => {
        const isValid = passwordHash.verify(password, data[0].hash);
        console.log(isValid);
        if(isValid){
            return db.select('*').from('allusers')
                .where('email', '=',email)
                .then(user => {
                    console.log(user);
                    res.json(user[0])
                })
                .catch(() => res.status(400).json('unable to get user'))
        }else{
            res.status(400).json('wrong credentials')
        }
    })
    .catch(() => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignIn : handleSignIn
}

const handleProfileGet=(req,res,db)=>{
    const { id }=req.params;
    db.select('*').from('allusers').where({
        id:id
    })
    .then(user=>{
        if(user.length)
        {res.json(user[0])}
        else{
            res.status(400).json("user not found")}
        })
    .catch(()=>{
        res.status(400).json("user not found")
    })
}

module.exports={
    handleProfileGet : handleProfileGet
}
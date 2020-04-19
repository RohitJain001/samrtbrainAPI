
const handleRegister=(req, res, db,passwordHash) =>{
    const { name,password,email }=req.body;
  if(!name || !email || !password){
      return res.status(400).json("Can't Register");     
  }
    const hashedPassword = passwordHash.generate(password);    //hashing password
   
   db.transaction(trx =>{
       trx.insert({
           hash: hashedPassword,
           email: email
       })
       .into('login')
       .returning('email')
       .then(loginEmail =>{
           return trx('allusers')
           .returning('*')
            .insert({
               name:name,
               email:loginEmail[0],
               entries :0,
               joined : new Date()
            })
            .then (user => {res.json(user[0])})
       })
     .then(trx.commit)
     .catch(trx.rollback)
   })
    .catch(()=>res.status(400).json('unable to register'))
   }

module.exports={
    handleRegister : handleRegister
}
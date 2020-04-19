const Clarifai = require('clarifai');

const app=new Clarifai.App({
    apiKey: '55ccf750a73a40d99377b6c01770c1de'
   });

   const handleApiCall = (req,res)=>{
   app.models.predict( Clarifai.FACE_DETECT_MODEL ,req.body.input)
   .then(data => {res.json(data)
   })
     .catch(() => res.status(400).json("unable toconnect to API"))
   }

const handleImage = (req,res,db) => {
    const { id }=req.body;
    db('allusers')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        if(entries.length)
        {res.json(entries[0])}
        else{
            res.status(400).json("user not found")}        
    })
    .catch(() =>{
        res.status(400).json("user not found");
    })
}

module.exports={
    handleImage : handleImage,
    handleApiCall : handleApiCall
}
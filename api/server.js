const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./Routes/auth')
const userRoute = require('./Routes/users')
const postRoute = require('./Routes/posts')
const categoryRoute = require('./Routes/categories')
const multer = require('multer')
const path = require('path')
dotenv.config()
const app = express()


app.use(express.json())

app.use("/images",express.static(path.join(__dirname,"/images")))

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
},(err)=>{
    if(err) console.log(err)
    
    console.log('mongo connected')
})


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage})

app.post('/api/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("file uploaded successfully")
})

app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/categories',categoryRoute)

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 8080,()=> console.log('server running')) 
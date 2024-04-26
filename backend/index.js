const express= require('express');
const mongoose = require('mongoose');
const cors=require('cors')
const {jwtAuthMiddleware,generateToken} = require('./jwt');

mongoose.connect('mongodb://127.0.0.1:27017/lnt')
.then(() => console.log('Connected!'));

const schema = mongoose.Schema;
const User=new schema({
    name:String,
    email:String,
    dob:String,
    password:String,
    role:String,
    status:String
  })
  
  const UserModel = mongoose.model('users',User);
  const app=express();
  app.use(express.json())
  app.use(cors())

  app.get('/getUsers',jwtAuthMiddleware,async (req, res) => {
    const users=await UserModel.find();
    res.send(users);
  })
  app.post('/registerUser', async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new UserModel(req.body);
        newUser.status = 0;

        const savedUser = await newUser.save();
        const token = generateToken({ email: savedUser.email });
        res.status(200).json({ user: savedUser, token: token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

  app.post('/updateUser',async (req,res)=>{
    
    const user= await UserModel.findOne(req.body)
    if(user!=null){
      var ans=new UserModel(req.body)
      ans.status=0;
      ans.save()
      res.status(200).send("logout successfull");
    }
    else{
      res.send("user not exist");
    }
      
    })

  app.post('/loginUser', async (req, res) => {
    console.log(req.body)
    const email= req.body.email;
    const password= req.body.password;
    console.log('Input : '+email,password);
    try {
      const user = await UserModel.findOne(req.body);
      console.log('database output'+user);
      if(user!=null && user.email === email && user.password === password){
        user.status=1
        user.save();
        const payload={
          email:user.email
        }
        const token=generateToken(payload);
        return res.json({token});
      }
     else{
      return res.status(403).send("Invalid username or password");
     }
        
    } catch (error) {
      console.error("Error logging in user:", error);
      return res.status(500).send("Error logging in user");
    }
  });

  app.listen(4010,()=>{
    console.log('Server is running')
  })








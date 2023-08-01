const express = require("express");
const cors = require('cors');
const userServices = require("./services/userServices");
const questionServices = require("./services/questionServices");
const { sequelize } = require('./models/models');
const userDAO = require('./dao/userDao');
const verifyToken = require('./middlewares/user');
const verifyAdmin = require('./middlewares/admin');
const mongoose = require('mongoose');
const adminServices = require('./services/adminServices');
const cookie = require('cookie-parser');
const verifyUser = require('./middlewares/common');

const app = express();
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the local MongoDB database');
    
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


app.use(express.json());


const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors({
    origin:["*"],
    credentials:true,
    methods:['POST','PUT','DELETE','PATCH']
    }
));


app.use(cookie());


app.get('/', verifyUser, (req, res) => {
    try{
        return res.json({message:"hello"});
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
    
});

app.get('/auth/v1/login', (req, res) => {
    try{
        return res.json({"msg":"auth"});
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
});

app.get('/auth/v1/signup', (req, res) => {
    try{
        return res.json({"msg":"auth"});
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
});

app.post('/auth/v1/auth-verify', verifyUser, (req,res) =>{

    return res.json(req.user);
})

app.post('/auth/v1/logout', (req,res) =>{
    res.cookie("x-access-token","",{maxAge:-1});
    res.cookie("access-token","",{maxAge:-1});
    return res.json({"message":"user signed out"});
})

app.post('/problemset/v1/admin/addquestion',verifyAdmin, async (req,res) => {
    let accessToken = req.cookies["x-access-token"];
    const questionDescription = req.body;
    const newprob = await adminServices.createProblem(questionDescription,res);
    console.log(newprob);

    return res.status(200).json(newprob);
    
})

app.put('/problemset/v1/edit/:id', verifyAdmin, (req,res) => {
    const questionId = req.params.id;
    const newData = req.body;
    
    const result = adminServices.updateProblem(newData,questionId);
    
    return res.status(200).json(result);
})

app.delete('/problemset/v1/edit/:id', verifyAdmin, (req,res) => {
    const questionId = req.params.id;
    const del = adminServices.deleteProblem(questionId);
    
    return res.status(200).json(del);
})

app.put('/problemset/v1/edit/testcase/:id', verifyAdmin, (req,res) => {
    const questionId = req.params.id;
    const newData = req.body;
    
    console.log(questionId);
    
    const addTc = adminServices.addTestCase(newData,questionId);
    return res.status(200).json(addTc);
    
})

app.post('/auth/v1/login', async (req, res) => {
    try{
        const {result,errors} = await userDAO.checkUserEmail(req.body) 
        if(errors){
            // console.log(errors);
            return res.status(400).json({"errors": errors});
        }
        
        const user = await userServices.userLogin(result,"user");
        
        if(!user){
            res.json({"message":"profile not found"});
        }
        else{
            const token = userServices.createToken(user,"user");
            const token2 = userServices.createToken(user,"common");
            res.cookie("x-access-token",token);
            res.cookie("access-token",token2);
            return res.status(200).json({
                email:user.email,
                accessToken: token,
            });
        }
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
});

app.post('/auth/v1/admin/login', async (req, res) => {
    try{
        const {result,errors} = await userDAO.checkUserEmail(req.body) 
        if(errors){
            res.status(400).json({"errors": errors});
        }
        
        const user = await userServices.userLogin(result,"admin");
        
        if(!user){
            res.status(404).json({"message":"profile not found"});
        }
        else{
            const token = userServices.createToken(user,"admin");
            const token2 = userServices.createToken(user,"common");
            res.cookie("x-access-token",token);
            res.cookie("access-token",token2);
            res.status(200).json({
                email:user.email,
                accessToken: token,
            });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});

app.post('/auth/v1/signup', async (req, res) => {
    try{
        const user = await userServices.createUser(req.body);
        const token = userServices.createToken(user,"user");
        const token2 = userServices.createToken(user,"common");
        
        res.cookie("x-access-token",token);
        res.cookie("access-token",token2);
        return res.status(200).json({
            
            email: user.email,
            access_token: token
        });
    }
    catch(err){
        return res.status(500).send("Internal Server Error");
    }
});


app.get('/v1/problems',async (req, res) => {
    let allQ = await questionServices.getQuestions();
    // console.log(allQ);
    return res.status(200).json(allQ);
});

app.get('/v1/problems/:id', async (req, res) => {
    let q_id = req.params.id;
    let que = await questionServices.getQuestionById(q_id);

    return res.status(200).json(que);
});


app.post('/v1/problems/runcode', verifyToken, async (req, res) => {
    const newData = req.body;

    let subid = await userServices.submitCode(newData);
    // console.log(subid);
    let submissionRes = await userServices.retrieveSubmission(subid.id);
    // console.log(submissionRes);
    return res.status(200).json(submissionRes);
});

app.listen(4000, () => {
    console.log('Server is running');
});


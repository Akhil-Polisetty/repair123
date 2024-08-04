import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
import RuserModel from "./model/RuserModel.js";
import Cookies from "js-cookie";
import RepairModel from "./model/RepairModel.js";
// import ResponseModel from "./model/ResponsesModel.js";
import ResponsesModel from "./model/ResponsesModel.js";
import ActiveRepairModel from "./model/ActiveRepairModel.js";
import dotenv from 'dotenv';


let email_glob;

dotenv.config()
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser())
// const connectToDb = async () => {
//   try {
//     if (!isConnected) {
//       await mongoose.connect("mongodb://localhost:27017/test");
//       console.log("connection established");
//       db = mongoose.connection.db;
//       users = db.collection("Dummy");
//       isConnected = true;
//     }

//     if (db) {
//       console.log("DB present");
//     } else {
//       console.log("DB is absent");
//     }
//     return;
//   } catch (error) {
//     console.log("Connection not established due to ", error);
//   }
// };


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.post("/register", async (req, res) => {
  try {
    console.log("entered register page")
    const { name, email, password ,techie} = req.body;
    console.log("the tech1 is ",techie)
    const existingUser = await RuserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }
    console.log("no error up to server 58")
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = {
      u_name:name,
      email_id:email,
      passkey: hashedpassword,
      tech_stat:techie
    };
    // console.log("the techie2 is ",tech_stat)
    console.log("new user is ",newUser)
    await RuserModel.create(newUser);
    console.log("after succesfully inserting")
    res.status(200).json({ message: "Registration Completed" });
  } catch (error) {
    console.log("Error Occurred at server 69: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.post("/update_prof", async (req, res) => {
  try {
    console.log("entered register page")
    const { name, email, phone,city,domain } = req.body;
    const existingUser = await RuserModel.findOne({ email });

    console.log("no error up to server 58")

    RuserModel.findOneAndUpdate({email_id:email},{$set:{u_name:name,phn_no:phone,city:city ,domain:domain}},{new:true})
    .then(updatedDoc=>{
      console.log(updatedDoc)
    })
    .catch(error =>{
      console.log("error at server 98");
    });
    console.log("after succesfully inserting")
    res.status(200).json({ message: "Registration Completed" });
  } catch (error) {
    console.log("Error Occurred at server 69: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post('/raising',async (req,res) => {
  try{
    console.log("entered raising in server raising")
    const {remail,rname,rappliance,rmodel,rdesc,rlocation,raddress}=req.body;
    // console.log("the email is ",remail)
    // const existingUser = await RepairModel.findOne({rname:rname})
    // if(existingUser)
    // {
    //   console.log("repair already existed")
    // }
    const newRepair ={
      remail_id:remail,
      rname:rname,
      rappliance:rappliance,
      rmodel:rmodel,
      rdesc:rdesc,
      rlocation:rlocation,
      raddress:raddress
    }
    console.log("the new record is ",newRepair)
    await RepairModel.create(newRepair);
    console.log("after succesfully inserting here after 133")
    res.status(200).json({message:"repair added succesfully"});
  }
  catch(err)
  {
    console.log("error occured at server 132 ",err)
  }
});



app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email is ",email)
    console.log("pass is ",password)
    if (!email || !password) {
      return res.status(201).json({ message: "Email and password are required" });
    }

    const existingUser = await RuserModel.findOne({ email_id:email });
    console.log("the user is ",existingUser)
    if (!existingUser) {
      return res.status(201).json({ message: "User not found" });
    }

      const passwordMatch = await bcrypt.compare(password, existingUser.passkey);
    if (!passwordMatch) {
      console.log("Hello")
      return res.status(201).json({ message: "Invalid Password" });
    }
    email_glob=email;
    console.log("emial at signin is ",email_glob)
    Cookies.set('email',email)
    const token = jwt.sign({ id: existingUser.name }, "hellosuck", { expiresIn: '1h' });
      const expirationDate = new Date(Date.now() + 3600000);
      res.cookie("token", token, { expires:expirationDate, httpOnly: true });
      console.log("Token stored:", token); // Log the token for debugging
      // res.status(200).json({ message: "Login Successful" });
      return res.status(200).json({message:"token created",token});
  }
   catch (error) {
    console.log("Error Occurred at dummyserv 102: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/getUsering', (req, res) => {

    RuserModel.findOne({ email_id:email_glob})
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});


app.post('/getprofile', (req, res) => {
  // const email_cookie = Cookies.get("email");
  // if (!email_cookie) {
  //   console.log("cookie not found");
  //   return res.status(400).json("Email cookie not found");
  // }
    // const email_cookie = Cookies.get('email')
    // console.log("the cookie is ",email_cookie)
    // console.log("email at getusering is ",email_glob)
    const {email_id}=req.body;
    console.log("entered server usering")
    console.log("email is ",email_id);

    RuserModel.findOne({ email_id:email_id})
    .then(usering => {
      if (usering) {
        console.log(usering)
        res.json(usering);
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});


// app.delete('/deleteresponse',(req,res) => {
//   console.log("entered the server of delete response")
//   const to=req.query.user_id;
//   console.log("the email is ",to)
//   ResponsesModel.deleteMany({to:to})
//   .then(res.status(200).json("succesfully deleted"))
//   .catch(err => res.status(500).json({ error: err.message }));
// })


app.get('/getactiverepairs', (req, res) => {

    RepairModel.findOne({ remail_id:email_glob})
    .then(activerepair => {
      if (activerepair) {
        res.json(activerepair);
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});


app.get('/repair', (req, res) => {
  // const email_cookie = Cookies.get("email");
  // if (!email_cookie) {
  //   console.log("cookie not found");
  //   return res.status(400).json("Email cookie not found");
  // }
    // const email_cookie = Cookies.get('email')
    // console.log("the cookie is ",email_cookie)
    // console.log("email at getusering is ",email_glob)
    RuserModel.findOne({ email_id:email_glob})
    .then(user => {
      if (user) {
        RepairModel.find({rlocation:user.city,rappliance:user.domain})
    // console.log("completed upto 212 server")
    .then(repairs => {
      console.log("data found and the data ")
      if (repairs) {
        console.log("repairs are there ",repairs)
        res.json(repairs);
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
      } else {
        // res.status(404).json("User not found");
        console.log("error")
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
    // console.log("entered server ",user)
    
});

app.get('/getresponse',(req,res)=>{
  ResponsesModel.find({to:email_glob})
  .then(responses => {
    if(responses){
      console.log("responses are ",responses)
      res.json(responses);
    }
    else
    {
      res.status(404).json("responses not found");
    }
  })
  .catch(err => res.status(500).json({error:err.message}));
});

app.get('/getactiverep',(req,res)=>{
  ActiveRepairModel.find({
    $or: [
      { user: email_glob },
      { technician: email_glob }
    ]
  }).then(actives => {
    if(actives){
      console.log("responses are ",actives)
      res.json(actives);
    }
    else
    {
      res.status(404).json("responses not found");
    }
  })
  .catch(err => res.status(500).json({error:err.message}));
});




app.post('/response',async(req,res) => {
  try{
    console.log("entered response in server responses")
    const {to,from,desc,cost} = req.body
    console.log("the from is ",from)
    console.log("the emailm is ",to)
    console.log("the description is ",desc)
    console.log("the cost is ",cost)
    const newResponse = {
      from:from,
      to:to,
      response_desc:desc,
      res_cost:cost
    }
    await ResponsesModel.create(newResponse)
    console.log("succesfuly inserted")
    res.status(200).json({message:"response added succesfully"});
  }
  catch(err)
  {
    console.log("error at 264 ",err)
  }
})


app.post('/postactive',async(req,res) => {
  try{
    console.log("entered response in server post active")
    const {user,technician,rsol,rcost,rlocation,rmodel,raddress,rappliance,rdesc} = req.body
    console.log("the from is ",user)
    console.log("the emailm is ",technician)
    console.log("the description is ",rsol)
    console.log("the cost is ",rcost)
    const newResponse = {
      user:user,
      technician:technician,
      rsolution:rsol,
      rcost:rcost,
      rlocation:rlocation,
      rmodel:rmodel,
      raddress:raddress,
      rappliance:rappliance,
      rdesc:rdesc
    }
    console.log("the new active repair is ",newResponse)
    await ActiveRepairModel.create(newResponse)
    console.log("succesfuly inserted")
    res.status(200).json({message:"response added succesfully"});
  }
  catch(err)
  {
    console.log("error at 264 ",err)
  }
})


const verifyUser = async (req,res,next)=>
{
  try
  {
    const token = req.cookies.token;
    if(!token)
    {
      return res.json({status:false,message:"no token"})
    }
    const decoded=jwt.verify(token,"hellosuck");
    next();
  }
  catch(e)
  {
    return res.json(e);
  }
}

app.get('/auth/verify',verifyUser,(req,res)=>
{
  return res.json({status:true,message:"authorized"});
})

app.get('/auth/logout',(req,res)=>
{
  res.clearCookie('token')
  res.clearCookie('email')
  return res.json({status:true})
})

app.listen(7000, () => {
  console.log("Server running on 7000");
});

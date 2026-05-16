import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt  from 'bcrypt'
import UserModel from "./Models/UserModel.js";
import FeedbackModel from "./Models/FeedbackModel.js";
import ResultModel from "./Models/ResultModel.js";


import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json()) 
const constr="mongodb+srv://admin:csse3101@cluster0.k0ycojy.mongodb.net/project"
mongoose.connect(constr)

// ================== Register ==================
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashPwd = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashPwd
    });

    await user.save();

    res.status(201).send({
      user,
      msg: "Registered successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Registration failed" });
  }
});


// ================== Login ==================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).send({ msg: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ msg: "Password is incorrect" });

    res.status(200).send({ user, msg: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Login failed" });
  }
});
// ================== Feedback ==================
const handleSubmit = async () => {
  if (!message) {
    alert("Please write your feedback");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        email: "test@email.com" // لاحقًا تجيبها من المستخدم
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.msg);
      setMessage("");
    } else {
      alert(data.msg);
    }

  } catch (error) {
    console.error(error);
    alert("Error sending feedback");
  }
};

app.post("/feedback", async (req, res) => {
  try {
    const { message, email } = req.body;

    if (!message) {
      return res.status(400).send({ msg: "Message is required" });
    }

    const feedback = new FeedbackModel({
      message,
      email
    });

    await feedback.save();

    res.status(201).send({ msg: "Feedback saved successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error saving feedback" });
  }
});

app.get("/feedback", async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 });
    res.status(200).send(feedbacks);
  } catch (error) {
    res.status(500).send({ msg: "Error fetching feedback" });
  }
});
//=============logout=================
 const handleLogout = () => {
  if (window.confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("user");
    setPage("welcome");
  }
};

//============result data===================
app.post("/result", async (req, res) => {
  try {
    const { name, email, bestField, percentages } = req.body;

    const result = await ResultModel.findOneAndUpdate(
      { email }, // 👈 نفس الحساب
      {
        name,
        email,
        bestField,
        percentages
      },
      {
        new: true,
        upsert: true // 👈 إذا ما موجود ينشئه، إذا موجود يحدثه
      }
    );

    res.send({ msg: "Result saved/updated successfully", result });

  } catch (err) {
    res.status(500).send({ msg: "Error saving result" });
  }
});


app.get("/result/:email", async (req, res) => {

  const result = await ResultModel
    .findOne({ email: req.params.email })
    .sort({ createdAt: -1 });

  res.send(result);
});

app.get("/all-results", async (req, res) => {

  try {

    const results = await ResultModel.find();

    res.send(results);

  } catch (err) {

    res.status(500).send({
      msg: "Error fetching results"
    });

  }

});

app.put("/jobs", async (req, res) => {
  try {
    const { email, data } = req.body;

    const updated = await JobsModel.findOneAndUpdate(
      { email },
      { jobs: data },
      { new: true, upsert: true } // ⭐ أهم جزء
    );

    res.send({ msg: "Jobs saved successfully", updated });
  } catch (err) {
    res.status(500).send({ msg: "Error saving jobs" });
  }
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

const { data } = require("@remix-run/router");
const express = require("express");//1
const PORT = 2020//2
const mongoose = require("mongoose") //9

const app = express();//3
//Middleware
app.use(express.json())//5

//Default Get
app.get("/", (req, res)=>{//6
    res.status(200).json({
        message: "Server is up and running" //confirm in postman
    })
})
//Connect to my Database  //8--use try and catch
try{
    const DB_URI = "mongodb+srv://groupOfSchools:pD3ayfwD5bHuxE9x@cluster0.v75he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    mongoose.connect(DB_URI)
    console.log("Connected to database")

}catch(error){
    console.log("failed to connect to Database" + error)
}
//create schema
const studentSchema = new mongoose.Schema({ //10
    name:{
        type: String,
        require: true
    },
    adminNo:{
        type: String,
        unique: true
    },
    gender:{
        type: String,
    },
    isFee:{
        type: Boolean,
    }
    
})

//Controller--11
const getAllStudents = async(req, res) =>{
    try {
        const getStudents =studentModel.find()
        return req.status(200).json({
            message: "Students data received successfully",
            data: getStudents
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error getting students",
            data: error.message
        }) 
            
    }
}


const studentModel = new mongoose.model("students", studentSchema)

app.listen(PORT, ()=>{
    console.log(`Server on PORT ${PORT}`)//4
})
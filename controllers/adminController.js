var adminHelper = require("../helpers/adminHelper");
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import { v4 as uuid } from "uuid";
// var PutObjectCommand = require("@aws-sdk/client-s3");
// var S3Client = require("@aws-sdk/client-s3");
// var v4 = require("uuid").v4;

const s3Model = require('../models/s3Model');


const adminCredential = {
  name: "MENTOONS ADMIN PANEL",
  email: "admin@gmail.com",
  password: "mentoons123",
};

module.exports = {
  postLogin: async (req, res) => {
    try {
      console.log("Received login request:", req.body);

      if (
        req.body.email == adminCredential.email &&
        req.body.password == adminCredential.password
      ) {
        res.status(200).json({ message: "success" });
      } else {
        res.status(401).json({ message: "invalid password/email" });
      }

      //   if (isValidCredentials) {
      //     res.status(200).json({ message: "Login successful" });
      //   } else {
      //     res.status(401).json({ message: "Invalid credentials" });
      //   }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  postCategory: async (req, res) => {
    console.log("welcome to add category!!");
    try {
      const categoryy = req.body;
      adminHelper.addCategory(categoryy).then(() => {
        res.status(200).json({ message: "successfully added" });
      });
      // if already exist ----------->>
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },
  postAgeCategory: async (req, res) => {
    console.log("welcome to add category!!");
    try {
      console.log(req.body, "this is the bodyyyyyyy");
      adminHelper.addAgeCategory(req.body).then(() => {
        res.status(200).json({ message: "successfully added" });
      });
      // if already exist ----------->>
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  postProduct: async (req, res) => {
    
      try {
        
        console.log(req.body, "bodyy data comingg");
        console.log(req.files, "files data comingg");
        const result = await s3Model.uploadFile(req.files);
        if(result){
          await adminHelper.addProduct(req.body,result).then((response)=>{
            
            res.status(200).json({message:"successfully added to database"})
          })
        }else{
          res.status(401).json({message:'something went wrong,please try again'})
        }
        
        

        // res.json({ success: true, message: 'File uploaded successfully', data: result });
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
  },
  addOpening: async (req, res) => {
    try {
      console.log(req.body, "formdaaaaaaaaa");
      console.log(req.file.originalname, "......image");
      const response = await adminHelper.postJob(
        req.body,
        req.file.originalname
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal error occured!" });
    }
  },
};


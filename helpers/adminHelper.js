const mongoose = require('mongoose');
var category = require("../models/categorySchema")
var agecategory = require("../models/agecategoryScheme")
var product = require("../models/productSchema")
module.exports = {
    addCategory:async (cate)=>{
        console.log(cate,"11111111");
        try {
            const res = await category.create(cate)
            return res
        } catch (error) {
            res.json({message:error})
        }

    },
    addAgeCategory:async (age)=>{
        console.log(age,"2222");
        try {
            const res = await agecategory.create(age)
            return res
        } catch (error) {
            res.json({message:error})
        }

    },
    addProduct: async (details, fileDatas) => {
      try {
        console.log("hheheeeeeeeeeeee");
      var thumbLink = fileDatas.thumbnail.Location
      var sourceLink =fileDatas.source.Location
        return new Promise((resolve, reject) => {
          // Use 'new product' instead of 'result = new product.create'
          const newProduct = new product({
            productName: details.productName,
            productDescription: details.productDescription,
            productCategory: details.productCategory,
            ageCategory: details.ageCategory,
            price: details.price,
            free: details.free,
            thumbnail: thumbLink, // Assuming 'Image' was a typo, and it should be 'image'
            source:sourceLink
          });
      
          newProduct.save().then((data) => {
            resolve(data);
          }).catch((error) => {
            reject(error);
          });
        });
      } catch (error) {
        console.log(error);
        return ({error:true,error})
      }
      },
      postJob:async(jobData,image)=>{
        try {
          console.log(jobData,image,"------------------------");
          console.log("cumma.......");
        } catch (error) {
          console.log(error);
          retrun ({error:true})
        }
      }
      
    
}
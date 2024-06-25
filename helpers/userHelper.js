var User = require("../models/userSchema");
var Product = require("../models/productSchema.js");
var Category = require("../models/categorySchema.js");
var Cart = require("../models/cartSchema.js");
var Messages = require("../models/userMessageSchema")
var Workshop = require("../models/workshopEnquirySchema.js")

var bcrypt = require("bcrypt");
var dotenv = require("dotenv");
dotenv.config();
var jwt = require("jsonwebtoken");
var jwt_token = process.env.JWT_SECRET;
const { ObjectId } = require('mongodb');
module.exports = {
  userSignup: async (userDetails) => {
    try {
      const emailExist = await User.findOne({ email: userDetails.email });
      const phoneExist = await User.findOne({
        phoneNumber: userDetails.phoneNumber,
      });
      if (emailExist || phoneExist) {
        return { Exist: true };
      }
      const Password = await bcrypt.hash(userDetails.password, 10);
      const user = new User({
        username: userDetails.username,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        age: userDetails.age,
        password: Password,
      });
      const usercreated = await user.save();
      return { existinguser: false, password: true, usercreated };
    } catch (error) {
      console.log(error);
      throw new Error("something went wrong.please try again later");
    }
  },
  forlogin: async (userData) => {
    try {
      console.log(userData, "inside helperfunctionnn");
      var userExist = await User.findOne({ email: userData.email });
      if (!userExist) {
        return { login: false };
      } else {
        let checkPassword = await bcrypt.compare(
          userData.password,
          userExist.password
        );
        if (checkPassword) {
          return { login: true, userExist };
        } else {
          return { login: false };
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  },
  createToken: async (userId, userName) => {
    if (jwt_token) {
      console.log(jwt_token, "this is secretkey...........");

      const token = jwt.sign(
        { userId, userName }, // Wrap the payload in an object
        jwt_token,
        { expiresIn: "1h" }
      );

      return token;
    } else {
      throw new Error("JWT TOKEN IS NOT DEFINED!! ");
    }
  },
  getAllProducts: async () => {
    try {
      const products = await Product.find({});
      return { success: true, products };
    } catch (error) {
      return { success: false };
    }
  },
  getOneProduct: async (prodId) => {
    try {
    // var { prodId } = productId;
    console.log(prodId,"lenthssssssssssss");
      const result = await Product.findOne({ _id: prodId });
      console.log(result, "result");
  
      if (result) {
        return { success: true, result };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  },
  getCatProd:async(cateId)=>{
    try {
      const catExist = await Category.find({_id:cateId})
      if(catExist){
        const datas = await Category.aggregate([
          {
            '$match': {
              '_id': new ObjectId('65a674cde94e91995d2901af')
            }
          }, {
            '$lookup': {
              'from': 'products', 
              'localField': 'CategoryName', 
              'foreignField': 'productCategory', 
              'as': 'result'
            }
          }, {
            '$unwind': {
              'path': '$result', 
              'includeArrayIndex': 'string'
            }
          }, {
            '$project': {
              '_id': 0, 
              'CategoryName': 0
            }
          }
        ])
        console.log(datas,"this is datass...........");
        return ({success:true,datas})
      }else{
        return ({success:false})
      }
    } catch (error) {
      return ({error:true})
    }
  },
  allCategory: async () => {
    try {
      const allCategory = await Category.find();
      if (allCategory.length > 0) {
        return { success: true, allCategory };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  },
  getOneCategory: async (cateId) => {
    try {
      console.log(cateId, "ooooooooo");
      const categoryData = await Category.find({ _id: cateId });
      if (categoryData) {
        return { success: true, categoryData };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  },
  addToCart: async (cartData) => {
    try {
       

      console.log(cartData, "iiii");
      const cartExist = await Cart.findOne({ userId: cartData.userId });
      if (!cartExist) {
        const newCart = new Cart({
          userId: cartData.userId,
          products: [
            {
            productId: new ObjectId(cartData.productId),
              // Add other product details if needed
            },
          ],
        });

        await newCart.save();
        return { success: true, message: "item added to the cart!!" };
      } else {
        //checking if product alredy in the cart!
        const prodExist = await cartExist.products.find(
          (product) => product.productId === cartData.productId
        );
        if (prodExist) {
          return { success: false, message: "Item already in cart" };
        } else {
          // If product doesn't exist, add it to the products array
            cartExist.products.push({
            productId: new ObjectId(cartData.productId),
            // Add other product details if needed
          });

          // Save the updated cart
          await cartExist.save();
          return { success: true, message: "item added to your cart" };
        }
      }
    } catch (err) {
        console.log(err);
      return { error: true, message: "internal error occured!!" };
    }
  },
  removeFromCart:async(cartData)=>{
    try {
        const cartExist = await Cart.findOne({ userId: cartData.userId });
        if(!cartExist){
            return ({success:false,message:"cart not found!!"})
        }
        cartExist.products = cartExist.products.filter(product => product.productId.toString() !== cartData.productId);
        await cartExist.save();

        return ({success:true,message:"product removed from your cart!!"})
    } catch (error) {
        console.log(error);
        retrun ({error:true, message:"something went wrong!!"})
    }
  },
  getCart:async(userId)=>{
    try {
        const cartExist = await Cart.findOne({userId:userId})
        if(!cartExist){
            return ({success:false,message:"nothing in your cart!!"})
        }else{
            const result = await Cart.aggregate([
                {
                    $match: {
                        'userId': userId
                    }
                },
                {
                    $unwind: {
                        path: '$products'
                    }
                },
                {
                    $project: {
                        product: '$products.productId',
                        _id: 0
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product',
                        foreignField: '_id',
                        as: 'result'
                    }
                },
                {
                    $unwind: {
                        path: '$result'
                    }
                },
                {
                    $project: {
                        product: 0
                    }
                }
            ]);
    
            const formattedCart = result.map(item => ({ result: item.result }));

            return { success: true, cart: formattedCart };
        }
    } catch (error) {
        console.log(error);
        return ({error:true,message:"something went wrong!!"})
        // res.status(500).json({message:"internal error occured!!"})
    }
  },
  storeMsg: async (writeUsData) => {
    try {
       
        const saveData = await Messages.create(writeUsData);
        if(saveData){
          return ({success:true,saveData})
        }else{
          return ({success:false})
        }

        // If you need to send the saved data back in the response, you can do so
        // res.status(200).json({ success: true, data: saveData });
    } catch (error) {
        console.error(error);
        console.log(error);
        return ({error:true})
        // res.status(500).json({ success: false, message: "Internal error occurred!!" });
    }
  },
  workshopForm:async(formData)=>{
    try {
      const result = await Workshop.create(formData)
      if(result){
        return ({success:true,result})
      }else{
        return ({success:false})
      }
    } catch (error) {
      console.log(error);
      return ({error:true})
    }
  },
  // findUser :(mobile) =>{
  //   try {
      
  //     return new Promise((resolve, reject) =>{
  //         User.findOne({phoneNumber : mobile}).then((user) =>{
  //             if(user){
  //                 resolve(user)
  //             }else{
  //                 resolve(null);
  //             }
  //         })
  //     })
  //   } catch (error) {
  //     console.log(error);
  //     reject(error)
  //   }
  // },

};

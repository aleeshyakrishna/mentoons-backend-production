var userHelper = require('../helpers/userHelper')
// const twilioApi = require("../api/twilioApi");



module.exports= {
    getHome : (req,res) =>{
        try {
            
            console.log("welcome home");
            res.status(200).json({message:"success"})
        } catch (error) {
            console.log();
        }
        
    },
    signup:async(req,res)=>{
        try {
            console.log(req.body,"user dataaaa");
            await userHelper.userSignup(req.body).then((data)=>{
                if (data.Exist) {
                    res.json({message:' already registered!!'});
                }else if (data.usercreated) {
                    const UserData=data.usercreated
                    console.log(UserData,'registered');
                    res.json({status:true,message:"User registerd",UserData})
                } else {
                    res.json({status:false,UserData})
                }
            }).catch((error)=>{
                res.json(400).json({message:"something went wrong!!"})
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal server error!!"})
        }
    },
    userLogin:async(req,res)=>{
        try {
            console.log(req.body,"this is login form data..");
            const response = await userHelper.forlogin(req.body);
            console.log(response,"this is response....");
            if (response.login && response.userExist) {
                const userData=response.userExist
                const userId = response.userExist._id;
                const username = response.userExist.username;

                const Token = await userHelper.createToken(userId.toString(), username);
                console.log(Token);
                res.json({message:"user successfully logedIn",status:true,userData,Token});
            } else {
                res.json({status:false,message:"user not registered!"})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal server error!!"})
        }
    },
    getProduct:async(req,res)=>{
        try {
            console.log("get products..");
            const result = await userHelper.getAllProducts()
            if( result.products.length > 0){
                var prod= result.products;
                res.status(200).json({message:"get all products",prod})
            }else{
                res.json({message:"NO AVAILABLE PRODUCTS NOW!"})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal server error!!"})
        }
    },
    getOneProd:async(req,res)=>{
        try {
           const id = req.params.id;
            console.log("productId.......",id);
        
    
             await userHelper.getOneProduct(id) // Remove the colon
            .then((data)=>{
                if(data.error){
                    res.json({message:"something went wrong!"})
                }else{
                    if(data.success){
                        res.json({data,message:"success!!"})
                    }else{
                        res.json({message:"product not available"})
                    }
                }
             })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal error!!"})
        }

    },
    getCatProd:async(req,res)=>{
        try {
            const result = await userHelper.getCatProd(req.params.id)
            if(result.error){
                res.json({message:"something went wrong!!"})
            }else{
                if(result.success){
                    const data = result.datas
                    res.status(200).json({message:"success",data})
                }else{
                    res.json({message:"not products available now"})
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal error occured!!"})
        }
    },
    getAllCategory:async(req,res)=>{
        try {
            
            await userHelper.allCategory().then((data)=>{
                if(data.error){
                    res.json({message:"something went wrong!!"})
                }else{
                    if(data.success){
                        var cate = data.allCategory
                        res.json({message:"success",cate})
                    }else{
                        res.json({message:"no categories available..sorry for the inconvenience!!"})
                    }
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal server error!!"})
        }
    },
    getOneCategory:async(req,res)=>{
        try {
            await userHelper.getOneCategory(req.params.id).then((data)=>{
                if(data.error){
                    res.json({message:"something went wrong!!"})

                }else{
                    if(data.success){
                        var cate = data.categoryData
                        res.json({message:"success",cate})
                    }else{
                        res.json({message:"no category availbale !!"})
                    }
                }
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal server error!!"})
        }
    },
    addToCart : async (req,res)=>{
        try {
            const response = await userHelper.addToCart(req.body)
            if(response.error){
                const msg = response.message
                res.status(500).json({msg})
            }
            if(!response.success){
                const msg = response.message
                res.status(401).json({msg})
            }else{
                const msg = response.message
                res.status(200).json({msg})
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({message:" internal error occured! "})
        }
    },
    RemoveCart:async(req,res)=>{
        try {
            console.log(req.body,"ooooooooooooo");
            const response = await userHelper.removeFromCart(req.body)
            if(response.error){
                const msg= response.message
                res.status(401).json({msg})
            }
            if(!response.success){
                const msg= response.message
                res.status(401).json({msg})
            }else{
                const msg= response.message
                res.status(200).json({msg})
            }
        } catch (error) {
            console.log(error);
            res.json({message:"internal error occured!!"})
        }
    },
    getCart:async(req,res)=>{
        try {          
            const response = await userHelper.getCart(req.params.userId)
            if(response.error){
                const msg = response.message
                res.status(500).json({msg})
            }
            if(response.success){
                const cart = response.cart
                res.status(200).json({cart})
            }else{
                const msg= response.message;
                res.status(401).json({msg})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal error occured!!"})
        }
    },
    writeUs:async(req,res)=>{
        try {
            console.log(req.body,"------>");
            const response = await userHelper.storeMsg(req.body)
            if(response.error){
                res.status(401).json({message:"something went wrong"})
            }else{
                if(response.success){
                    const data = response.saveData
                    res.status(200).json({data})

                }else{
                    res.status(401).json({message:"something went wrong!!"})
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal error occured!!"})
        }
    },
    hireMe:async(req,res)=>{
        try {
            console.log(req.body,">>>>>>>>>>>>>");
            
        } catch (error) {
            res.status(500).json({message:"internal error occured!!"})
        }
    },
    workShop:async(req,res)=>{
        try {
            console.log(req.body,"interested!!");
            const response = await userHelper.workshopForm(req.body)
            if(response.error){
                res.status(401).json({message:"something went wrong"})
            }else{
                if(response.success){
                    const data = response.result
                    res.status(200).json({data})

                }else{
                    res.status(401).json({message:"something went wrong!!"})
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"internal error occured!!"})
        }
    },
    // sendOtp: (req, res) => {
    //     try {
            
    //         console.log(req.body,"phone numberrrrrrrrrrr");
    //         userHelper.findUser(req.body.phoneNumber).then((user) => {
    //           if (user) {
                
    //             twilioApi.sendOtp(req.body.phoneNumber).then((result) => {
    //               res.json({ status: true ,message:"otp send to your number"});
    //             });
    //           } else {
         
    //             res.json({ status: false,message:"user not registered" });
    //           }
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({message:"internal error occured!!"})
    //     }
    //   },

}
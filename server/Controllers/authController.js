const bcrypt = require('bcrypt');
const axios = require('axios')

// module.exports.login = async (req,res, next)=>{
//     try{
//         const {username, password } = req.body;
//         const user =await Users.findOne({username});
//         if(!user)
//         return res.json({msg: "Invalid username or password", status:false});
//         const isPasswordValid =await bcrypt.compare(password, user.password)
//         if(!isPasswordValid)
//         return res.json({msg: "Invalid password", status:false});
//         delete user.password
//         return res.json({status:true,user})
//     }catch(err){
//         next(err)
//     }
// }

// module.exports.register = async (req,res, next)=>{
//     try{
//         const {username, email, password } = req.body;
//         const usernameCheck =await Users.findOne({username});
//         if(usernameCheck)
//         return res.json({msg: "Username already exist", status:false});
//         const emailCheck =await Users.findOne({email});
//         if(emailCheck)
//         return res.json({msg: "Email already exist", status:false});
//         const hashedPassword =await bcrypt.hash(password,10);
//         const user = await Users.create({
//             email,
//             username,
//             password:hashedPassword
//         });
//         delete user.password;
//         return res.json({status: true, user})
//     }catch(err){
//         next(err)
//     }
// }

module.exports.getSongs = async(req, res, next)=>{
   try {
    console.log("call herer");
    
   const response = await axios.get('https://itunes.apple.com/search?term=lofi&media=music');
     res.json(response.data);
    console.log(response.data);
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Deezer' });
    console.log("Error happened");
    
  }
}
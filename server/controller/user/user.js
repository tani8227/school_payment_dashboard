import User from "../../modal/user/user.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();


export const SignUp = async (req, res) => {
    try {
        console.log("Signup API called with data:", req.body);
        const user = await User.create(req.body);

        if (user) {
            console.log("User created successfully:", user);
            return res.status(200).json({ data: user, message: 'user created successfully' });
        } else {
            console.log("User creation failed");
            return res.status(400).json({ message: 'User creation failed' });
        }
    } catch (error) {
        console.error("Error in SignUp:", error.message);
        return res.status(500).json({ error: error.message });
    }
};




export const SignIn = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });          
        if (user) {

            const token = jwt.sign(user.toJSON(), `${process.env.SECRET}`, { expiresIn: '2d' })

            return res.status(200).json(
                {
                    data: user,
                    token: token,
                    meassage: "user Signed in"
                })
        } else {
            return res.status(401).json(
                {
                    meassage: "user not found"
                })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export const getUser = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);    
              console.log("kkkkk")
        if (user) {

            return res.status(200).json(
                {
                    data: user,
                    meassage: "get the user"
                })

        } else {
            return res.status(401).json(
                {
                    meassage: "user not found"
                })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}






import User from "../models/User.js";
import bcrypt from "bcrypt";


export const register = async(req, res) => {  //no se tipa request ni response porq es javascript!

    
        try {
          
            const email = req.body.email
            const password = req.body.password
    
    
            if (password.length < 6 || password.length > 10) {
                return res.status(400).json({
                    success: false,
                    message: "Password must contain between 6 and 10 characters"
                })
            }
    
    
            const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            if (!validEmail.test(email)) {
                return res.status(400).json(
                    {
                        success: false,
                        message: "format email invalid"
                    }
                )
            }
            const passwordEncrypted = bcrypt.hashSync(password, 5)

            const newUser = await User.create({
                email: email,
                password: passwordEncrypted
            }
            )
            
    
            res.status(201).json({
                success: true,
                message: "User registered succesfully",
                data: newUser
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "User cant be registered",
                error: error
            })
        }
    };


export const login = (req, res) => {  //no se tipa request ni response porq es javascript!
    res.status(200).json(
        {
            success: true,
            message: "login user successfully"
        }
    )
};

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {  //no se tipa request ni response porq es javascript!


    try {

        const email = req.body.email
        const password = req.body.password
        const name = req.body.name


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
            name: name,
            email: email,
            password: passwordEncrypted
        }
        )


        res.status(201).json({
            success: true,
            message: `User is registered succesfully`,
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cant be registered",
            error: error.message
        })
    }
};


export const login = async (req, res) => {  //no se tipa request ni response porq es javascript!

    try {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "email and password are mandatories"
            })
        }

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email format is not valid"
                }
            )
        }

        const user = await User.findOne(
            {
                email: email // buscas el user por email.

            }
        )


        if (!user) {
            res.status(400).json({
                success: false,
                message: "Email or password invalid"
            })
        }

        const isValidPassword = bcrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Email or password invalid"
            })
        }

        const token = jwt.sign(
            {
                userId: user._id,
                roleName: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            }
        )

        res.status(200).json({
        
            success: true,
            message: `User ${user.name} logged succesfully`,
            token: token , 
           
            
            //MOSTRAMOS EL TOKEN DE MANERA TEMPORAL PARA PODER PROBAR CON ÉL OTRA FUNCIONALIDADES
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "User cant be logged",
            error: error
        })
    }
}


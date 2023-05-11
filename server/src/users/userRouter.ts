import {Router} from 'express'
import { userModel } from './userModel'
import { ladeboardModel } from '../ladeboards/ladeboardModel'

import bcrypt from 'bcryptjs'

export const userRouter = Router()

userRouter.get("/",async (req,res) =>{
    let user_id = req.query.user_id;
    let ladeboard = req.query.ladeboard;

    if(ladeboard){
        const result = await ladeboardModel.find().sort({victories:-1}).limit(10)
        res.status(200).send({users:result})// {ladeboard:ladeboard}
    }else{
        let match = {_id:user_id};
        const currentUser = await userModel.find(match, 'email victories defeats draws total_games status');
        if(currentUser.length === 0){
            res.status(200).send({error:"this user id is not exist"})
        }else{
            res.status(200).send({message:"ok",user:currentUser[0]})
        }
    }

})

userRouter.post("/",async (req,res) =>{

    const {password,email,action} = req.body

    if(action === "register"){
        const encryptedPasword = await bcrypt.hash(password,10)

        let match = {email:email};
        const currentUser = await userModel.find(match);

        if(currentUser.length !== 0){
            res.status(200).send({error:"this user is already in use"})
        }else{
            try{
                req.body.status="offline"
                req.body.victories = 0
                req.body.defeats = 0
                req.body.draws = 0
                req.body.total_games = 0
                req.body.socket_id = ""
                req.body.password = encryptedPasword
                await userModel.create(req.body)
                res.status(200).send({message:"user created successfully"})
            }catch(error){
                res.status(200).send({error:"internal server error"})
            }
        }
    }else if(action === "login"){
        let match = {email:email};
        const currentUser = await userModel.find(match)

        if(currentUser.length === 0){
            res.status(200).send({error:"this user is not exist"})
        }else{
            const encryptedPasword = currentUser[0].password
            
            const compare = await bcrypt.compare(password, encryptedPasword)

            if(compare){
                res.status(200).send({message:"login correct",user:currentUser[0]})
            }else{
                res.status(200).send({error:"the entered password is incorrect"})
            }
        }

    }else{
        res.status(200).send({error:"action not received"})

    }
})

userRouter.get("/",async (req,res) =>{
    res.send("get")
})
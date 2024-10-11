import User from "../model/User";
import { Response } from "express";
import JobSeeker from "../model/JobSeeker";
import bcrypy from 'bcrypt';
import jwt from 'jsonwebtoken'
import Agency from "../model/Agency";
import { sendMailToUser } from "../libs/mail/mailer";
import Hobby from "../model/Hobby";

const secret: string = "Anurag123#@!";
let token: string;


// Post Request
export const loginUser = async (req: any, res: Response) => {
    try {
        const { email, password, user_type } = req.body;

        if(user_type == 1){
            var user = await User.findOne({ where: { email:email, user_type:1 }, include: Agency });
        }
        else{
            var user = await User.findOne({ where: { email:email, user_type:2 }, include: JobSeeker });
        }

        if (user) {
            const isPasswordValid = await bcrypy.compare(password, user.password);

            console.log("is password valid------> ", isPasswordValid);
            if (isPasswordValid) {

                token = jwt.sign({user}, secret);
                res.status(200).json({user:user, token:token});
                console.log("User login successful");
            } else {
                res.status(401).json({"error": "Invalid Credentials"});
            }
        } else {
            res.status(401).json({"error":"User doesn't exist"});
        }
    } catch (err: any) {
        res.status(500).json({"error":`Error logging in: ${err}`});
    }
};

// Post Request
export const addUser = async(req:any, res:Response) => {
    try{
        var newAgency:boolean|any = false;
        var newJobSeeker:boolean|any = false;
        const {firstname, lastname, email, user_type, phone, gender, agency, reading, writting, fitness, shoping, guitar} = req.body;
        const sysGenPass = String(Math.round(Math.random()*100000000));
        const password = await bcrypy.hash(sysGenPass, 10)
        
        const newUser = await User.create({email, password, user_type});
        
        if(user_type == 1){
            newAgency = await Agency.create({firstname, lastname, phone, gender, profile_photo:req.files['profile_photo'][0].path, UserId: newUser.id})
        } else {
            newJobSeeker = await JobSeeker.create({firstname, lastname, phone, gender, profile_photo:req.files['profile_photo'][0].path, resume: req.files['resume'][0].path, UserId: newUser.id, AgencyId: agency });
        }
        const newHobby = await Hobby.create({reading, writting, fitness, shoping, guitar, UserId: newUser.id});
        
        if (newUser && (newAgency || newJobSeeker) && newHobby){
            sendMailToUser(newUser.email, sysGenPass);
            res.status(200).json({"message":"Data Saved Sucessfully........."});
        }
        else{
            res.status(401).json({"error":"Saving data failed......."})
        }
    }
    catch(err){
        res.status(500).json({"error": `Something Went Wrong......${err}`});
    }
}

// Post Request
export const updatePass = async(req:any, res:Response) => {
    try{

        const id = req.user.user.id;
        console.log("Helllllllllll-----------", id)
        var user = await User.findByPk(id);
        req.body.password = await bcrypy.hash(req.body.password, 10);
        const password = req.body.password;

        if(user){
            user = await user.update({password:password, is_active:true})
            
            console.log("Updated Data----------",user)
            if(user){
                res.status(200).json({"message":"User Status Active Successfully"});                
            }
            else{
                res.status(400).json({"error":"Updating User Failed........."});
            }
        } else{
            res.status(401).json({"error":"User not Found......."});
        }
    }
    catch {
        res.status(500).json({"error": "Something Went Wrong....."});
    }
}

// Get Request
export const getUser = async(req:any, res:Response) => {
    try{
        const id = req.user.user.id;
        const user_type = req.params.user_type;

        var user: any|boolean = false;
        var getagency: any|boolean = false

        if(user_type == 1){
            user = await Agency.findOne({where: { UserId:id }, include:JobSeeker});
        }else{
            user = await JobSeeker.findOne({where: { UserId:id }});;
            const agencyid = user?.AgencyId;
            getagency = await Agency.findByPk(agencyid);
        }

        if(user){
            if(getagency){
                res.status(200).json({user: user, agency: getagency})
            } else {
                res.status(200).json(user);
            }
        } else {
            res.status(401).json({"error":"User not Found....."});
        }
    } catch{
        res.status(500).json({"error": "Something Went wrong......"});
    }
}

// Get Request
export const getJobSeekerList = async(req:any, res:Response) => {
    try{
        const id = req.user.user.id;
        const agency = await Agency.findOne({where:{UserId:id}})
        const JobSeekerList = await JobSeeker.findAll({where:{AgencyId:agency?.id}});

        res.status(200).json({JobSeekerList})
    } catch {
        res.status(500).json({"error":"Something Went Wrong........."});
    }
}

// Get Request
export const getAgencyList = async(req:any, res:Response) => {
    try{
        const agencyList = await Agency.findAll();
        res.status(200).json(agencyList);
    } catch{
        res.status(500).json({"error":"Something Went Wrong"})
    }
}
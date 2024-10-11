import {Router} from 'express';
import { upload } from '../middleware/upload';
import { Validator } from '../middleware/userValidation';
import {addUser, getAgencyList, getJobSeekerList, getUser, loginUser, updatePass} from '../controller/userController'
import { authenticateJWT } from '../libs/auth/UserAuth';


const router = Router()

router.post("/login", loginUser) // Login User
router.post("/reset-password", authenticateJWT, updatePass); // Update Password
router.post("/signup", upload.fields([{ name: 'profile_photo' }, { name: 'resume' }]), Validator, addUser); // Add User
router.get("/get-user", authenticateJWT, getUser);
router.get("/get-all-job-seekers", authenticateJWT, getJobSeekerList);
router.get("/get-all-agencies", getAgencyList);

export default router;
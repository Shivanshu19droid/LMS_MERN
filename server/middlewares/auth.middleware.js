import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token) {
        return next(new AppError('Unauthenticated, please login again', 401));
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = userDetails;
    // console.log("the user details are: " , req.user)
    // console.log("user id is: ", req.user.id)

    next();
}

//this middleware is to give access for creation, updation and deletion of courses to the admins only

const authorizedRoles = (...roles) => async(req, res, next) => {
    const currentUserRole = req.user.role;
    if(!roles.includes(currentUserRole)){
        return next(
            new AppError('You do not have permission to access this route')
        )
    }
    next();
}

//we define a middleware which prevents the users with no subscription from accessing the course lectures, i.e. the course lectures will be accessible only by the admin and the users with subscription
const authorizedSubscriber = async(req, res, next) => {
    const subscription = req.user.subscription;
    const currentUserRole = req.user.role;

    if(currentUserRole !== 'ADMIN' && subscription.status !== 'ative'){
        return next(
            new AppError('Please subscribe to access this route', 400)
        )
    }

    next();
}

export{
    isLoggedIn,
    authorizedRoles,
    authorizedSubscriber
}

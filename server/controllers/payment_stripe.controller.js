import Payment from "../models/payment.model.js";
import AppError from "../utils/error.util.js";
import Stripe from 'stripe'
import User from '../models/user.model.js'
import { config } from "dotenv";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//returning the stripe publishable key to the front end
const getStripeApiKey = async(req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Stripe publishable key",
        key: process.env.STRIPE_PUBLISHABLE_KEY
    });
};

//creating a subscription

//for creating a subscription in stripe, first get user id, then we create a customer in stripe if it does not exist, then we create a subscription for the user
const buySubscription = async(req, res, next) => {
    try{

       const {id} = req.user;
       const user = await User.findById(id);

       if(!user){
        return next(new AppError("Unauthorised! Please Login", 401));
       }

       if(user.role === 'ADMIN'){
        return next(new AppError("Admin cannot purchase a subscription", 403));
       }

       //fetching a customer or creating a new one on stripe
       let customerId = user.stripeCustomerId;

       if(!customerId){

        const customer = await stripe.customers.create({
            email: user.email,
            name: user.name
        });

        customerId = customer.id;
        user.stripeCustomerId = customerId;

       }

       //now since the customer is created, we will create a new subscription
       const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{price: process.env.STRIPE_PRICE_ID}],
        payment_behavior: "default_incomplete", // payment to be completed on frontend
        expand: ["latest_invoice.payment_intent"],
       });

       user.subscription.id = subscription.id;
       user.subscription.status = subscription.status;

       await user.save();

       res.status(200).json({
      success: true,
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });

    } catch(error){
        return next(new AppError(error.message, 500));
    }
};

//verifying the payment/subscription

//steps: 1. we retrieve the user, then its subscription id
    //2. verify 3. retrieve the subscription from stripe using the subscription id and check if it is active

const verifySubscription = async(req, res, next) => {
    try{

        const {id} = req.user;
        const {subscriptionId} = req.body;

        const user = await User.findById(id);

        if(!user){
            return next(new AppError("Unauthorized! Please Login", 401));
        }

        if(!user.subscription || user.subscription.id !== subscriptionId){
            return next(new AppError("Subscription ID mismatch", 400));
        }

        //now that we have checked the subscriptio id to be  correct, we will fetch the subscription from stripe using the id 
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        if(subscription.status !== 'active'){
            return next(new AppError("Subscription status not active, Payment incomplete"));
        }

        //update the subscription status
        user.subscription.status = subscription.status;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Subscription Verified Successfully"
        });

    } catch(error){
        return next(new AppError(error.message, 500));
    }
};

//cancelling a subscription

//steps 1. retrieve the user 2. retrieve subscription id 3. retrieve the subscription from stripe using the id 4. cancel subscription 5. save
const cancelSubscription = async(req, res, next) => {
    try{

        const {id} = req.user;
        const user = await User.findById(id);

        if(!user){
            return next(new AppError("Unauthorized! Please Login", 400));
        }

        if(user.role === 'ADMIN'){
            return next(new AppError("Admins cannot cancel/purchase a subscription", 401));
        }

        const subscriptionId = user.subscription.id;

        const cancelledSubscription = await stripe.subscriptions.del(subscriptionId);

        user.subscription.status = cancelledSubscription.status; //likely cancelled

        await user.save();

        res.status(200).json({
            success: true,
            message: "Subscription Cancelled Successfully"
        });

    } catch(error){
        return next(new AppError(error.message, 500));
    }
};

//listing all payments
const allPayments = async(req, res, next) => {
    try{
       const {count} = req.query;

       const subscriptions = await stripe.subscriptions.list({limit: count || 10});

       res.status(200).json({
        success: true,
        message: "List of all subscriptions",
        subscriptions
       });
    } catch(error){
        return next(new AppError(error.message, 500));
    }
};

export{
    getStripeApiKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayments
}




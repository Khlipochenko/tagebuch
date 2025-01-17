import { Webhook } from "svix";
import {User} from '../models/Users.js'
export const clerkWebhooks=async(req,res)=>{
    try{
        console.log('Webhook bekommt:'. req.body);
        const whook=new Webhook( process.env.CLERK_WEBHOOK_KEY)
        await whook.verify(JSON.stringify(req.body),{
            'svix-id':req.headers['svix-id'],
            "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"]
        }),
        console.log("Webhook verified");
        const {data, type}=req.body
        console.log(type);
    
    switch (type) {
        case 'user.created':{

            const userData={
                _id:data.id,
                email:data.email_addresses[0].email_address,
                name:data.first_name+' '+data.last_name,
                image:data.image_url,
              

            }
            await User.create(userData)
            res.json({})
            break;
        }
        case 'user.updated':{
            const userData={
              
                email:data.email_addresses[0].email_address,
                name:data.first_name+' '+data.last_name,
                image:data.image_url,
              

            }
            await User.findByIdAndUpdate(data.id, userData)
            res.json({})
            break

        }
        case 'user.deleted':{
            await User.findByIdAndDelete(data.id)
            res.json({})
            break

        }
        default:
            break}
    
    

}catch(e){
    console.log(e.message);
    res.status(500).json({sucess:false, message: 'Webhooks error'})

}
}
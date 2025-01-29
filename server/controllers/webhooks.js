// import { Webhook } from "svix";
// import {User} from '../models/Users.js'
// export const clerkWebhooks = async (req, res) => {
//     try {
//         if (!req.body || Object.keys(req.body).length === 0) {
//             throw new Error("Request body is empty or undefined");
//         }

//         console.log("Webhook received:", req.body);

//         // Svix Webhook verification
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_KEY);

//         // Header-Validierung mit Fallbacks
//         const headers = {
//             "svix-id": req.headers["svix-id"] || "",
//             "svix-timestamp": req.headers["svix-timestamp"] || "",
//             "svix-signature": req.headers["svix-signature"] || "",
//         };

//         if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
//             throw new Error("Missing Svix headers");
//         }

//         // Webhook-Validierung
//         await whook.verify(JSON.stringify(req.body), headers);

//         console.log("Webhook verified");

//         // Event-Handling
//         const { data, type } = req.body;

//         switch (type) {
//             case "user.created": {
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses[0]?.email_address || "",
//                     name: `${data.first_name} ${data.last_name}`,
//                     image: data.image_url || "",
//                 };

//                 await User.create(userData);
//                 break;
//             }
//             case "user.updated": {
//                 const userData = {
//                     email: data.email_addresses[0]?.email_address || "",
//                     name: `${data.first_name} ${data.last_name}`,
//                     image: data.image_url || "",
//                 };

//                 await User.findByIdAndUpdate(data.id, userData);
//                 break;
//             }
//             case "user.deleted": {
//                 await User.findByIdAndDelete(data.id);
//                 break;
//             }
//             default:
//                 console.log("Unknown event type:", type);
//                 break;
//         }

//         res.status(200).json({ success: true, message: "Event processed successfully" });

//     } catch (e) {
//         console.error("Webhook processing error:", e.message);
//         res.status(400).json({ success: false, message: e.message });
//     }
// };

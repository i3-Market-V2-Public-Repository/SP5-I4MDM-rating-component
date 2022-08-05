import got from "got"
import dotenv from "dotenv"

dotenv.config()
export const ACTIONS ={
    new : "offering.new",
    edit: "offering.update",
    response: "offering.update",
    deleted: "rating.delete"
}
  
export function sendNotification(from, to, action, msg, id_token=null){
    // @ts-ignore
    got.post(process.env.NOTIFICATION_URL, {
        headers:{
            id_token: id_token
        },
        json:{
            "origin": from,
            "predefined": true,
            "type": action,
            "receiver_id": to,
            "status": "OK",
            "message":{
                "msg": msg
            }
        }
    }).then(res =>{
        let body = JSON.parse(res.body);
        console.log(`[notificationService] Notification with id ${body.id} posted successfully`)
    }).catch(err => {
        console.log("[notificationService] ", err.message)
        //throw err
    })
}
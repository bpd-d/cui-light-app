import { are, is } from "../../core/utils/functions";
import { ICuiNotification } from "./interfaces";

export function validateNotificationData(data: ICuiNotification): boolean {
    return is(data) && are(data.id, data.title);
}
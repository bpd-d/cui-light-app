import { are, is } from "../../core/utils/functions";
export function validateNotificationData(data) {
    return is(data) && are(data.id, data.title);
}

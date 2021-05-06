import { CuiCore } from "../../core/models/core";
import { ICuiNotification } from "./interfaces";
export default function getNotification(data: ICuiNotification, utils: CuiCore, cache: any, onClose: () => void): Promise<HTMLElement | undefined>;

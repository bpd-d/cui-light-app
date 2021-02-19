import { CuiUtils } from "../../core/models/utils";
import { ICuiNotification } from "./interfaces";
export default function getNotification(data: ICuiNotification, utils: CuiUtils, cache: any, onClose: () => void): Promise<HTMLElement | undefined>;

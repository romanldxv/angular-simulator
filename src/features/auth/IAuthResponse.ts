import { IToken } from "./IToken";
import { IAuthUser } from "./IAuthUser";

export interface IAuthResponse extends IToken, IAuthUser {}
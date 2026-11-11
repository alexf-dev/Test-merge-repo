import { Dep } from "./dep";
import { Post } from "./post";
import { Region } from "./region";
import { UserRole } from "./userRole";

export class Profile {
    userId: number;
    userIIN: string;
    userName: string;
    firstName: string;
    lastName: string;
    middleName: string;
    dep: Dep;
    post: Post
    region: Region
    acceptedRules: number;
    langId: number;
    userRoles: UserRole[];


}

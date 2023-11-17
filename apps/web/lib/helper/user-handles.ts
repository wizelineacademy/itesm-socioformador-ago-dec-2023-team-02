import { getUserbyAuthID } from "../user";

export async function getUserId(auth0Id: string): Promise<number> {
    //get user
    try{
        const result = await getUserbyAuthID(auth0Id);

        if(!result.data) throw new Error("User not found");

        const user = result.data;
        return user.id;

    }catch(err){
        return -1;
    }
}
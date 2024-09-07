import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Key({params}:{ params : {keyid:string}}){
    const session = await auth()
    if(!session ){
        redirect("/")
    }
    return(
        <div>
            {params.keyid}
        </div>
    )
}
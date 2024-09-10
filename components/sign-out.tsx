import { signOut } from "@/auth"
import { Button } from "./ui/button"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({redirectTo:"/"})
      }}
    >
        <Button className="hover:bg-slate-100 hover:text-neutral-800 transition-colors duration-500 " variant="secondary">Sign Out</Button>
      
    </form>
  )
}
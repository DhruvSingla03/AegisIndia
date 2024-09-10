
import { signIn } from "@/auth"
import { Button } from "./ui/button"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google",{redirectTo:"/dashboard"})
      }}
    >
      <Button className="hover:bg-slate-100 hover:text-neutral-800 transition-colors duration-500 bg-neutral-800">Sign In</Button>
    </form>
  )
} 
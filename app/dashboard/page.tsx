import { auth } from "@/auth"
import { SignOut } from "@/components/sign-out"
import { redirect } from "next/navigation"
import { AddNewKeyModal } from "@/components/AddNewKeyModal"

export default async function Dashboard() {
  const session = await auth()
  if (!session || !session.user) {
    redirect("/")
  }

  return (
    <div className="w-full flex justify-between p-2 ">
      <div className="text-2xl ">
        {session.user.name}
      </div>
      <div className="flex gap-x-2">
        {/* Add New Item Dialog Button */}
        <AddNewKeyModal email={session.user.email as string}/>
        <SignOut />
      </div>
    </div>
  )
}

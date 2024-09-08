import { NavigationMenuDemo } from "@/components/Dropdown";
import SignIn from "@/components/sign-in";

export default async function Home() {
  return (
    <div>
      <div className="flex flex-row text-3xl px-5 py-2 justify-between items-center font-bold">
        <div className="flex gap-x-2 items-center">
          AegisIndia
          <div>
            <NavigationMenuDemo/>
          </div>
        </div>
        <SignIn />
      </div>
    </div>
  );
}

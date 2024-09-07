import SignIn from "@/components/sign-in";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-5xl font-bold mb-8">
        AegisIndia
      </div>
      <div className="grid grid-rows pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <SignIn/>
      </div>
    </div>
  );
}

import { auth } from "@/auth";
import { getKeyInfo } from "@/lib/getKeysInfo";
import { redirect } from "next/navigation";
import ListKeyInfo from "@/components/ListKeyInfo";
import { PieChartMetrics } from "@/components/ui/piechart";

export default async function Key({ params }: { params: { keyid: string } }) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const keyInfo = await getKeyInfo(params.keyid);
  if (!keyInfo) {
    return (
      <div>
        No key found!
      </div>
    );
  }

  return (
    <div>
      <ListKeyInfo name={keyInfo.name} value={keyInfo.value} />
      <div className=" p-3 ml-2 mr-2 mt-5">
        <PieChartMetrics totalCalls={keyInfo.numApiCall} successCalls={keyInfo.successApiCall} failCalls={keyInfo.failApiCall}/>
      </div>
    </div>
  );
}

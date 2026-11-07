import type { Metadata } from "next";
import { Lead } from "@/components/Lead";

export const metadata: Metadata = { title: "JusDesk · Team overview" };

export default function Page() {
  return <Lead />;
}

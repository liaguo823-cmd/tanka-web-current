import { flowItems } from "../../../data";
import FlowDetailView from "./flow-detail-view";

export function generateStaticParams() {
  return flowItems.map((f) => ({ id: f.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <FlowDetailView id={id} />;
}

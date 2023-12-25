import { Metadata } from "next";
import FormGroup from "../_components/FormGroup";

export const metadata: Metadata = {
  title: "Add New Lead",
  description: "Add New Lead",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl mb-6">Add New Lead</h1>
      <FormGroup />
    </div>
  );
}

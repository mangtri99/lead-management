import { Metadata } from "next";
import FormGroup from "../_components/FormGroup";
import getOptions from "../_states/fetch";

export const metadata: Metadata = {
  title: "Add New Lead",
  description: "Add New Lead",
};

export default async function Page() {
  const options = await getOptions();
  return (
    <div>
      <h1 className="text-2xl mb-6">Add New Lead</h1>
      <FormGroup options={options} />
    </div>
  );
}

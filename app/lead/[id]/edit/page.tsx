import FormGroup from "../../_components/FormGroup";
import { Metadata } from "next";
import getOptions from "../../_states/fetch";

export const metadata: Metadata = {
  title: "Edit Lead Management",
  description: "Edit Lead Management",
};

export default async function Page() {
  const options = await getOptions();
  return (
    <div>
      <h1 className="text-2xl mb-6">Edit Lead</h1>
      <FormGroup options={options} />
    </div>
  );
}

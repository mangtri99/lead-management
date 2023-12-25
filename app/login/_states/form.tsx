import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useFormLogin() {
  // Login Schema
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    remember: z.boolean(),
  });

  // Form Resolver
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  return {
    form,
    schema,
  }
}
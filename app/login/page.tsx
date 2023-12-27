"use client";
import Image from "next/image";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import useFormLogin from "./_states/form";
import { useRouter } from "next/navigation";

export default function Page() {
  const { form, schema } = useFormLogin();
  const router = useRouter();

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
    router.push("/");
  }

  return (
    <div className="h-full w-full flex">
      {/* Image */}
      <div className="w-3/5 hidden lg:block">
        <Image
          src="/img/login.png"
          width={0}
          height={0}
          style={{ width: "100%", height: "100%" }}
          sizes="100%"
          className="object-cover"
          alt="Picture of the author"
        />
      </div>

      {/* Form Login */}
      <div className="lg:w-2/5 w-full flex flex-col h-full items-center justify-center px-4">
        <Image
          src="/img/logo.svg"
          width={0}
          height={0}
          className="max-w-sm w-1/2"
          alt="Picture of the author"
        />

        <div className="mt-10 text-center w-full">
          <h1 className="text-3xl font-bold">GX APP 2.0</h1>
          <p className="text-sm">Sign in to your account below</p>
        </div>

        <div className="lg:w-2/3 w-full mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Type your email here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Type your password here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Remember */}
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    </FormControl>
                    <FormLabel className="ml-2 !mt-0">Remember me</FormLabel>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import FormGroup from "./_components/FormGroup";

export default function Page() {

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
      <div className="lg:w-2/5 w-full flex flex-col h-full items-center justify-center">
        <div className="max-w-sm">
          <div className="flex justify-center">
            <Image
              src="/img/logo.svg"
              width={0}
              height={0}
              className="w-full"
              alt="Picture of the author"
            />
          </div>

          <div className="mt-10 text-center w-full">
            <h1 className="text-3xl font-bold">GX APP 2.0</h1>
            <p className="text-sm">Sign in to your account below</p>
          </div>

          <div className=" w-full mt-6">
            <FormGroup />
          </div>
        </div>
      </div>
    </div>
  );
}

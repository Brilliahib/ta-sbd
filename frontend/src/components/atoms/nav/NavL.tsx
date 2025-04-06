import Image from "next/image";
import Link from "next/link";

export default function NavL() {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={"/images/logo_notext.png"}
              alt="Vintagee"
              width={20}
              height={20}
            />
            <h1 className="font-bold text-primary">Vintagee</h1>
          </Link>
        </div>
      </div>
    </>
  );
}

import Logo from "@/app/assets/logo.svg";
import Image from "next/image";
import { Lexend_Deca } from "next/font/google";
import Link from "next/link";

const lexend_deca = Lexend_Deca({ subsets: ["latin"] });

export default function Header() {
  return (
    <div className={`${lexend_deca.className}`}>
      <nav className="flex items-center my-6 mx-24">
        <div className="flex flex-row items-center gap-x-2">
          <Image
            src={Logo}
            alt="Logo"
            className="w-[2.5rem] bg-transparent cursor-pointer"
          />
          <Link href="/" className="text-[2rem] mb-2">
            whackytype
          </Link>
        </div>
      </nav>
    </div>
  );
}

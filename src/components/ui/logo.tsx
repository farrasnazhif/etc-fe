import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/">
      <Image width={32} height={32} alt="ETC Logo" src="/etc-logo.png" />
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.webp";
import { site } from "@/config/site";

/** Company logo linking home. Dimensions match the legacy markup; CSS sets the rendered size. */
export function Brand({ width, height }: { width: number; height: number }) {
  return (
    <Link href="/" aria-label={`${site.name} home`}>
      <Image src={logo} alt={site.name} width={width} height={height} loading="eager" />
    </Link>
  );
}

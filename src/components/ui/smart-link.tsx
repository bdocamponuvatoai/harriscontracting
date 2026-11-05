import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type SmartLinkProps = ComponentPropsWithoutRef<"a"> & { href: string };

/**
 * Internal routes ("/…") use next/link for client-side navigation and prefetching.
 * Everything else (tel:, mailto:, #hash, external URLs) is a plain <a>, with the
 * caller's attributes passed through unchanged.
 */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}

import type { ComponentProps } from "react";
import { SmartLink } from "./smart-link";

/** The bronze call-to-action button, rendered as a link. */
export function ButtonLink({ className, ...props }: ComponentProps<typeof SmartLink>) {
  return <SmartLink className={className ? `button ${className}` : "button"} {...props} />;
}

import type { ComponentProps } from "react";
import { SmartLink } from "./smart-link";

/** Underlined inline call to action. */
export function TextLink(props: Omit<ComponentProps<typeof SmartLink>, "className">) {
  return <SmartLink className="text-link" {...props} />;
}

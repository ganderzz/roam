import type { ComponentChildren } from "preact";

type Props = {
  href: string;
  children: ComponentChildren;
};

export const MenuLink = ({ children, href }: Props) => {
  return (
    <a href={href} class="mr-3 hover:opacity-70">
      {children}
    </a>
  );
};

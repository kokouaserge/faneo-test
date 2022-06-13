import React, { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface NavLinkProps {
  to: string;
  exact?: boolean;
  strict?: boolean;
  className: string;
  activeClassName?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  children?: JSX.Element | JSX.Element[];
}

const NavLink: FC<NavLinkProps> = ({
  exact = false,
  to,
  strict,
  className,
  activeClassName,
  target,
  rel,
  children,
  onClick = () => {},
  ...props
}) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === to : pathname.startsWith(to);

  if (isActive) {
    className += " active";
  }

  return (
    <Link href={to}>
      <a {...props}>{children}</a>
    </Link>
  );
};

export default NavLink;

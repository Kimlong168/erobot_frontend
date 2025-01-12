"use client";
import { useState } from "react";
import Link from "next/link";
// link in the navigation bar with the underline animation
const NavLink = ({ href, title }) => {
  return (
    <div className="flex justify-center hover:text-primary">
      <FlyoutLink href={href}>{title}</FlyoutLink>
    </div>
  );
};

const FlyoutLink = ({ children, href }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit group"
    >
      <Link href={href} className="relative  text-xl">
        {children}
        <span
          style={{
            transform: open ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-secondary transition-transform duration-300 ease-out"
        />
      </Link>
    </div>
  );
};

export default NavLink;

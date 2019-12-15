import React from "react";
import Link from "next/link";
import styles from "./nav.module.scss";

interface ILink {
  key?: string;
  href: string;
  label: string;
}
const links: ILink[] = [
  { href: "/sheets", label: "Fiches PSE", key: "" },
  { href: "/roadmap", label: "Roadmap", key: "" }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <nav className={styles.navComponent}>
    <ul>
      <li>
        <Link href="/">
          <a>Accueil</a>
        </Link>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;

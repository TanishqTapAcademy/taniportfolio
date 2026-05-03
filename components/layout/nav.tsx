import Link from "next/link";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-medium tracking-tight">
          Portfolio
        </Link>
        <ul className="flex items-center gap-6 text-sm text-foreground/70">
          <li>
            <Link href="/#work" className="hover:text-foreground">
              Work
            </Link>
          </li>
          <li>
            <Link href="/#about" className="hover:text-foreground">
              About
            </Link>
          </li>
          <li>
            <Link href="/#contact" className="hover:text-foreground">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

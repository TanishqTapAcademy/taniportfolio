export function Footer() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-foreground/60">
        <span>© {new Date().getFullYear()}</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}

// components/Footer.tsx

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-transparent text-muted-foreground text-center py-5 mt-12 border-t border-border">
      <p>
        &copy; {currentYear} All rights reserved -{' '}
        <a
          href="https://ifauzeee.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:text-primary transition-colors duration-300"
        >
          Muhammad Ibnu Fauzi
        </a>
      </p>
    </footer>
  );
}
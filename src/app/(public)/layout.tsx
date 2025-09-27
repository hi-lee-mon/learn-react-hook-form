import LinkButton from "@/components/LinkButton";
export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div>
      <header className="sticky top-0 border-b w-full z-50 container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
        <LinkButton href="/" variant="text" size="large" color="inherit">
          Learn React Hook Form
        </LinkButton>
        <nav>
          <ul>
            <li>
              <LinkButton href="/base" sx={{ textDecoration: "underline" }}>
                基礎
              </LinkButton>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

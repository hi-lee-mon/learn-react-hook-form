import LinkButton from "@/components/LinkButton";
export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <header className="sticky top-0 w-full z-50  flex justify-between mb-4 bg-gray-500/20 backdrop-blur-lg  shadow-lg rounded-br-lg rounded-bl-lg">
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

import Shell from "../components/Shell";
import "./globals.css";

export const metadata = {
  title: "Another Book List Website",
  description: "Another book list website, but this one is mine.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}

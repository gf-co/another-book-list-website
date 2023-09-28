import { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

export default function Main({ children }: MainProps) {
  return <main className="max-w-screen-2xl p-4 xl:ml-64">{children}</main>;
}

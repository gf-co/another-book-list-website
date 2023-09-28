"use client";

import { PageProps } from "@/lib/server.types";
import dynamic from "next/dynamic";
import styles from "./page.module.scss";

export default function ItemPage({ params }: PageProps) {
  // Dynamically import the MDX file based on the id
  // Reference: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#importing-named-exports
  // See styling applied to MDX components in mdx-components.tsx
  const ItemMDX = dynamic(() =>
    import(`@/data/items/${params.itemId}.mdx`).then((mod) => mod.default),
  );

  return (
    <div className={styles.container}>
      <ItemMDX />
    </div>
  );
}

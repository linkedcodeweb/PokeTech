import React, { ReactNode } from "react";

export default function Container({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <h2 className="p-2 text-2xl rounded-t-xl bg-pokeGreen-500">
        {title}
      </h2>
      <article className="h-full rounded-b-xl bg-pokeGreen-900/90">{children}</article>
    </div>
  );
}

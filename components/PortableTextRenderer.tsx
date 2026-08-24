import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1200).fit("max").url();
      return (
        <span className="relative my-2 block h-64 w-full overflow-hidden rounded-xl sm:h-80">
          <Image
            src={url}
            alt={value.alt ?? ""}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 672px, 100vw"
          />
        </span>
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="font-semibold text-primary underline underline-offset-2"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-2 text-lg font-bold text-ink sm:text-xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-2 text-base font-bold text-ink sm:text-lg">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary pl-4 italic text-ink-muted">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-sm leading-relaxed text-ink-soft sm:text-base">{children}</p>
    ),
  },
};

export default function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}

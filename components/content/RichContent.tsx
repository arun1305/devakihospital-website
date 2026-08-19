import { cn } from "@/lib/utils";

function looksLikeHtml(content: string) {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}

// CMS content has no inline dark-mode awareness, so we supply sensible
// defaults for the elements it's likely to contain (headings, links,
// blockquotes, code, lists) via arbitrary-variant selectors. These only
// apply a color when the element doesn't already carry an inline style.
const richContentDarkClasses =
  "dark:[&_h1]:text-white dark:[&_h2]:text-white dark:[&_h3]:text-white dark:[&_h4]:text-white " +
  "dark:[&_strong]:text-white dark:[&_b]:text-white " +
  "dark:[&_a]:text-brand-teal-300 dark:[&_a]:hover:text-brand-teal-200 " +
  "dark:[&_blockquote]:border-white/15 dark:[&_blockquote]:text-brand-grey-400 " +
  "dark:[&_code]:bg-brand-teal-900 dark:[&_code]:text-brand-teal-100 " +
  "dark:[&_hr]:border-white/10";

/**
 * Renders CMS rich-text content. Handles both HTML from the admin's rich
 * editor and plain text (e.g. fallback content) with blank-line paragraphs.
 */
export function RichContent({ content, className }: { content: string; className?: string }) {
  if (looksLikeHtml(content)) {
    return (
      <div
        className={cn(richContentDarkClasses, className)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const paragraphs = content.split(/\n{2,}/).filter(Boolean);

  return (
    <div className={cn(richContentDarkClasses, className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

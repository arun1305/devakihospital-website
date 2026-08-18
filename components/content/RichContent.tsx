function looksLikeHtml(content: string) {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}

/**
 * Renders CMS rich-text content. Handles both HTML from the admin's rich
 * editor and plain text (e.g. fallback content) with blank-line paragraphs.
 */
export function RichContent({ content, className }: { content: string; className?: string }) {
  if (looksLikeHtml(content)) {
    return (
      <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
    );
  }

  const paragraphs = content.split(/\n{2,}/).filter(Boolean);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

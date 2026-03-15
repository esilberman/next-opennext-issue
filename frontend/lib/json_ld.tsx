type JsonLdProps = {
  data: Record<string, any>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      key="json-ld"
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      suppressHydrationWarning
    />
  );
}
type SectionProps = {
  title: string;
  count: number;
};

function Section({
  title,
  count,
}: SectionProps) {
  return (
    <div
      style={{
        borderBottom: "1px solid lightgrey",
        padding: "16px 0",
      }}
    >
      <h2>
        {title} ({count})
      </h2>
    </div>
  );
}

export default Section;
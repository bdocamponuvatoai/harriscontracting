export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="check-list">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

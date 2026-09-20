/**
 * Page-wide cosmic sheet rendered in pure CSS: a fixed field of coloured
 * stars over soft nebula washes, layered beneath the per-section ambient
 * tint. Zero JS cost — the gentle drift is a compositor-only transform.
 */
export function CosmosField() {
  return (
    <div
      aria-hidden="true"
      className="cosmos-field pointer-events-none fixed inset-0 z-0"
    />
  );
}
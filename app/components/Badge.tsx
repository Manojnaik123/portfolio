import React from "react";

const Badge = ({ text }: { text: string }) => {
  return (
    <span
      className="text-label px-2.5 py-0.5 rounded-full whitespace-nowrap"
      style={{
        backgroundColor: "var(--color-badge-bg)",
        color: "var(--color-badge-text)",
        border: "1px solid var(--color-badge-border)",
      }}
    >
      {text}
    </span>
  );
};

export default Badge;
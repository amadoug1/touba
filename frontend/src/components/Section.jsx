import React from "react";

export default function Section({
  id,
  children,
  className = "",
  innerClassName = "",
}) {
  return (
    <section
      id={id}
      className={`perf-section w-full py-20 sm:py-24 lg:py-28 ${className}`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}

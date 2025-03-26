import React, { useEffect, useState } from "react";
import { TOCItem, TockitProps } from "./types";
import { generateId } from "./utils/generate-id";

const Tockit: React.FC<TockitProps> = ({
  contentSelector,
  maxDepth = 3,
  className = "",
}) => {
  const [tableOfContents, setTableOfContents] = useState<TOCItem[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");

  // Extract headings from content
  useEffect(() => {
    if (typeof window === "undefined") return;

    const extractHeadings = () => {
      // Find the content container
      const contentContainer = document.querySelector(contentSelector);
      if (!contentContainer) return;

      // Build selector for headings
      const headingSelectors = Array.from(
        { length: Math.min(maxDepth, 6) },
        (_, i) => `h${i + 1}`
      ).join(", ");

      // Find all heading elements
      const headingElements =
        contentContainer.querySelectorAll(headingSelectors);

      // Process heading elements
      const items: TOCItem[] = [];

      headingElements.forEach((el) => {
        const heading = el as HTMLHeadingElement;
        const level = parseInt(heading.tagName.substring(1), 10);

        // Skip headings deeper than maxDepth
        if (level > maxDepth) return;

        // Use existing id or generate one
        const id = heading.id || generateId(heading.textContent || "");

        // Set id if it doesn't exist
        if (!heading.id) {
          heading.id = id;
        }

        items.push({
          id,
          text: heading.textContent || "",
          level,
        });
      });

      setTableOfContents(items);
    };

    // Wait for content to be rendered
    setTimeout(extractHeadings, 100);
  }, [contentSelector, maxDepth]);

  // Track active heading on scroll
  useEffect(() => {
    if (typeof window === "undefined" || tableOfContents.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = tableOfContents.length - 1; i >= 0; i--) {
        const id = tableOfContents[i].id;
        const element = document.getElementById(id);

        if (element && element.offsetTop <= scrollPosition) {
          setActiveHeading(id);
          return;
        }
      }

      // If no heading is found, use the first one
      setActiveHeading(tableOfContents[0].id);
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tableOfContents]);

  // If no headings are found, don't render anything
  if (tableOfContents.length === 0) {
    return null;
  }

  return (
    <div className={`tockit ${className}`}>
      <nav aria-label="Table of contents">
        <ul className="space-y-1">
          {tableOfContents.map((heading) => (
            <li
              key={heading.id}
              style={{
                paddingLeft: `${(heading.level - 1) * 0.75}rem`,
              }}
            >
              <a
                href={`#${heading.id}`}
                className={`block py-1 text-sm ${
                  activeHeading === heading.id
                    ? "font-medium text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Tockit;

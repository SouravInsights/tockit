import React, { useEffect, useState } from "react";
import { TOCItem, TockitProps } from "./types";
import { generateId } from "./utils/generate-id";

const Tockit: React.FC<TockitProps> = ({
  contentSelector,
  maxDepth = 3,
  className = "",
  collapsible = false,
  defaultCollapsed = false,
  onCollapseChange,
}) => {
  const [tableOfContents, setTableOfContents] = useState<TOCItem[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  // Notify parent component when collapsed state changes
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(isCollapsed);
    }
  }, [isCollapsed, onCollapseChange]);

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

  // Toggle collapsed state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // If no headings are found, don't render anything
  if (tableOfContents.length === 0) {
    return null;
  }

  if (collapsible && isCollapsed) {
    // Collapsed View - Elegant tab design
    return (
      <div
        className={`tockit-collapsed ${className} mx-auto w-12 bg-white h-auto rounded-md border border-amber-200 shadow-sm overflow-hidden`}
      >
        <div
          onClick={toggleCollapse}
          className="h-full py-6 flex flex-col items-center justify-between cursor-pointer hover:bg-amber-50 transition-colors duration-200"
          title="Expand table of contents"
        >
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </div>
          <div className="flex flex-col items-center pt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500 mb-3"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>

            {/* Small dots to indicate there are multiple items */}
            <div className="flex flex-col space-y-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  activeHeading ? "bg-amber-500" : "bg-gray-300"
                }`}
              ></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            </div>
          </div>
          <div className="h-5"></div> {/* Empty spacer for balance */}
        </div>
      </div>
    );
  }

  // Expanded View
  return (
    <div
      className={`tockit ${className} w-full bg-white rounded-lg border border-amber-200 overflow-hidden shadow-sm`}
    >
      {/* TOC Header */}
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex space-x-2 mr-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="font-mono text-sm text-gray-600">
            table-of-contents.md
          </span>
        </div>

        {/* Toggle button */}
        {collapsible && (
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-md hover:bg-amber-100 text-gray-700 transition-colors flex items-center"
            aria-label="Collapse table of contents"
          >
            <span className="text-xs mr-1 text-gray-500">Collapse</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* TOC Content */}
      <div className="p-4">
        <nav className="overflow-y-auto max-h-[70vh] font-mono">
          <ul className="space-y-1">
            {tableOfContents.map((heading) => (
              <li
                key={heading.id}
                style={{
                  marginLeft: `${(heading.level - 1) * 0.75}rem`,
                }}
              >
                <a
                  href={`#${heading.id}`}
                  className={`text-sm hover:text-amber-600 transition-colors flex items-center py-1 truncate ${
                    activeHeading === heading.id
                      ? "text-amber-600 font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  {activeHeading === heading.id && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1 flex-shrink-0"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  )}
                  <span className="truncate">{heading.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Tockit;

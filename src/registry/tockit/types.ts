/**
 * Table of Contents item
 */
export interface TOCItem {
  /** Unique ID for the heading */
  id: string;
  /** Text content of the heading */
  text: string;
  /** Heading level (1-6) */
  level: number;
}

/**
 * Props for the Tockit component
 */
export interface TockitProps {
  /**
   * CSS selector for the content container to extract headings from
   */
  contentSelector: string;

  /**
   * Maximum heading depth to include (1-6)
   * @default 3
   */
  maxDepth?: number;

  /**
   * CSS class for the container
   */
  className?: string;

  /**
   * Whether the TOC should be collapsible
   * @default false
   */
  collapsible?: boolean;

  /**
   * Default collapsed state
   * @default false
   */
  defaultCollapsed?: boolean;

  /**
   * Callback when collapsed state changes
   */
  onCollapseChange?: (collapsed: boolean) => void;
}

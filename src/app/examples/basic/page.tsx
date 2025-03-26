/* eslint-disable react/no-unescaped-entities */

"use client";

import React, { useState } from "react";
import { Tockit } from "@/registry/tockit";

export default function BasicExample() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Callback to track TOC collapse state
  const handleCollapseChange = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1
          className="text-3xl font-bold mb-8"
          style={{
            color: "#92400e",
            borderBottom: "1px solid var(--card-border)",
            paddingBottom: "0.5rem",
          }}
        >
          Tockit Example
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with Table of Contents */}
          <div className="lg:w-1/4 lg:sticky lg:top-4 lg:self-start">
            <Tockit
              contentSelector="#example-content"
              collapsible={true}
              defaultCollapsed={false}
              onCollapseChange={handleCollapseChange}
            />
          </div>

          {/* Main Content */}
          <div
            className={`lg:w-${
              isCollapsed ? "11/12" : "3/4"
            } transition-all duration-300`}
          >
            <div
              id="example-content"
              className="tockit-prose"
              style={{
                background: "var(--card-background)",
                padding: "2rem",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid var(--card-border)",
              }}
            >
              <h2>What's Tockit?</h2>
              <p>
                I built Tockit after struggling with the available TOC
                libraries. Most were either too bloated with features I didn't
                need, or too rigid to customize to my liking.
              </p>
              <p>
                This little component just works. No fancy dependencies, no
                complex setup - just copy the files into your project and you're
                good to go.
              </p>

              <h2>How I use it</h2>
              <p>
                I've been using Tockit on my personal blog for a few months now.
                It's been great for longer posts where I want readers to easily
                navigate between sections.
              </p>
              <p>
                The scroll tracking is particularly helpful - as you scroll
                through this page, notice how the active section in the TOC
                updates. This helps readers keep their place in longer articles.
              </p>

              <h3>The setup</h3>
              <p>
                My blog uses Next.js and MDX for content. I simply dropped
                Tockit into my post layout component and pointed it at my
                article container. That's it!
              </p>
              <p>
                The component automatically picks up all the headings and builds
                a nicely formatted TOC. No need to manually maintain a list of
                sections or keep it in sync with my content.
              </p>

              <h3>Adding it to your site</h3>
              <p>Here's a quick snippet of how I use it in my blog layout:</p>
              <pre>
                {`// In my PostLayout.tsx
import { Tockit } from '@/components/ui/tockit';

export default function PostLayout({ children }) {
  return (
    <div className="flex gap-8">
      <aside className="w-64 sticky top-8 self-start">
        <Tockit contentSelector="#post-content" />
      </aside>
      <article id="post-content">
        {children}
      </article>
    </div>
  );
}`}
              </pre>

              <h2>Why I built it this way</h2>
              <p>
                I'm a big fan of the approach that shadcn/ui has popularized -
                small, focused components that you copy into your project rather
                than install as a dependency.
              </p>
              <p>
                This gives you full control over the code. Want to tweak how it
                looks? Just edit the component. Need to change the behavior?
                It's all there in your project, not hidden behind an API.
              </p>

              <h3>The copy-paste model</h3>
              <p>
                Some might argue that NPM packages are more convenient, but I've
                found that for UI components, having direct access to the code
                is actually more practical in the long run.
              </p>
              <p>
                You're not dependent on a third-party package that might be
                abandoned or introduce breaking changes. The code is yours to
                maintain and evolve as your project grows.
              </p>

              <h3>Keeping it simple</h3>
              <p>
                I intentionally kept Tockit minimal. It does one thing - provide
                a table of contents - and does it well. No bloat, no unnecessary
                features.
              </p>
              <p>
                The entire component is just a few files, and it has minimal
                dependencies. This makes it easy to understand, customize, and
                maintain.
              </p>

              <h2>Making it your own</h2>
              <p>
                The beauty of Tockit is how easy it is to customize. Since you
                have the source code, you can change anything you want.
              </p>
              <p>
                Want a different style? Edit the CSS classes. Need to change how
                headings are detected? Modify the extraction logic. It's all
                there for you to tinker with.
              </p>

              <h3>Styling it up</h3>
              <p>
                Tockit uses Tailwind CSS by default, but you can easily change
                that. The component structure is simple and the class names are
                straightforward.
              </p>
              <p>
                I've used it with both Tailwind and CSS Modules in different
                projects, and it was easy to adapt to both styling approaches.
              </p>

              <h2>What's next?</h2>
              <p>
                I'm planning to add a few more features to Tockit based on my
                own needs:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Collapsible sections</li>
                <li>Different visual themes</li>
                <li>Better mobile support</li>
              </ul>
              <p>
                But I'm committed to keeping it simple and focused. I won't add
                features just for the sake of it - everything should serve a
                practical purpose.
              </p>

              <h2>Try it yourself</h2>
              <p>
                Tockit is free to use and modify however you want. Copy it,
                change it, make it your own - that's the whole point!
              </p>
              <p>
                If you find it useful or have ideas for improvements, let me
                know. I'd love to hear how you're using it in your projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

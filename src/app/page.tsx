import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-amber-800">tockit</h1>
        <p className="text-xl mb-8 text-gray-600">
          A simple, customizable table of contents for your React projects
        </p>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200 mb-8 max-w-md mx-auto">
          <p className="text-gray-700 mb-4">
            Built with simplicity in mind. No complicated setup, no unnecessary
            dependencies. Just copy, paste, and use.
          </p>
          <pre className="bg-amber-50 text-gray-600 p-3 rounded text-sm mb-2 text-left">
            # No npm install needed!
          </pre>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/examples/basic"
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            See it in action
          </Link>
          <Link
            href="https://github.com/yourusername/tockit"
            className="px-6 py-3 bg-amber-200 text-amber-900 rounded-lg hover:bg-amber-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </main>
  );
}

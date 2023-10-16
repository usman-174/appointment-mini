import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 text-lg mt-4">
          Sorry, we couldn't find the requested resource.
        </p>
        <Link href="/">
          <button className="text-blue-500 hover:underline text-lg mt-6 block">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}

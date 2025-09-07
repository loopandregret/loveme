"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-pink-300 via-pink-200 to-pink-600">
      <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-8 text-pink-600">Will you be mine? 😊</h1>
        <div className="flex gap-6">
          <button
            onClick={() => router.push('/yes')}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:cursor-pointer"
          >
            Yes
          </button>
          <button
            onClick={() => router.push('/please/1')}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:cursor-pointer"
          >
            No
          </button>
        </div>

        <p className="pt-40 text-center text-gray-200">Pet (truly a boring moment birthed this) project by Azara.</p>
      </main>
    </div>
  )
}

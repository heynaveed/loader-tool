import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SERVER-SIDE API CALL
export async function getServerSideProps() {
  const GOOD_URL = "https://jsonplaceholder.typicode.com/todos/1";
  const BAD_URL = "https://jsonplaceholder.typicode.com/invalid";

  const shouldFail = Math.random() < 0.3; // 30% failure
  const url = shouldFail ? BAD_URL : GOOD_URL;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API failed");

    const data = await res.json();

    return {
      props: {
        data,
        failed: false,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: null,
        failed: true,
      },
    };
  }
}

export default function Home({ data, failed }) {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
            Loader.io Server-Side Test
          </h1>

          {failed ? (
            <p className="text-red-600 text-lg">API FAILED</p>
          ) : (
            <pre className="text-left text-sm bg-zinc-100 p-4 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </main>
    </div>
  );
}

"use client";

// export default function Sample() {
//   return (
//     <div>
//       <div>AAA</div>
//     </div>
//   );
// }

type SampleProps = {
  label: string;
  count?: number;
  onClick?: () => void;
};

// export const Sample = ({ label, count = 0, onClick }: SampleProps) => {
//   // フェッチ確認

//   return (
//     <div className="bg-sky-950">
//       <h1>{label}</h1>
//       <p>count: {count}</p>

//       <button type="button" onClick={onClick}>
//         increment
//       </button>
//     </div>
//   );
// };

import { useEffect, useState } from "react";

export const Sample = ({ label, count = 0, onClick }: SampleProps) => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3000/hello");

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setMessage(data.message); // ← 例: { message: "hello world" }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="bg-sky-950">
      <h1>{label}</h1>
      <p>count: {count}</p>

      {/* フェッチ結果 */}
      {loading && <p>loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {message && <p>{message}</p>}

      <button type="button" onClick={onClick}>
        increment
      </button>
    </div>
  );
};

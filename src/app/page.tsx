import Link from "next/link";

interface IPost {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export default async function Home() {
  const getPosts = async () => {
    const res = await fetch("https://gorest.co.in/public/v2/posts");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return (await res.json()) as IPost[];
  };
  const posts = await getPosts();

  return (
    <div>
      <div className="shadow p-4">
        <div className="container mx-auto flex justify-between">
          <h1>Frontend CRUD</h1>
          <nav>
            <ul className="flex gap-x-5">
              <Link href={""}>Blogs</Link>
              <Link href={""}>Users</Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

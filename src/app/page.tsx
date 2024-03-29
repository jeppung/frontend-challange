import Link from "next/link";

export default function Home() {
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

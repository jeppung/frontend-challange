import Link from "next/link";

export default function Header() {
  return (
    <header className="shadow p-4">
      <div className="container mx-auto flex justify-between">
        <h1>Frontend CRUD</h1>
        <nav>
          <ul className="flex gap-x-5">
            <Link href={"/blogs"}>Blogs</Link>
            <Link href={"/users"}>Users</Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";

export default function Header() {
  return (
    <header className="shadow py-4">
      <div className="container mx-auto flex justify-between">
        <Link href={"/"}>Frontend CRUD</Link>
        <nav>
          <ul className="flex gap-x-5">
            <Link href={"/"}>Blogs</Link>
            <Link href={"/users"}>Users</Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

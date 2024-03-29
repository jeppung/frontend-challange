"use client";
import { useSearchParams } from "next/navigation";
import PostList from "../components/PostList";
import { headers } from "next/headers";
import { useEffect } from "react";

export default function Home() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page");

  return (
    <div>
      <div className="container mx-auto py-10">
        <h1 className="text-xl font-semibold">Posts</h1>
        <PostList page={page ? (parseInt(page) < 1 ? 1 : parseInt(page)) : 1} />
      </div>
    </div>
  );
}

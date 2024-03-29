"use client";
import { useSearchParams } from "next/navigation";
import PostList from "../components/PostList";
import { headers } from "next/headers";
import { useEffect } from "react";

interface IUser {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export default function Home() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page");

  const getUsers = async () => {
    const res = await fetch("https://gorest.co.in/public/v2/users");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return (await res.json()) as IUser[];
  };

  return (
    <div>
      <div className="container mx-auto py-10">
        <h1 className="text-xl font-semibold">Posts</h1>
        <PostList page={page ? (parseInt(page) < 1 ? 1 : parseInt(page)) : 1} />
      </div>
    </div>
  );
}

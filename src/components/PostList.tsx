import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "./ui/pagination";
import { IPost } from "../model";

interface IPostListProps {
  page?: number;
}

export default async function PostList({ page = 1 }: IPostListProps) {
  let totalPages;

  const getPosts = async () => {
    const res = await fetch(
      `https://gorest.co.in/public/v2/posts?page=${page}&per_page=6`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    totalPages = res.headers.get("x-pagination-pages");

    return (await res.json()) as IPost[];
  };

  const posts = await getPosts();

  return (
    <div className="">
      {posts.length > 0 ? (
        <>
          <p className="text-sm">
            Page {page} of {totalPages}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {posts.map((post, i) => {
              return (
                <Card key={i} className="mx-auto flex flex-col">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="line-clamp-3">{post.body}</p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`blogs/${post.id}`}
                      className="border bg-black text-sm text-white p-2 rounded-md"
                    >
                      See more
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem className={`${page == 1 && "invisible"}`}>
                <PaginationPrevious
                  href={`http://localhost:3000/?page=${page - 1}`}
                />
              </PaginationItem>
              <PaginationItem>
                {page > 1 && (
                  <>
                    <PaginationLink
                      href={`http://localhost:3000/?page=${page - 1}`}
                    >
                      {page - 1}
                    </PaginationLink>
                  </>
                )}

                <PaginationLink
                  isActive
                  href={`http://localhost:3000/?page=${page}`}
                >
                  {page}
                </PaginationLink>

                {page < totalPages! && (
                  <PaginationLink
                    href={`http://localhost:3000/?page=${page + 1}`}
                  >
                    {page + 1}
                  </PaginationLink>
                )}
              </PaginationItem>
              <PaginationItem
                className={`${page == totalPages && "invisible"}`}
              >
                <PaginationNext
                  href={`http://localhost:3000/?page=${page + 1}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <h1>No posts found</h1>
      )}
    </div>
  );
}

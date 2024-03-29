import { IPost } from "../../../components/PostList";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

interface IComment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export default async function BlogDetail({
  params: { id },
}: {
  params: { id: number };
}) {
  const getComments = async () => {
    const res = await fetch(
      `https://gorest.co.in/public/v2/posts/${id}/comments`
    );

    if (!res.ok) {
      throw new Error("Error loading comments");
    }

    return (await res.json()) as IComment[];
  };

  const getPost = async () => {
    const res = await fetch(`https://gorest.co.in/public/v2/posts/${id}`);

    if (!res.ok) {
      throw new Error("Error loading post");
    }

    return (await res.json()) as IPost;
  };

  const getUser = async (userId: number) => {
    const res = await fetch(`https://gorest.co.in/public/v2/users/${userId}`);

    if (!res.ok) {
      throw new Error("Error loading user");
    }

    return (await res.json()) as IUser;
  };

  const res = await fetch(`https://gorest.co.in/public/v2/posts/${id}`);
  const post = await getPost();
  const comments = await getComments();
  const user = await getUser(post.user_id);

  return (
    <div className="container py-10">
      <Card className="w-3/4 mx-auto border p-4">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>Author: {user.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{post.body}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <h3 className="font-semibold">Comments ({comments.length})</h3>
          <div className="flex flex-col gap-5 mt-5 w-full">
            {comments.map((c, i) => (
              <>
                <div key={i}>
                  <div>
                    <h4 className="text-sm leading-3">{c.name}</h4>
                    <span className="text-xs text-[#777777]">{c.email}</span>
                  </div>
                  <div className="mt-4">
                    <p>{c.body}</p>
                  </div>
                </div>
                <hr />
              </>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

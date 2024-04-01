"use client";

import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";

import UserCard from "../../components/UserCard";
import { Toaster } from "../../components/ui/toaster";
import { useToast } from "../../components/ui/use-toast";
import { UserDialog } from "../../components/UserDialog";
import { ICreateUserRequest, IUser } from "../../model";

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>();
  const [baseUsers, setBaseUsers] = useState<IUser[]>();
  const { toast } = useToast();

  const getUsers = async () => {
    const res = await fetch("https://gorest.co.in/public/v2/users?per_page=20");

    if (!res.ok) {
      throw new Error("Error get users");
    }

    let data = (await res.json()) as IUser[];
    setUsers(data);
    setBaseUsers(data);
  };

  const deleteUser = async (user: IUser) => {
    const res = await fetch(`https://gorest.co.in/public/v2/users/${user.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    if (!res.ok) {
      toast({
        title: "User delete failed",
        duration: 1000,
        variant: "destructive",
      });
    }

    setUsers(users!.filter((u) => u.id !== user.id));
    setBaseUsers(users!.filter((u) => u.id !== user.id));

    toast({
      title: "User delete successfully",
      duration: 1000,
    });
  };

  const createUser = async (data: ICreateUserRequest) => {
    const res = await fetch(`https://gorest.co.in/public/v2/users/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast({
        title: "User not created",
        duration: 1000,
        variant: "destructive",
      });
    }

    const createdUser = (await res.json()) as IUser;

    setUsers([createdUser, ...users!]);
    setBaseUsers([createdUser, ...users!]);

    toast({
      title: "User created successfully",
      duration: 1000,
    });
  };

  const updateUser = async (
    data: ICreateUserRequest,
    user: IUser,
    index: number
  ) => {
    const res = await fetch(`https://gorest.co.in/public/v2/users/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast({
        title: "User not updated",
        duration: 1000,
        variant: "destructive",
      });
    }

    const updatedUser = (await res.json()) as IUser;

    users![index] = updatedUser;

    setUsers(users);
    setBaseUsers(users);

    toast({
      title: "User updated successfully",
      duration: 1000,
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between ">
          <h1 className="text-xl font-semibold">Users</h1>
          <div className="flex gap-5">
            <Input
              onChange={(e) => {
                setUsers(
                  baseUsers!.filter((u) =>
                    u.name.toLowerCase().includes(e.target.value.toLowerCase())
                  )
                );
              }}
              className="w-72"
              placeholder="Search..."
            />
            <UserDialog
              useButton={true}
              title="Create user"
              onSubmit={async (data) => {
                await createUser(data);
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          {users &&
            (users.length > 0 ? (
              users.map((u, i) => (
                <UserCard
                  key={u.id}
                  user={u}
                  onUpdate={async (data) => {
                    await updateUser(data, u, i);
                  }}
                  onDelete={async () => {
                    await deleteUser(u);
                  }}
                />
              ))
            ) : (
              <h1>No users found</h1>
            ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

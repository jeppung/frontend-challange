import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { UserDialog } from "./UserDialog";
import { ICreateUserRequest, IUser } from "../model";

interface IUserCardProps {
  user: IUser;
  onDelete: () => void;
  onUpdate: (data: ICreateUserRequest) => void;
}

interface IDeleteUserProps {
  onClick: () => void;
}

export default function UserCard({ user, onDelete, onUpdate }: IUserCardProps) {
  let gender = user.gender.split("");
  gender[0] = gender[0].toUpperCase();

  const status = user.status.split("");
  status[0] = status[0].toUpperCase();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between gap-2">
          <CardTitle className="line-clamp-1">{user.name}</CardTitle>
          <div className="flex items-center gap-5">
            <UserDialog
              title="Update user"
              onSubmit={(data) => onUpdate(data)}
              userData={user}
              Icon={<FiEdit className="hover:cursor-pointer" />}
            />
            <DeleteUser onClick={onDelete} />
          </div>
        </div>
        <CardDescription>
          {gender.join("")} | {user.email} | {status.join("")}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function DeleteUser({ onClick }: IDeleteUserProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <RiDeleteBin6Line className="hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure want to delete this user?</DialogTitle>
          <DialogDescription>This action cant be undo</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button onClick={onClick}>Yes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

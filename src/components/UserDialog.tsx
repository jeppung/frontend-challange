import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ICreateUserRequest, IUser } from "../model";

interface ICreateUserProps {
  onSubmit: (data: ICreateUserRequest) => void;
  useButton?: boolean;
  Icon?: JSX.Element;
  title: string;
  userData?: IUser;
}

export function UserDialog({
  onSubmit,
  userData,
  useButton,
  Icon,
  title,
}: ICreateUserProps) {
  const [data, setData] = useState<ICreateUserRequest>(
    userData
      ? userData
      : {
          name: "",
          email: "",
          gender: "",
          status: "",
        }
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={(v) => setIsOpen(v)}>
      <DialogTrigger asChild>
        {useButton ? (
          <Button onClick={() => setIsOpen(!isOpen)}>{title}</Button>
        ) : (
          Icon
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsOpen(false);
            onSubmit(data);
          }}
          className="flex flex-col gap-2"
        >
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select
              value={data.gender}
              onValueChange={(v) => setData({ ...data, gender: v })}
              required
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Email</Label>
            <Input
              value={data.email}
              type="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={data.status}
              onValueChange={(v) => setData({ ...data, status: v })}
              required
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

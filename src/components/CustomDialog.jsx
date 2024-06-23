import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";

export default function CustomDialog(props) {
  return (
    <Dialog>
      <DialogTrigger className="max-h-14 w-full gap-3" asChild>
        <Button variant="outline">
          <PlusIcon className="h-6 w-6" />
          Add a channel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Channel</DialogTitle>
          <DialogDescription>
            You can add channel as per your choice or with a channel ID
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-center">
              Channel Name
            </Label>
            <Input
              placeholder="Channel Name"
              value={props.channelNameInput}
              onChange={(e) => props.setChannelNameInput(e.target.value)}
              defaultValue=""
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Channel ID
            </Label>
            <Input
              placeholder="Channel ID"
              className="col-span-3"
              value={props.channelID}
              onChange={(e) => props.setChannelID(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="data-[state=]:"
            onClick={props.handleAddChannel}
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

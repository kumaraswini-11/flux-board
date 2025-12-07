import { useMedia } from "react-use";

import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResponsiveModal({
  children,
  open,
  onOpenChange,
}: ResponsiveModalProps) {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className={cn(
            "w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]",
            "max-w-md",
          )}
        >
          <DialogTitle className="sr-only">Create Workspace</DialogTitle>
          
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mt-0 border-t-0">
        <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

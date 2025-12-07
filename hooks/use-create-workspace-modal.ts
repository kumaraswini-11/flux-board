import { useQueryState, parseAsBoolean } from "nuqs";

export const useCreateWorkspaceModal = () => {
  // Manages a boolean flag in the URL query under "create-workspace-modal".
  // The value is parsed as a boolean. If it's the default (false), the query parameter is removed, keeping the URL clean.
  const [isOpen, setIsOpen] = useQueryState(
    "create-workspace-modal",
    parseAsBoolean.withDefault(false),
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};

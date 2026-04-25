"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, UploadIcon, X, Loader2, ArrowLeft, CopyIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ACCEPTED_IMAGE_FORMATS, MAX_FILE_SIZE_MB } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface EditWorkspaceFormProps {
    initialValues?: EditWorkspaceFormType;
  onCancel?: () => void;
  onSubmitWorkspaceForm?: (values: EditWorkspaceFormType) => void;
}

const editWorkspaceSchema = z.object({
  name: z
    .string()
    .min(3, "Must be at least 3 or more characters")
    .max(36, "Must be at most 36 or less characters")
    .optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});


type EditWorkspaceFormType = z.infer<typeof editWorkspaceSchema>;

export function EditWorkspaceForm({
  initialValues,
  onCancel,
  onSubmitWorkspaceForm,
}: EditWorkspaceFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
console.log("Initial Values ::", initialValues);

  const workspaceForm = useForm<EditWorkspaceFormType>({
    resolver: zodResolver(editWorkspaceSchema),
    mode: "onChange",
    defaultValues: {
     ...initialValues,
     image: initialValues?.image ?? undefined,
    },
  });

  const handleImageChange = (
    file: File | null,
    onChange: (value: File | string | undefined) => void,
  ) => {
    if (!file) {
      setImagePreview(null);
      onChange(undefined);
      return;
    }

    // Validate file type
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (
      !fileExtension ||
      !ACCEPTED_IMAGE_FORMATS.includes(fileExtension as any)
    ) {
      toast.error(
        `Please upload a valid image format: ${ACCEPTED_IMAGE_FORMATS.join(", ")}`,
      );
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`Image must be less than ${MAX_FILE_SIZE_MB}MB`);
      return;
    }

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    onChange(file);
  };

  const handleRemoveImage = (
    onChange: (value: File | string | undefined) => void,
  ) => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    onChange(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (
    e: React.DragEvent,
    onChange: (value: File | string | undefined) => void,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageChange(file, onChange);
    } else {
      toast.error("Please drop a valid image file");
    }
  };

  async function onSubmit(values: EditWorkspaceFormType) {
    setIsSubmitting(true);

    try {
      const finalValues = {
        ...values,
        image: values.image instanceof File ? values.image : undefined,
      };

      console.log("Workspace Form Values ::", finalValues);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmitWorkspaceForm?.(finalValues);
      // redirect(`/workspaces/${finalValues.id}`);
      toast.success("Workspace created successfully!");
    } catch (error) {
      toast.error("Failed to create workspace. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // const fullInviteLink = `${window.location.origin}/workspaces/${initialValues?.id}/join/{initialValues?.inviteCode}`;
  return (
          <div className=" flex flex-col gap-4">  
          {/* <ResetInviteLinkDialog/> */}
          {/* <Delete Dialog/> */}

          {/* Edit form */}
    <Card className="w-full gap-4 rounded-lg">
      <CardHeader className="flex flex-row items-center gap-x-4 space-y-0">
        <Button size="sm" variant="secondary" onClick={onCancel ? onCancel : ()=> router.push(`/workspaces/${initialValues?.image}`)}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <CardTitle className="text-xl font-bold">{initialValues?.name}</CardTitle>
      </CardHeader>

      <FieldSeparator />

      <CardContent>
        <form
          id="create-workspace-form"
          onSubmit={workspaceForm.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            {/* Workspace Name Field */}
            <Controller
              name="name"
              control={workspaceForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="workspace-name">
                    Workspace Name
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      type="text"
                      id="workspace-name"
                      aria-invalid={fieldState.invalid}
                      aria-describedby="workspace-name-description"
                      placeholder="My Awesome Workspace"
                      autoComplete="off"
                      className={cn(
                        "h-11 transition-all duration-200",
                        // fieldState.invalid && "border-destructive focus-visible:ring-destructive"
                      )}
                    />
                    <FieldDescription id="workspace-name-description">
                      Choose a unique name for your workspace (3-36 characters).
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            {/* Workspace Image Field */}
            <Controller
              name="image"
              control={workspaceForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="workspace-image">
                    Workspace Icon
                  </FieldLabel>
                  <FieldContent>
                    <div
                      className={cn(
                        "relative rounded-lg border-2 border-dashed p-4 transition-all duration-200",
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/30",
                        fieldState.invalid && "border-destructive",
                      )}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, field.onChange)}
                    >
                      <div className="flex items-center gap-4">
                        {/* Image Preview */}
                        <div className="relative shrink-0">
                          {imagePreview ? (
                            <div className="relative group">
                              <div className="size-20 rounded-lg overflow-hidden ring-2 ring-border shadow-card">
                                <Image
                                  src={imagePreview}
                                  alt="Workspace icon preview"
                                  className="object-cover rounded-lg"
                                  fill
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                type="button"
                                onClick={() =>
                                  handleRemoveImage(field.onChange)
                                }
                                className={cn(
                                  "absolute -top-2 -right-2 flex items-center justify-center rounded-full shadow-md size-4",
                                  "bg-accent text-accent-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-primary",
                                )}
                                aria-label="Remove image"
                              >
                                <X className="size-3" />
                              </Button>
                            </div>
                          ) : (
                            <Avatar className="size-20 rounded-xl bg-accent">
                              <AvatarFallback className="rounded-xl bg-accent">
                                <ImageIcon className="size-8 text-muted-foreground/40" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>

                        {/* Upload Instructions */}
                        <div className="flex-1 min-w-0">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-foreground">
                              {imagePreview
                                ? "Image uploaded"
                                : "Upload an icon"}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {imagePreview
                                ? "Click the X to remove or drag a new image to replace."
                                : `Drag and drop or click to upload. Accepts ${ACCEPTED_IMAGE_FORMATS.join(", ").toUpperCase()} up to ${MAX_FILE_SIZE_MB}MB.`}
                            </p>

                            <Input
                              type="file"
                              id="workspace-image"
                              accept={ACCEPTED_IMAGE_FORMATS.map(
                                (format) => `image/${format}`,
                              ).join(", ")}
                              className="hidden"
                              ref={inputRef}
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                handleImageChange(file, field.onChange);
                              }}
                            />

                            <Button
                              type="button"
                              variant={imagePreview? "secondary":"outline"}
                              size="sm"
                              className="mt-1 h-9 gap-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              <UploadIcon className="size-4" />
                              {imagePreview ? "Replace Image" : "Choose File"}
                            </Button>

                            {/* Upload status */}
                            {/* Upload status - Only show when image is selected AND preview exists */}
                            {field.value instanceof File && imagePreview && (
                              <div className="flex items-center gap-2 text-xs -mt-1 text-muted-foreground">
                                <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="truncate max-w-[200px]">
                                  Selected: {field.value.name}
                                </span>
                                <span className="text-xs">
                                  ({(field.value.size / 1024).toFixed(1)} KB)
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <FieldSeparator />

      <CardFooter className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            workspaceForm.reset();
            if (imagePreview) {
              URL.revokeObjectURL(imagePreview);
            }
            setImagePreview(null);
            onCancel?.();
          }}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="create-workspace-form"
          disabled={isSubmitting || !workspaceForm.formState.isValid}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardFooter>
    </Card>

    {/* Invite Members */}
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Invite Members</CardTitle>
        <CardDescription>
          Use the invite link to add members to your workspace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <Input disabled value={"fullInviteLink"} className="truncate"/>
            <Button type="button" size="icon-lg" variant="secondary" onClick={()=>{}}>
              <CopyIcon className="size-4"/>
            </Button>
          </div>
        </div>
          <Button type="button" size="sm" variant="destructive" className="w-fit" onClick={()=>{}}
            // disabled={isSubmitting}
            >Reset Invite Link</Button>

            {/* After reset button lcick on sucess clcik get the new code and router .refesh the page so that i get the ne code */}
      </CardContent>
    </Card>

     {/* Delete workspace */}
      <Card className=" w-full">
<CardHeader>
  <CardTitle className="font-bold">Delete Zone</CardTitle>
  <CardDescription>
Deleting a workspace is irreversible and will remove all associated data.  </CardDescription>
</CardHeader>
<CardContent className="flex justify-end">
  {/* TODO
  : will add a conformation MODAL */}
  <Button type="button" size="sm" variant="destructive" className="w-fit" onClick={()=>{router.push(`/workspaces/${initialValues?.image}`)}}>Delete Workspace</Button>
</CardContent>
      </Card>
      </div>
  );
}

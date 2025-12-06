"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
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

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
  onSubmitWorkspaceForm?: (values: WorkspaceFormType) => void;
}

const workspaceFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(36, "Name must be at most 36 characters"),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});

type WorkspaceFormType = z.infer<typeof workspaceFormSchema>;

// This component is built using shadcn/ui (Field Component), React Hook Form, and Zod v4.

export function CreateWorkspaceForm({
  onCancel,
  onSubmitWorkspaceForm,
}: CreateWorkspaceFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const workspaceForm = useForm<WorkspaceFormType>({
    resolver: zodResolver(workspaceFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      image: "",
    },
  });

  function onSubmit(values: WorkspaceFormType) {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    console.log("Workspace Form Values ::", finalValues);
    onSubmitWorkspaceForm?.(finalValues);
    toast.success("Workspace created successfully!");
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Create Workspace</CardTitle>
        <CardDescription>Enter workspace details below.</CardDescription>
      </CardHeader>

      <FieldSeparator />

      <CardContent>
        <form
          id="form-rhf-demo"
          onSubmit={workspaceForm.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="name"
              control={workspaceForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-name">
                    Workspace Name
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      type="text"
                      id="form-rhf-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Workspace Name"
                      autoComplete="on"
                      required
                    />
                    <FieldDescription>
                      Choose a unique workspace name.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="image"
              control={workspaceForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-image">
                    Workspace Image
                  </FieldLabel>
                  <FieldContent>
                    <div className="flex items-center gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md overflow-hidden">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              alt={`${field.name} Workspace Image`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-primary/15" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-xs text-muted-foreground">
                            Accepts{" "}
                            <strong>{ACCEPTED_IMAGE_FORMATS.join(", ")}</strong>{" "}
                            up to <strong>{MAX_FILE_SIZE_MB}</strong> MB.
                          </p>
                          <Input
                            type="file"
                            accept={ACCEPTED_IMAGE_FORMATS.map(
                              (format) => `image/${format}`,
                            ).join(", ")}
                            className="hidden"
                            ref={inputRef}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (
                                  file.size >
                                  MAX_FILE_SIZE_MB * 1024 * 1024
                                ) {
                                  toast.error(
                                    `Image must be less than ${MAX_FILE_SIZE_MB}MB`,
                                  );
                                  return;
                                }
                                field.onChange(file);
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-fit mt-2"
                            onClick={() => inputRef.current?.click()}
                          >
                            Upload Image
                          </Button>
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

      <CardFooter className="flex justify-end gap-2">
        <Button
          type="button"
          size="lg"
          variant="outline"
          onClick={() => {
            workspaceForm.reset();
            onCancel?.();
          }}
        >
          Cancel
        </Button>
        <Button type="submit" size="lg" form="form-rhf-demo">
          Create Workspace
        </Button>
      </CardFooter>
    </Card>
  );
}

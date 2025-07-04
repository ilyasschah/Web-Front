import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField as RHFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string | number; label: string }[];
}

interface FormModalProps {
  title: string;
  fields: FormField[];
  onSubmit: (data: any) => void;
  onClose: () => void;
  open?: boolean;
  initialData?: Record<string, any>;
  error?: string;
  isOpen?: boolean;
  onCancel?: () => void;
}

const FormModal = ({
  title = "Add Item",
  fields = [],
  onSubmit = () => {},
  onClose = () => {},
  onCancel = () => {},
  open = true,
  isOpen = true,
  initialData = {},
  error = "",
}: FormModalProps) => {
  // Dynamically create schema based on fields
  const generateSchema = () => {
    const schema: Record<string, any> = {};

    fields.forEach((field) => {
      let fieldSchema = z.string();

      if (field.required) {
        fieldSchema = fieldSchema.min(1, {
          message: `${field.label} is required`,
        });
      } else {
        fieldSchema = fieldSchema.optional();
      }

      if (field.type === "email") {
        fieldSchema = z.string().email({ message: "Invalid email address" });
        if (!field.required) fieldSchema = fieldSchema.optional();
      }

      if (field.type === "number") {
        fieldSchema = z.coerce.number({
          required_error: `${field.label} is required`,
          invalid_type_error: `${field.label} must be a number`,
        });
        if (!field.required) fieldSchema = fieldSchema.optional();
      }

      schema[field.name] = fieldSchema;
    });

    return z.object(schema);
  };

  const formSchema = generateSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  // Reset form when initialData changes
  React.useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
  };

  const handleClose = () => {
    onClose();
    if (onCancel) onCancel();
  };

  return (
    <Dialog
      open={open || isOpen}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
    >
      <DialogContent className="sm:max-w-[500px] bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {fields.map((field) => (
              <RHFormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "select" ? (
                        <Select
                          onValueChange={formField.onChange}
                          defaultValue={formField.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={`Select a ${field.label.toLowerCase()}`}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options &&
                              field.options.map((opt) => (
                                <SelectItem
                                  key={opt.value}
                                  value={String(opt.value)}
                                >
                                  {opt.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          {...formField}
                          type={field.type}
                          placeholder={field.placeholder}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Show backend error here if exists */}
            {error && (
              <div className="text-red-600 text-sm mb-2 text-center p-3 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
export type { FormField, FormModalProps };

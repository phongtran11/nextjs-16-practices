"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Link, useRouter } from "@/i18n/routing";
import { authClient } from "@/lib/auth-client";

export function RegisterForm() {
  const t = useTranslations("Auth.register");
  const tValid = useTranslations("Auth.validation");
  const tError = useTranslations("Auth.Errors");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const registerSchema = z.object({
    name: z.string().min(2, { message: tValid("minName") }),
    email: z.email({ message: tValid("email") }),
    password: z.string().min(8, { message: tValid("minPassword") }),
  });

  type RegisterFormValues = z.infer<typeof registerSchema>;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setError(null);
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
          router.refresh();
        },
        onError: (ctx) => {
          const errorCode = ctx.error.code;
          if (errorCode && tError.has(errorCode)) {
            setError(tError(errorCode));
          } else {
            setError(ctx.error.message);
          }
        },
      }
    );
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("placeholderName")}
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("placeholderEmail")}
                      type="email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <div className="text-sm text-red-500">{error}</div>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 my-3">
            <LoadingButton
              className="w-full"
              type="submit"
              loading={isSubmitting}
            >
              {isSubmitting ? t("submitting") : t("submit")}
            </LoadingButton>
            <div className="mt-4 text-center text-sm">
              {t("hasAccount")}{" "}
              <Link href="/login" className="underline">
                {t("login")}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

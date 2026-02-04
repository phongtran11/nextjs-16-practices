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

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo = "/dashboard" }: LoginFormProps) {
  const t = useTranslations("Auth.login");
  const tValid = useTranslations("Auth.validation");
  const tError = useTranslations("Auth.Errors");

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const loginSchema = z.object({
    email: z.email({ message: tValid("email") }),
    password: z.string().min(1, { message: tValid("required") }),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError(null);
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push(redirectTo);
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("placeholderEmail")}
                      autoComplete="email"
                      type="email"
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
              {t("noAccount")}{" "}
              <Link href="/register" className="underline">
                {t("register")}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

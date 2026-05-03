"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../common/Button/Button";
import { Input } from "../common/Input/Input";

const searchSchema = z.object({
  query: z
    .string()
    .min(1, { message: "入力は必須です" })
    .regex(/^[A-Za-z0-9_.-]+$/, {
      message: "半角英数字・_ . - のみ入力できます",
    }),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export type SearchProps = {
  onSearch: (query: string) => void;
  className?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  inputTextColorHex?: string;
  buttonClassName?: string;
  buttonBgClass?: string;
  buttonHoverBgClass?: string;
  buttonTextColorClass?: string;
  buttonTextSizeClass?: string;
  buttonPaddingClass?: string;
  buttonBgColorHex?: string;
  buttonHoverBgColorHex?: string;
  buttonTextColorHex?: string;
  buttonLabel?: string;
  defaultQuery?: string;
};

export const Search = ({
  onSearch,
  className = "flex w-full items-start gap-2",
  inputWrapperClassName = "flex-1",
  inputClassName,
  inputTextColorHex,
  buttonClassName,
  buttonBgClass,
  buttonHoverBgClass,
  buttonTextColorClass,
  buttonTextSizeClass,
  buttonPaddingClass,
  buttonBgColorHex,
  buttonHoverBgColorHex,
  buttonTextColorHex,
  buttonLabel = "検索",
  defaultQuery = "",
}: SearchProps) => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: defaultQuery },
    mode: "onChange",
  });

  const prevDefaultQueryRef = useRef(defaultQuery);

  useEffect(() => {
    if (defaultQuery) {
      void trigger("query");
    }
  }, [defaultQuery, trigger]);

  useEffect(() => {
    if (prevDefaultQueryRef.current === defaultQuery) {
      return;
    }

    reset({ query: defaultQuery });
    prevDefaultQueryRef.current = defaultQuery;

    if (defaultQuery) {
      void trigger("query");
    }
  }, [defaultQuery, reset, trigger]);

  return (
    <form
      className={className}
      onSubmit={handleSubmit(({ query }) => {
        onSearch(query);
      })}
    >
      <label className="sr-only" htmlFor="search-query">
        検索クエリ
      </label>
      <div className={inputWrapperClassName}>
        <Input
          id="search-query"
          placeholder="Repository..."
          autoComplete="off"
          error={errors.query}
          className={inputClassName}
          textColorHex={inputTextColorHex}
          {...register("query")}
        />
      </div>
      <Button
        type="submit"
        bgClass={buttonBgClass}
        hoverBgClass={buttonHoverBgClass}
        textColorClass={buttonTextColorClass}
        textSizeClass={buttonTextSizeClass}
        paddingClass={buttonPaddingClass}
        bgColorHex={buttonBgColorHex}
        hoverBgColorHex={buttonHoverBgColorHex}
        textColorHex={buttonTextColorHex}
        className={["h-[42px] shrink-0", buttonClassName]
          .filter(Boolean)
          .join(" ")}
        disabled={!isValid || isSubmitting}
      >
        {buttonLabel}
      </Button>
    </form>
  );
};

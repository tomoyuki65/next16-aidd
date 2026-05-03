import {
  TitleLogo,
  type TitleLogoProps,
} from "@/components/TitleLogo/TitleLogo";

export type HeaderProps = {
  backgroundColorHex?: string;
  titleLogoProps?: TitleLogoProps;
};

export const Header = ({ backgroundColorHex, titleLogoProps }: HeaderProps) => {
  const mergedTitleLogoProps: TitleLogoProps = {
    backgroundColor: "transparent",
    ...titleLogoProps,
  };

  return (
    <header
      className="h-14 w-full bg-gray-200 px-4 sm:h-16 sm:px-6"
      style={
        backgroundColorHex ? { backgroundColor: backgroundColorHex } : undefined
      }
    >
      <div className="mx-auto flex h-full w-full max-w-6xl items-center">
        <TitleLogo {...mergedTitleLogoProps} />
      </div>
    </header>
  );
};

import { Button } from "@/components/ui/button";
import { demoCtaFlag } from "@/flags";
import { redirect } from "next/navigation";

export async function ThemedButton(props: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  href?: string;
  type?: "submit" | "button";
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}) {
  const themeFlag = await demoCtaFlag();

  const button = (
    <Button
      id={props.id}
      size={props.size ?? themeFlag.size}
      variant={props.variant ?? themeFlag.variant}
      className={props.className}
      type={props.type}
    >
      {props.children}
    </Button>
  );
  if (props.href) {
    return (
      <form
        action={async () => {
          "use server";
          redirect(props.href as string);
        }}
      >
        {button}
      </form>
    );
  }
  return button;
}

"use client";
import { Tabs } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function TabNavigation({
  initialTab,
  children,
}: {
  initialTab: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [tab, setTab] = useState(initialTab);
  const onValueChange = useCallback(
    (value: string) => {
      setTab(value);
      router.push(`?tab=${value}`);
    },
    [router]
  );
  return (
    <Tabs defaultValue={tab} className="w-full" onValueChange={onValueChange}>
      {children}
    </Tabs>
  );
}

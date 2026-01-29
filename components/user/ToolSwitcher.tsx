import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ToolSwitcherProps {
  onValueChange: (value: string) => void;
}

export default function ToolSwitcher({ onValueChange }: ToolSwitcherProps) {
  return (
    <div className="flex w-full justify-center">
      <Tabs
        defaultValue="URL"
        onValueChange={onValueChange}
        className="w-full max-w-[320px]"
      >
        <TabsList className="grid w-full grid-cols-2 h-11 bg-background-light/50 dark:bg-background-dark/50 p-1">
          <TabsTrigger
            value="URL"
            className="rounded-md p-2 text-sm font-bold "
          >
            URL Shortener
          </TabsTrigger>
          <TabsTrigger
            value="QR "
            className="rounded-md p-2 text-sm font-bold "
          >
            QR Generator
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

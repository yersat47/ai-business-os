"use client";

import { FileText, BarChart3, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const typeIcons: Record<string, React.ElementType> = {
  document: FileText,
  report: BarChart3,
  process: GitBranch,
};

interface DocumentCardProps {
  title: string;
  type: string;
  date: string;
  category: string;
}

export function DocumentCard({
  title,
  type,
  date,
  category,
}: DocumentCardProps) {
  const Icon = typeIcons[type] ?? FileText;

  return (
    <div className="rounded-xl border border-border bg-surface p-4 hover:border-border-bright transition-colors">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{title}</h4>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-[10px]">
              {category}
            </Badge>
            <span className="text-[10px] text-text-muted">{date}</span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="w-full mt-3"
        onClick={() =>
          toast({
            title: "Document preview",
            description: "Full document viewer available in the next release.",
          })
        }
      >
        View
      </Button>
    </div>
  );
}

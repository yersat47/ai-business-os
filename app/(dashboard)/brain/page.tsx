"use client";

import Link from "next/link";
import { AlertTriangle, Upload } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ScoreRing } from "@/components/shared/ScoreRing";
import { DocumentCard } from "@/components/brain/DocumentCard";
import { Button } from "@/components/ui/button";
import { MOCK_BRAIN } from "@/lib/mock/mock-brain";
import { toast } from "@/hooks/use-toast";

export default function BrainPage() {
  const showToast = () =>
    toast({
      title: "Upload",
      description:
        "File upload available after AI connection is configured.",
    });

  return (
    <DashboardShell title="Company Brain">
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center">
            <ScoreRing
              score={MOCK_BRAIN.coveragePct}
              size="lg"
              color="#C9923A"
              animated
            />
            <p className="text-text-secondary mt-4 text-center">
              Brain coverage — {MOCK_BRAIN.coveragePct}% populated
            </p>
            <p className="text-sm text-text-muted mt-1">
              {MOCK_BRAIN.documentsCount} documents ·{" "}
              {MOCK_BRAIN.knowledgeItemsCount} knowledge items
            </p>
          </div>
          <div className="space-y-4">
            {MOCK_BRAIN.categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{cat.name}</span>
                  <span className="text-text-muted">{cat.count} items</span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Recent knowledge</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {MOCK_BRAIN.recentItems.map((item) => (
              <DocumentCard key={item.title} {...item} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Brain gaps
          </h3>
          <div className="space-y-3">
            {MOCK_BRAIN.missingAreas.map((area) => (
              <div
                key={area}
                className="flex items-center justify-between rounded-xl border border-warning/20 bg-warning/5 p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-warning" />
                  <span className="text-sm">{area}</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/data">Add data</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-8">
          <h3 className="font-semibold text-lg mb-4">Add to Company Brain</h3>
          <div
            className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-accent transition-colors mb-6"
            onClick={showToast}
          >
            <Upload className="h-8 w-8 text-text-muted mx-auto mb-3" />
            <p className="text-text-secondary text-sm">
              Drag and drop files here, or click to browse
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Add document", "Add process", "Add decision", "Add rule"].map(
              (label) => (
                <Button key={label} variant="outline" onClick={showToast}>
                  {label}
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

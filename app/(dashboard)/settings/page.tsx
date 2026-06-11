"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useCompanyStore } from "@/lib/stores/company.store";
import { MOCK_AGENTS } from "@/lib/mock/mock-agents";
import type { UserRole } from "@/lib/types/company.types";
import { toast } from "@/hooks/use-toast";

const roles: UserRole[] = [
  "owner",
  "manager",
  "marketer",
  "accountant",
  "salesperson",
  "smm",
  "administrator",
];

const notifications = [
  "Daily briefing",
  "Health alerts",
  "Profit opportunities",
  "Team updates",
];

const plans = [
  { name: "Starter", price: "Free Trial", features: ["6 AI agents", "Health Score", "Basic Brain"] },
  { name: "Pro", price: "$49/mo", features: ["All Starter", "Integrations", "Advanced analytics"] },
  { name: "Enterprise", price: "Custom", features: ["All Pro", "Custom agents", "Priority support"] },
];

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const setRole = useAuthStore((s) => s.setRole);
  const company = useCompanyStore((s) => s.company);
  const updateCompany = useCompanyStore((s) => s.updateCompany);

  const save = () =>
    toast({ title: "Saved", description: "Your changes have been saved." });

  return (
    <DashboardShell title="Settings">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="ai-team">AI Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="rounded-2xl border border-border bg-surface p-6 max-w-lg space-y-4">
            <div>
              <Label>Name</Label>
              <Input className="mt-1.5" defaultValue={user?.name ?? "Ersat"} />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                className="mt-1.5"
                defaultValue={user?.email ?? "ersat@urbanmode.kz"}
              />
            </div>
            <div>
              <Label>Role</Label>
              <Input
                className="mt-1.5"
                value="Owner"
                readOnly
                disabled
              />
            </div>
            <div>
              <Label>View as role (demo)</Label>
              <Select
                value={user?.role ?? "owner"}
                onValueChange={(v) => setRole(v as UserRole)}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-text-muted mt-1">
                Switch roles to preview role-based navigation and data visibility.
              </p>
            </div>
            <Button variant="bronze" onClick={save}>
              Save changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="company">
          <div className="rounded-2xl border border-border bg-surface p-6 max-w-lg space-y-4">
            <div>
              <Label>Company name</Label>
              <Input
                className="mt-1.5"
                value={company.name}
                onChange={(e) => updateCompany({ name: e.target.value })}
              />
            </div>
            <div>
              <Label>Industry</Label>
              <Input
                className="mt-1.5"
                value={company.industry}
                onChange={(e) => updateCompany({ industry: e.target.value })}
              />
            </div>
            <div>
              <Label>City</Label>
              <Input
                className="mt-1.5"
                value={company.city}
                onChange={(e) => updateCompany({ city: e.target.value })}
              />
            </div>
            <div>
              <Label>Sales channels</Label>
              <p className="text-sm text-text-secondary mt-2">
                {company.salesChannels.join(", ")}
              </p>
            </div>
            <Button variant="bronze" onClick={save}>
              Save changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="ai-team">
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-4 max-w-lg">
            <p className="text-sm text-text-secondary mb-4">
              Deactivating an agent removes them from your AI Team and briefings.
            </p>
            {MOCK_AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between p-4 rounded-xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <span style={{ color: agent.color }}>{agent.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{agent.name}</p>
                    <p className="text-xs text-text-muted">{agent.role}</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-4 max-w-lg">
            {notifications.map((n) => (
              <div
                key={n}
                className="flex items-center justify-between py-2"
              >
                <span className="text-sm">{n}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="space-y-6">
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 flex items-center justify-between">
              <div>
                <p className="font-semibold">Current plan: Starter (Free Trial)</p>
                <p className="text-sm text-text-secondary mt-1">
                  Full access during trial period
                </p>
              </div>
              <Button
                variant="bronze"
                onClick={() =>
                  toast({
                    title: "Upgrade",
                    description: "Payment flow available in the next release.",
                  })
                }
              >
                Upgrade to Pro
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <h4 className="font-semibold">{plan.name}</h4>
                  <p className="text-accent font-mono mt-1 mb-4">{plan.price}</p>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="text-sm text-text-secondary flex items-center gap-2">
                        <Badge variant="accent" className="h-1.5 w-1.5 p-0 rounded-full" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}

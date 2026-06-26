import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { PORTFOLIO } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function expiryUrgent(isoDate: string) {
  const expiry = new Date(isoDate);
  const now = new Date();
  const days = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return days >= 0 && days <= 90;
}

export default function LeasesPage() {
  const leases = PORTFOLIO.sampleLeases ?? [PORTFOLIO.demoLease];

  return (
    <div className="flex min-h-dvh flex-col">
      <PageHeader
        title="Lease portfolio"
        description={`${leases.length} active tenancies from starter-kit listings`}
      />

      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="brand-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-left">
                    <th className="px-4 py-3 font-medium text-muted-foreground">ID</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Property</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">District</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Tenant</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Annual rent</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Ejari expiry</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leases.map((lease) => {
                    const urgent = expiryUrgent(lease.ejari_expiry);
                    return (
                      <tr
                        key={lease.listing_id}
                        className="border-b border-border/60 transition-colors hover:bg-muted/20"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                          {lease.listing_id}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          {lease.community}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{lease.district}</td>
                        <td className="px-4 py-3">{lease.tenant_name}</td>
                        <td className="px-4 py-3 tabular-nums">
                          AED {lease.price_aed.toLocaleString("en-AE")}
                        </td>
                        <td className="px-4 py-3 tabular-nums">
                          {lease.ejari_expiry_display}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant="outline"
                            className={cn(
                              urgent
                                ? "border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 text-[hsl(38,55%,35%)]"
                                : "border-primary/25 bg-primary/5 text-primary"
                            )}
                          >
                            {urgent ? "Renewal due" : lease.status.replace("_", " ")}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {PORTFOLIO.dataNotice}
          </p>
        </div>
      </main>
    </div>
  );
}

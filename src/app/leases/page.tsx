import { PageHeader } from "@/components/layout/page-header";
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
    <>
      <PageHeader
        title="Lease portfolio"
        description={`${leases.length} active tenancies from starter-kit listings`}
      />

      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-float">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr
                  className="border-b text-left"
                  style={{
                    borderColor: "var(--border-default)",
                    background: "var(--bg-inset)",
                  }}
                >
                  <th className="px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>ID</th>
                  <th className="px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>Property</th>
                  <th className="px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>District</th>
                  <th className="px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>Tenant</th>
                  <th className="px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>Annual rent</th>
                  <th className="px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>Ejari expiry</th>
                  <th className="px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leases.map((lease) => {
                  const urgent = expiryUrgent(lease.ejari_expiry);
                  return (
                    <tr
                      key={lease.listing_id}
                      className="border-b transition-colors hover:bg-[var(--bg-inset)]"
                      style={{ borderColor: "var(--border-default)" }}
                    >
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                        {lease.listing_id}
                      </td>
                      <td className="px-4 py-3 font-medium" style={{ color: "var(--text-primary)" }}>
                        {lease.community}
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{lease.district}</td>
                      <td className="px-4 py-3" style={{ color: "var(--text-primary)" }}>{lease.tenant_name}</td>
                      <td className="px-4 py-3 tabular-nums" style={{ color: "var(--text-primary)" }}>
                        AED {lease.price_aed.toLocaleString("en-AE")}
                      </td>
                      <td className="px-4 py-3 tabular-nums" style={{ color: "var(--text-secondary)" }}>
                        {lease.ejari_expiry_display}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex rounded-[var(--radius-pill)] border px-2 py-0.5 text-[0.7rem] font-medium",
                            urgent ? "ll-status-pending" : "ll-status-cleared"
                          )}
                        >
                          {urgent ? "Renewal due" : lease.status.replace("_", " ")}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-center text-[0.72rem]" style={{ color: "var(--text-muted)" }}>
          {PORTFOLIO.dataNotice}
        </p>
      </div>
    </>
  );
}

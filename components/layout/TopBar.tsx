import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";

export function TopBar() {
  return (
    <div className="hidden bg-brand-teal-900 text-white xl:block">
      <Container className="flex items-center justify-between gap-6 py-4 text-base">
        <span className="inline-flex min-w-0 shrink-0 items-center gap-2.5 whitespace-nowrap text-white/80">
          <MapPin className="h-5 w-5 shrink-0" />
          {siteConfig.address.line1}, {siteConfig.address.city}
        </span>
        <a
          href={`tel:${siteConfig.emergencyNumber}`}
          className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full bg-brand-orange-500/15 px-5 py-2 font-bold text-brand-orange-300 ring-1 ring-brand-orange-400/40 transition-colors hover:bg-brand-orange-500/25 hover:text-brand-orange-200"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-orange-400" />
          </span>
          Emergency (24×7): {siteConfig.emergencyNumber}
        </a>
      </Container>
    </div>
  );
}

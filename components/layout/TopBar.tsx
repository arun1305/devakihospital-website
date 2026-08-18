import { Phone, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";

export function TopBar() {
  return (
    <div className="hidden bg-brand-teal-900 text-white xl:block">
      <Container className="flex items-center justify-between gap-6 py-2 text-xs">
        <div className="flex min-w-0 items-center gap-6">
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-white/80">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {siteConfig.address.line1}, {siteConfig.address.city}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-white/80">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            OPD: Mon–Sat, 8:00 AM – 8:00 PM · Emergency: 24×7
          </span>
        </div>
        <a
          href={`tel:${siteConfig.emergencyNumber}`}
          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-semibold text-brand-orange-300 hover:text-brand-orange-200"
        >
          <Phone className="h-3.5 w-3.5 shrink-0" />
          Emergency: {siteConfig.emergencyNumber}
        </a>
      </Container>
    </div>
  );
}

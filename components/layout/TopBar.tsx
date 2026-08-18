import { Phone, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";

export function TopBar() {
  return (
    <div className="hidden bg-brand-teal-900 text-white lg:block">
      <Container className="flex items-center justify-between py-2 text-xs">
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-1.5 text-white/80">
            <MapPin className="h-3.5 w-3.5" />
            {siteConfig.address.line1}, {siteConfig.address.city}
          </span>
          <span className="inline-flex items-center gap-1.5 text-white/80">
            <Clock className="h-3.5 w-3.5" />
            OPD: Mon–Sat, 8:00 AM – 8:00 PM · Emergency: 24×7
          </span>
        </div>
        <a
          href={`tel:${siteConfig.emergencyNumber}`}
          className="inline-flex items-center gap-1.5 font-semibold text-brand-orange-300 hover:text-brand-orange-200"
        >
          <Phone className="h-3.5 w-3.5" />
          Emergency: {siteConfig.emergencyNumber}
        </a>
      </Container>
    </div>
  );
}

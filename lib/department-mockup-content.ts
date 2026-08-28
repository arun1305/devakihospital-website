export type MockupBehavior = "heartbeat" | "breathe" | "rotate" | "rings" | "drip" | "sparkle" | "bounce";

const behaviorMap: Record<string, MockupBehavior> = {
  "accident-emergency": "rings",
  anaesthesiology: "drip",
  "bariatric-surgery": "bounce",
  cardiology: "heartbeat",
  "cardiothoracic-vascular-surgery": "heartbeat",
  "critical-care-toxicology": "breathe",
  dental: "sparkle",
  diabetology: "drip",
  ent: "rings",
  "family-medicine": "breathe",
  gastroenterology: "bounce",
  "general-medicine": "heartbeat",
  "general-surgery": "bounce",
  "imaging-sciences-interventional-radiology": "rotate",
  "medical-oncology": "drip",
  nephrology: "drip",
  neurology: "rings",
  "neuro-surgery": "rotate",
  "obstetrics-gynaecology": "heartbeat",
  orthopaedics: "bounce",
  "pediatric-surgery": "heartbeat",
  pharmacy: "bounce",
  "psychiatric-counselling": "rings",
  "physical-medicine-rehabilitation": "bounce",
  "preventive-medicine": "breathe",
  pulmonology: "breathe",
  "radiation-oncology": "rotate",
  "surgical-gastroenterology": "bounce",
  "surgical-oncology": "rotate",
  urology: "drip",
  "vascular-surgery": "rings",
};

export function getMockupBehavior(slug: string): MockupBehavior {
  return behaviorMap[slug] ?? "breathe";
}

export type MockupWidget = "ecg" | "eeg" | "scan" | "bars" | "grid";

interface MockupContent {
  widget: MockupWidget;
  stat1: { value: string; label: string };
  stat2: { value: string; label: string };
}

const cardiacVascular: MockupContent = {
  widget: "ecg",
  stat1: { value: "72 BPM", label: "Resting Heart Rate" },
  stat2: { value: "Cath Lab", label: "Ready 24×7" },
};

const neuro: MockupContent = {
  widget: "eeg",
  stat1: { value: "Alert", label: "EEG Pattern" },
  stat2: { value: "Neuro ICU", label: "On Standby" },
};

const imaging: MockupContent = {
  widget: "scan",
  stat1: { value: "HD", label: "Scan Resolution" },
  stat2: { value: "Digital", label: "Imaging Suite" },
};

const oncology: MockupContent = {
  widget: "scan",
  stat1: { value: "Day Care", label: "Chemo Unit" },
  stat2: { value: "Tumour", label: "Board Reviewed" },
};

const mobility: MockupContent = {
  widget: "bars",
  stat1: { value: "Mobility+", label: "Recovery Track" },
  stat2: { value: "Rehab", label: "Support Team" },
};

const sensory: MockupContent = {
  widget: "bars",
  stat1: { value: "Clear", label: "Diagnostic Result" },
  stat2: { value: "Same-Day", label: "Appointments" },
};

const generalCare: MockupContent = {
  widget: "grid",
  stat1: { value: "24×7", label: "Care Availability" },
  stat2: { value: "Expert", label: "Consultant Team" },
};

const surgicalGI: MockupContent = {
  widget: "grid",
  stat1: { value: "OT Ready", label: "Modular Theatre" },
  stat2: { value: "Same-Day", label: "Discharge Track" },
};

const contentMap: Record<string, MockupContent> = {
  cardiology: cardiacVascular,
  "cardiothoracic-vascular-surgery": cardiacVascular,
  "critical-care-toxicology": cardiacVascular,
  "vascular-surgery": cardiacVascular,
  "accident-emergency": cardiacVascular,

  neurology: neuro,
  "neuro-surgery": neuro,
  "psychiatric-counselling": neuro,
  anaesthesiology: neuro,

  "imaging-sciences-interventional-radiology": imaging,
  "radiation-oncology": imaging,
  pulmonology: imaging,
  "medical-oncology": oncology,
  "surgical-oncology": oncology,

  orthopaedics: mobility,
  "physical-medicine-rehabilitation": mobility,
  "bariatric-surgery": mobility,

  ent: sensory,
  dental: sensory,

  "general-medicine": generalCare,
  "family-medicine": generalCare,
  "preventive-medicine": generalCare,
  diabetology: generalCare,
  pharmacy: generalCare,

  "general-surgery": surgicalGI,
  gastroenterology: surgicalGI,
  "surgical-gastroenterology": surgicalGI,
  urology: surgicalGI,
  nephrology: surgicalGI,
  "obstetrics-gynaecology": surgicalGI,
  "pediatric-surgery": surgicalGI,
};

export function getMockupContent(slug: string): MockupContent {
  return contentMap[slug] ?? generalCare;
}

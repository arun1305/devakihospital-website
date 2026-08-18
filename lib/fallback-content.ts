import type {
  Department,
  Doctor,
  Testimonial,
  InsurancePartner,
  Accreditation,
  BlogPost,
  NewsPost,
  EventItem,
  HealthPackage,
  GalleryAlbum,
  JobListing,
  Award,
} from "@/types";

/**
 * Static content shown when the CMS API is unreachable (e.g. first-run before
 * the backend is deployed/seeded) so the site never renders empty sections.
 * Live data from MongoDB always takes precedence once the API responds.
 */

export const fallbackDepartments: Department[] = [
  {
    _id: "fallback-cardiology",
    name: "Cardiology",
    slug: "cardiology",
    shortDescription:
      "Comprehensive heart care spanning preventive cardiology to advanced interventional and surgical procedures.",
    overview:
      "The Cardiology unit at Devaki Speciality Hospital brings together interventional cardiologists, cardiac surgeons, and a dedicated cath lab team to diagnose and treat conditions ranging from hypertension to complex coronary artery disease.",
    treatments: [
      "Angioplasty & Stenting",
      "Bypass Surgery (CABG)",
      "Pacemaker Implantation",
      "Electrophysiology Studies",
      "Heart Failure Management",
      "Preventive Cardiology Screening",
    ],
    facilities: ["24/7 Cath Lab", "Cardiac ICU", "Non-Invasive Cardiology Lab", "Cardiac Rehabilitation Centre"],
    technology: ["Biplane Cath Lab", "3D Echocardiography", "TMT & Holter Monitoring", "Coronary CT Angiography"],
    faqs: [
      {
        question: "How soon can I get an appointment with a cardiologist?",
        answer:
          "Most patients are seen within 24-48 hours; emergency chest pain cases are triaged immediately through Emergency.",
      },
      {
        question: "Do you offer painless angioplasty?",
        answer: "Yes, our cath lab uses radial-access techniques that reduce discomfort and recovery time.",
      },
    ],
    doctors: [],
    contactPhone: "+91-44-6000-2101",
    contactEmail: "cardiology@devakihospital.com",
    order: 1,
  },
  {
    _id: "fallback-neurology",
    name: "Neurology",
    slug: "neurology",
    shortDescription:
      "Advanced diagnosis and management of brain, spine, and nervous system disorders by a multidisciplinary team.",
    overview:
      "Our Neurology department manages the full spectrum of neurological conditions, from stroke and epilepsy to movement disorders, supported by a dedicated stroke unit and neuro-rehabilitation program.",
    treatments: ["Stroke Management", "Epilepsy Care", "Movement Disorder Treatment", "Neuro-rehabilitation"],
    facilities: ["Stroke Unit", "EEG & EMG Lab", "Neuro ICU"],
    technology: ["3T MRI Neuro Imaging", "Digital EEG", "Nerve Conduction Studies"],
    faqs: [],
    doctors: [],
    contactPhone: "+91-44-6000-2102",
    contactEmail: "neurology@devakihospital.com",
    order: 2,
  },
  {
    _id: "fallback-orthopaedics",
    name: "Orthopaedics",
    slug: "orthopaedics",
    shortDescription: "Joint replacement, sports injury, and trauma care delivered with precision surgical technique.",
    overview:
      "The Orthopaedics team specialises in joint replacement, arthroscopic sports medicine, spine care, and trauma reconstruction, supported by dedicated physiotherapy.",
    treatments: ["Total Knee & Hip Replacement", "Arthroscopy", "Spine Surgery", "Fracture Management"],
    facilities: ["Modular Operation Theatres", "Physiotherapy & Rehab Centre"],
    technology: ["Computer-Assisted Navigation Surgery", "C-Arm Imaging"],
    faqs: [],
    doctors: [],
    contactPhone: "+91-44-6000-2103",
    contactEmail: "orthopaedics@devakihospital.com",
    order: 3,
  },
  {
    _id: "fallback-gastro",
    name: "Gastroenterology",
    slug: "gastroenterology",
    shortDescription: "End-to-end digestive and liver care with advanced endoscopic diagnostics.",
    overview:
      "Our Gastroenterology team manages liver disease, inflammatory bowel disease, and GI cancers with advanced endoscopy and a dedicated day-care unit.",
    treatments: ["Endoscopy & Colonoscopy", "ERCP", "Liver Disease Management", "IBD Care"],
    facilities: ["Endoscopy Suite", "Day-Care Procedure Unit"],
    technology: ["High-Definition Endoscopy", "FibroScan"],
    faqs: [],
    doctors: [],
    contactPhone: "+91-44-6000-2104",
    contactEmail: "gastro@devakihospital.com",
    order: 4,
  },
  {
    _id: "fallback-oncology",
    name: "Oncology",
    slug: "oncology",
    shortDescription: "Multidisciplinary cancer care combining surgical, medical, and supportive oncology.",
    overview:
      "The Oncology team coordinates surgical, medical, and supportive care through a tumour board approach, tailoring treatment plans to each patient.",
    treatments: ["Chemotherapy", "Surgical Oncology", "Palliative & Supportive Care"],
    facilities: ["Day-Care Chemotherapy Unit", "Tumour Board"],
    technology: ["PET-CT Access Network", "Precision Diagnostics"],
    faqs: [],
    doctors: [],
    contactPhone: "+91-44-6000-2105",
    contactEmail: "oncology@devakihospital.com",
    order: 5,
  },
  {
    _id: "fallback-pediatrics",
    name: "Pediatrics",
    slug: "pediatrics",
    shortDescription: "Newborn, child, and adolescent care with a dedicated NICU and PICU.",
    overview:
      "Our Pediatrics department covers routine child health through critical newborn and paediatric intensive care, with a warm, child-friendly environment.",
    treatments: ["Newborn Care", "Vaccination Programs", "Paediatric Critical Care"],
    facilities: ["NICU", "PICU", "Child-friendly OPD"],
    technology: ["Neonatal Monitoring Systems"],
    faqs: [],
    doctors: [],
    contactPhone: "+91-44-6000-2106",
    contactEmail: "pediatrics@devakihospital.com",
    order: 6,
  },
];

export const fallbackDoctors: Doctor[] = [
  {
    _id: "fallback-doc-1",
    name: "Dr. Anjali Krishnan",
    slug: "dr-anjali-krishnan",
    gender: "female",
    departments: ["fallback-cardiology"],
    designation: "Senior Consultant Interventional Cardiologist",
    qualifications: ["MBBS", "MD (Internal Medicine)", "DM (Cardiology)"],
    experienceYears: 16,
    languages: ["English", "Tamil", "Hindi"],
    specializations: ["Interventional Cardiology", "Structural Heart Disease"],
    biography:
      "Dr. Anjali Krishnan has led over 4,000 catheterisation procedures and specialises in complex coronary interventions.",
    publications: [],
    research: [],
    awards: [],
    schedule: [],
    featured: true,
  },
  {
    _id: "fallback-doc-2",
    name: "Dr. Rahul Menon",
    slug: "dr-rahul-menon",
    gender: "male",
    departments: ["fallback-neurology"],
    designation: "Consultant Neurologist",
    qualifications: ["MBBS", "MD (Neurology)"],
    experienceYears: 12,
    languages: ["English", "Malayalam", "Tamil"],
    specializations: ["Stroke Medicine", "Epilepsy"],
    biography: "Dr. Rahul Menon heads the stroke unit and has driven significant improvement in emergency stroke response times.",
    publications: [],
    research: [],
    awards: [],
    schedule: [],
    featured: true,
  },
  {
    _id: "fallback-doc-3",
    name: "Dr. Priya Sundaram",
    slug: "dr-priya-sundaram",
    gender: "female",
    departments: ["fallback-orthopaedics"],
    designation: "Senior Consultant Orthopaedic Surgeon",
    qualifications: ["MBBS", "MS (Orthopaedics)", "Fellowship in Joint Replacement"],
    experienceYears: 14,
    languages: ["English", "Tamil"],
    specializations: ["Joint Replacement", "Sports Medicine"],
    biography: "Dr. Priya Sundaram has performed over 2,500 joint replacement surgeries with rapid-recovery protocols.",
    publications: [],
    research: [],
    awards: [],
    schedule: [],
    featured: true,
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    _id: "fallback-t1",
    patientName: "S. Ramachandran",
    rating: 5,
    message:
      "The cardiac team at Devaki gave my father a second chance at life. The care from admission to recovery was exceptional.",
    featured: true,
  },
  {
    _id: "fallback-t2",
    patientName: "Meena Iyer",
    rating: 5,
    message: "Every staff member, from the nurses to the consultants, treated us with warmth and honesty throughout.",
    featured: true,
  },
  {
    _id: "fallback-t3",
    patientName: "Arjun Vellore",
    rating: 5,
    message: "Transparent billing, attentive doctors, and a genuinely comforting environment for my elderly mother.",
    featured: true,
  },
];

export const fallbackInsurancePartners: InsurancePartner[] = [
  { _id: "ins-1", name: "Star Health", logo: "/placeholders/insurance-star.svg" },
  { _id: "ins-2", name: "HDFC Ergo", logo: "/placeholders/insurance-hdfc.svg" },
  { _id: "ins-3", name: "ICICI Lombard", logo: "/placeholders/insurance-icici.svg" },
  { _id: "ins-4", name: "Care Health", logo: "/placeholders/insurance-care.svg" },
  { _id: "ins-5", name: "Niva Bupa", logo: "/placeholders/insurance-niva.svg" },
];

export const fallbackAccreditations: Accreditation[] = [
  { _id: "acc-1", name: "NABH Accredited", logo: "/placeholders/accreditation-nabh.svg" },
  { _id: "acc-2", name: "ISO 9001:2015", logo: "/placeholders/accreditation-iso.svg" },
  { _id: "acc-3", name: "NABL Certified Lab", logo: "/placeholders/accreditation-nabl.svg" },
];

export const fallbackBlogs: BlogPost[] = [
  {
    _id: "fallback-blog-1",
    title: "Five Early Warning Signs of Heart Disease You Shouldn't Ignore",
    slug: "early-warning-signs-heart-disease",
    excerpt:
      "Chest discomfort isn't the only signal. Our cardiology team explains the subtler symptoms that often get missed.",
    content:
      "Heart disease rarely announces itself with a single dramatic symptom. In our cardiology outpatient clinic, we frequently see patients who dismissed early signs — unusual fatigue, shortness of breath on mild exertion, or a racing heartbeat at rest — for months before seeking care.\n\nWatch for: persistent fatigue disproportionate to activity, shortness of breath during routine tasks, swelling in the ankles or legs, irregular heartbeat, and jaw or back pain during exertion. If you notice any combination of these, a preventive cardiology screening can catch problems early, when they're most treatable.",
    category: "Cardiology",
    tags: ["Heart Health", "Prevention"],
    readingTimeMinutes: 4,
    publishedAt: "2026-06-12",
    createdAt: "2026-06-12",
  },
  {
    _id: "fallback-blog-2",
    title: "Understanding Joint Pain: When to See an Orthopaedic Specialist",
    slug: "when-to-see-orthopaedic-specialist",
    excerpt: "Not all joint pain needs surgery. Here's how our orthopaedic team decides on the right treatment path.",
    content:
      "Joint pain is one of the most common reasons patients delay care — often out of fear that any visit will end in a recommendation for surgery. In reality, most joint pain responds well to conservative treatment: physiotherapy, targeted injections, and activity modification.\n\nSee a specialist if pain persists beyond two weeks, limits your daily activities, or is accompanied by swelling, redness, or reduced range of motion. Early evaluation often means simpler, less invasive treatment.",
    category: "Orthopaedics",
    tags: ["Joint Health", "Orthopaedics"],
    readingTimeMinutes: 3,
    publishedAt: "2026-05-28",
    createdAt: "2026-05-28",
  },
  {
    _id: "fallback-blog-3",
    title: "A Parent's Guide to Childhood Vaccination Schedules",
    slug: "childhood-vaccination-schedule-guide",
    excerpt: "Our paediatric team breaks down what to expect at each stage of your child's immunisation journey.",
    content:
      "Keeping up with a vaccination schedule can feel overwhelming for new parents. Our paediatric team recommends keeping a physical or digital immunisation card, setting calendar reminders ahead of each due date, and using every well-child visit as an opportunity to confirm you're on track.\n\nIf a dose is delayed, it's rarely necessary to restart the schedule — talk to your paediatrician about catch-up options.",
    category: "Pediatrics",
    tags: ["Child Health", "Vaccination"],
    readingTimeMinutes: 5,
    publishedAt: "2026-05-10",
    createdAt: "2026-05-10",
  },
];

export const fallbackNews: NewsPost[] = [
  {
    _id: "fallback-news-1",
    title: "Devaki Speciality Hospital Launches Advanced Cath Lab",
    slug: "devaki-launches-advanced-cath-lab",
    summary: "A new biplane catheterisation lab expands our capacity for complex cardiac interventions.",
    content:
      "Devaki Speciality Hospital has commissioned a new biplane catheterisation lab, expanding capacity for complex coronary and structural heart interventions. The facility supports radial-access angioplasty, electrophysiology studies, and structural heart procedures under one roof.",
    category: "Facility Update",
    tags: ["Cardiology", "Infrastructure"],
    publishedAt: "2026-07-02",
    createdAt: "2026-07-02",
  },
  {
    _id: "fallback-news-2",
    title: "Devaki Hospital Recognised for Excellence in Patient Safety",
    slug: "devaki-recognised-patient-safety-excellence",
    summary: "Our quality and patient safety programs were recognised at this year's Regional Healthcare Excellence Awards.",
    content:
      "Devaki Speciality Hospital was recognised at the Regional Healthcare Excellence Awards for its patient safety protocols, infection control standards, and continuous quality improvement programs.",
    category: "Achievement",
    tags: ["Awards", "Quality"],
    publishedAt: "2026-04-18",
    createdAt: "2026-04-18",
  },
];

export const fallbackEvents: EventItem[] = [
  {
    _id: "fallback-event-1",
    title: "Free Cardiac Health Screening Camp",
    slug: "free-cardiac-health-screening-camp",
    description:
      "Join us for a free cardiac screening camp featuring ECG, blood pressure checks, and consultations with our cardiology team. Advance registration recommended as slots are limited.",
    startDate: "2026-09-14",
    location: "Devaki Speciality Hospital, Main Auditorium",
    registrationEnabled: true,
  },
  {
    _id: "fallback-event-2",
    title: "Diabetes Awareness & Management Workshop",
    slug: "diabetes-awareness-management-workshop",
    description:
      "A patient-focused workshop covering diet, exercise, and monitoring strategies for managing type 2 diabetes, led by our Diabetology and Nutrition teams.",
    startDate: "2026-08-05",
    endDate: "2026-08-05",
    location: "Devaki Speciality Hospital, Conference Hall",
    registrationEnabled: true,
  },
];

export const fallbackHealthPackages: HealthPackage[] = [
  {
    _id: "fallback-pkg-1",
    name: "Essential Health Checkup",
    slug: "essential-health-checkup",
    category: "General Wellness",
    price: 2499,
    discountedPrice: 1999,
    description: "A foundational screening covering blood work, blood pressure, BMI, and a physician consultation.",
    inclusions: ["Complete Blood Count", "Blood Sugar (Fasting)", "Lipid Profile", "Physician Consultation"],
    idealFor: ["Adults 25+", "Annual routine checkup"],
  },
  {
    _id: "fallback-pkg-2",
    name: "Comprehensive Cardiac Screening",
    slug: "comprehensive-cardiac-screening",
    category: "Cardiology",
    price: 6999,
    discountedPrice: 5499,
    description: "In-depth cardiac risk assessment including ECG, 2D Echo, and a cardiologist consultation.",
    inclusions: ["ECG", "2D Echocardiography", "Lipid Profile", "Cardiologist Consultation", "TMT (if indicated)"],
    idealFor: ["Adults 40+", "Family history of heart disease"],
  },
  {
    _id: "fallback-pkg-3",
    name: "Women's Wellness Package",
    slug: "womens-wellness-package",
    category: "Women's Health",
    price: 4999,
    discountedPrice: 3999,
    description: "A screening package tailored to women's health, covering hormonal, bone, and reproductive health markers.",
    inclusions: ["Complete Blood Count", "Thyroid Profile", "Bone Density Scan", "Gynaecology Consultation"],
    idealFor: ["Women 30+"],
  },
];

export const fallbackGalleryAlbums: GalleryAlbum[] = [
  {
    _id: "fallback-gal-1",
    title: "Hospital Infrastructure",
    slug: "hospital-infrastructure",
    category: "Facility",
    images: [],
    videos: [],
  },
  {
    _id: "fallback-gal-2",
    title: "Community Health Camps",
    slug: "community-health-camps",
    category: "Events",
    images: [],
    videos: [],
  },
  {
    _id: "fallback-gal-3",
    title: "Cardiac Cath Lab",
    slug: "cardiac-cath-lab",
    category: "Facility",
    images: [],
    videos: [],
  },
];

export const fallbackJobListings: JobListing[] = [
  {
    _id: "fallback-job-1",
    title: "Staff Nurse — ICU",
    slug: "staff-nurse-icu",
    department: "Nursing",
    location: "Chennai",
    employmentType: "Full-time",
    description:
      "We're looking for an experienced ICU staff nurse to join our critical care team, providing round-the-clock patient monitoring and care.",
    requirements: ["B.Sc Nursing or equivalent", "2+ years ICU experience", "Valid nursing council registration"],
  },
  {
    _id: "fallback-job-2",
    title: "Radiology Technician",
    slug: "radiology-technician",
    department: "Radiology",
    location: "Chennai",
    employmentType: "Full-time",
    description: "Operate and maintain diagnostic imaging equipment including X-ray, CT, and MRI systems.",
    requirements: ["Diploma/Degree in Radiography", "1+ years experience preferred"],
  },
];

export const fallbackAwards: Award[] = [
  { _id: "award-1", title: "Best Multi-Speciality Hospital", year: 2025, description: "Regional Healthcare Excellence Awards" },
  { _id: "award-2", title: "Excellence in Patient Safety", year: 2024, description: "National Quality Council" },
  { _id: "award-3", title: "Top Cardiac Care Centre", year: 2023, description: "South India Healthcare Awards" },
];

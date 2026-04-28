export interface StaticTeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin?: string;
  order: number;
}

export interface StaticEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  coverImage: string;
  gallery: string[];
  slug: string;
}

export const STATIC_TEAM: StaticTeamMember[] = [
  { id: "1", name: "Zebiba Musema", role: "Founder", photo: "/team/zebiba.jpg", bio: "Founder of FLSLPN at Haramaya University. Visionary leader who established the network in October 2021 to empower female law students.", linkedin: "https://www.linkedin.com/in/zebiba-musema-21664277", order: 1 },
  { id: "2", name: "Selamawit Beshawured", role: "President", photo: "/team/selamawit.jpg", bio: "President of FLSLPN. Leading the network's mission to empower female law students and young legal professionals.", linkedin: "https://www.linkedin.com/in/selamawit-beshawured-651ab1307", order: 2 },
  { id: "3", name: "Edlawit Eyayu", role: "Vice President", photo: "/team/edlawit.jpg", bio: "Vice President of FLSLPN. Supporting leadership and strategic direction of the network.", linkedin: "https://www.linkedin.com/in/edlawit-eyayu-276225357", order: 3 },
  { id: "4", name: "Yadan Tilahun", role: "Secretary", photo: "/team/yadan.jpg", bio: "Secretary of FLSLPN. Managing communications and administrative operations of the network.", linkedin: "https://www.linkedin.com/in/yadan-tilahun", order: 4 },
  { id: "5", name: "Bezawit Girma", role: "Program Lead", photo: "/team/bezawit.jpg", bio: "Program Lead at FLSLPN. Designing and coordinating impactful programs for members.", linkedin: "https://www.linkedin.com/in/bezawit-girma-982842360", order: 5 },
  { id: "6", name: "Mekidelawit Wassie", role: "Mentorship & Training", photo: "/team/mekidelawit.jpg", bio: "Head of Mentorship and Training. Connecting members with mentors and professional development opportunities.", linkedin: "https://www.linkedin.com/in/mekidelawit-wassie-274203403", order: 6 },
  { id: "7", name: "Meron Asrat", role: "Head of Resource Allocation", photo: "/team/meron.jpg", bio: "Head of Resource Allocation. Managing the network's resources to maximize impact.", linkedin: "https://www.linkedin.com/in/meron-asrat-282584403", order: 7 },
  { id: "8", name: "Mahlet Shiferaw", role: "Public Relations", photo: "/team/mahlet.jpg", bio: "Public Relations Officer. Building and maintaining FLSLPN's public image and community relationships.", order: 8 },
  { id: "9", name: "Bethelhem Yergalem", role: "Head of Communication & Media", photo: "/team/bethelhem.jpg", bio: "Head of Communication and Media. Managing FLSLPN's digital presence and media outreach.", linkedin: "https://www.linkedin.com/in/beta-kiya-9a5553403", order: 9 },
  { id: "10", name: "Tekiya Mustefa", role: "Event Planner & Coordinator", photo: "/team/tekiya-mustefa.jpg", bio: "Event Planner and Coordinator. Organizing impactful events that bring the community together.", linkedin: "https://www.linkedin.com/in/tekiya-mustefa-670439395", order: 10 },
  { id: "10b", name: "Hewan Sisay", role: "Event Planner & Coordinator", photo: "/team/hewan-sisay.jpg", bio: "Event Planner and Coordinator. Co-organizing FLSLPN events and ensuring memorable experiences for all participants.", linkedin: "https://www.linkedin.com/in/hewan-sisay-139012364", order: 11 },
  { id: "11", name: "Tewodros Tamene", role: "Video Editor & Cinematographer", photo: "/team/tewodros.jpg", bio: "Video Editor and Cinematographer. Capturing and sharing FLSLPN's story through visual media.", linkedin: "https://www.linkedin.com/in/tewodros-tamene-187633393", order: 12 },
];

export const STATIC_EVENTS: StaticEvent[] = [
  {
    id: "14", title: "Digital Safety and Security Training", date: "2026-04-01",
    description: "A comprehensive training program on digital safety and cybersecurity for female law students and legal professionals. Participants learned essential skills to protect themselves and their clients in the digital age.",
    coverImage: "/events/digital-safety/cover.jpg",
    gallery: Array.from({length: 20}, (_, i) => `/events/digital-safety/photo${i+1}.jpg`),
    slug: "digital-safety-training-2026",
  },
  {
    id: "13", title: "16 Days of Activism", date: "2025-11-25",
    description: "FLSLPN participated in the global 16 Days of Activism against Gender-Based Violence campaign, raising awareness about women's rights and legal protections.",
    coverImage: "/events/activism/cover.jpg",
    gallery: ["/events/activism/cover.jpg", "/events/activism/16 Days of Activism6.jpg", "/events/activism/16 Days of Activism7.jpg", "/events/activism/16 Days of Activism8.jpg", "/events/activism/16 Days of Activism9.jpg"],
    slug: "16-days-of-activism-2025",
  },
  {
    id: "12", title: "Warka Wellness Session Cascade", date: "2025-11-10",
    description: "A wellness and self-care session designed to support the mental health and wellbeing of female law students navigating the demands of legal education.",
    coverImage: "/events/warka/cover.jpg",
    gallery: ["/events/warka/cover.jpg"],
    slug: "warka-wellness-session",
  },
  {
    id: "11", title: "Relaunching Event", date: "2025-11-01",
    description: "FLSLPN was officially relaunched with renewed energy and impact-driven activities to strengthen community engagement and women's empowerment in the legal field.",
    coverImage: "/events/relaunching/cover.jpg",
    gallery: Array.from({length: 9}, (_, i) => `/events/relaunching/photo${i+1}.jpg`),
    slug: "relaunching-event-2025",
  },
  {
    id: "10", title: "Awareness Creation Campaign 2024", date: "2024-02-01",
    description: "A campaign to raise awareness about women's legal rights and gender equality among students and the broader university community.",
    coverImage: "/events/awareness-2024/cover.jpg",
    gallery: Array.from({length: 9}, (_, i) => i === 0 ? "/events/awareness-2024/cover.jpg" : `/events/awareness-2024/Awareness Creation campaign 2024_${i}.jpg`),
    slug: "awareness-campaign-2024",
  },
  {
    id: "9", title: "Training Program 2024", date: "2024-03-01",
    description: "Professional development training for FLSLPN members covering leadership, advocacy, and legal skills essential for career success.",
    coverImage: "/events/training-2024/cover.jpg",
    gallery: Array.from({length: 7}, (_, i) => `/events/training-2024/photo${i+2}.jpg`),
    slug: "training-program-2024",
  },
  {
    id: "8", title: "EWHRDN 3rd General Assembly Meeting", date: "2024-11-01",
    description: "FLSLPN participated in the Ethiopian Women Human Rights Defenders Network 3rd General Assembly Meeting, connecting with national advocates for women's rights.",
    coverImage: "/events/ewhrdn/cover.jpg",
    gallery: ["/events/ewhrdn/cover.jpg", "/events/ewhrdn/EWHRDN 3rd General Assembly Meeting 1.jpg", "/events/ewhrdn/EWHRDN 3rd General Assembly Meeting 2.jpg", "/events/ewhrdn/EWHRDN 3rd General Assembly Meeting 4.jpg"],
    slug: "ewhrdn-assembly-2024",
  },
  {
    id: "7", title: "International Women Human Rights Defenders Day", date: "2023-11-29",
    description: "Commemorating International Women Human Rights Defenders Day with awareness activities and recognition of women who defend human rights.",
    coverImage: "/events/human-rights-day/cover.jpg",
    gallery: Array.from({length: 4}, (_, i) => `/events/human-rights-day/photo${i+1}.jpg`),
    slug: "human-rights-defenders-day-2023",
  },
  {
    id: "6", title: "Awareness Creation Campaign 2023", date: "2023-11-01",
    description: "Community awareness campaign focused on women's legal rights, gender-based violence prevention, and access to justice.",
    coverImage: "/events/awareness-2023/cover.jpg",
    gallery: ["/events/awareness-2023/cover.jpg"],
    slug: "awareness-campaign-2023",
  },
  {
    id: "5", title: "International Women's Day 2023", date: "2023-03-08",
    description: "Celebrating International Women's Day with inspiring talks, networking, and recognition of women's contributions to the legal profession.",
    coverImage: "/events/womens-day-2023/cover.jpg",
    gallery: Array.from({length: 4}, (_, i) => `/events/womens-day-2023/photo${i+1}.jpg`),
    slug: "womens-day-2023",
  },
  {
    id: "4", title: "Fresh Female Students Welcome Program", date: "2023-03-01",
    description: "A welcoming program for newly enrolled female law students, introducing them to FLSLPN and the support network available to them.",
    coverImage: "/events/welcome-program/cover.jpg",
    gallery: ["/events/welcome-program/cover.jpg", "/events/welcome-program/Fresh_Female_Students_Welcome_Program2.jpg", "/events/welcome-program/Fresh_Female_Students_Welcome_Program3.jpg", "/events/welcome-program/Fresh_Female_Students_Welcome_Program5.jpg", "/events/welcome-program/Fresh_Female_Students_Welcome_Program6.jpg"],
    slug: "welcome-program-2023",
  },
  {
    id: "3", title: "Personal Development Training", date: "2023-02-01",
    description: "A personal development training program helping female law students build confidence, leadership skills, and professional competencies.",
    coverImage: "/events/personal-dev/cover.jpg",
    gallery: Array.from({length: 6}, (_, i) => `/events/personal-dev/photo${i+1}.jpg`),
    slug: "personal-development-2023",
  },
  {
    id: "2", title: "Awareness Campaign — International Women's Day 2022", date: "2022-03-08",
    description: "FLSLPN's first major awareness campaign coinciding with International Women's Day, promoting gender equality and women's rights in law.",
    coverImage: "/events/awareness-2022/cover.jpg",
    gallery: Array.from({length: 10}, (_, i) => i === 0 ? "/events/awareness-2022/cover.jpg" : `/events/awareness-2022/Awareness_creation_campaign${i}.jpg`),
    slug: "awareness-womens-day-2022",
  },
  {
    id: "1", title: "Official Launching", date: "2022-02-01",
    description: "The official launch of the Female Law Students & Legal Professionals Network at Haramaya University — a historic milestone for women in law at the institution.",
    coverImage: "/events/launching/cover.jpg",
    gallery: Array.from({length: 15}, (_, i) => i === 0 ? "/events/launching/cover.jpg" : `/events/launching/Launching${i}.jpg`),
    slug: "official-launching-2022",
  },
];

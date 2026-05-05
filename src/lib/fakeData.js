export const visaData = [
  { id: 'visa-work', code: 'E-7', title: 'Work Visa (E-7)', category: 'Work', description: 'For skilled professionals seeking employment in Korea.', duration: '1-3 years', requirements: 'Passport, employment contract, qualifications' },
  { id: 'visa-student', code: 'D-2', title: 'Student Visa (D-2)', category: 'Study', description: 'For international students enrolled in Korean institutions.', duration: 'Depends on program length', requirements: 'Admission letter, transcripts, passport' },
  { id: 'visa-tourist', code: 'C-3', title: 'Short-term Visit (C-3)', category: 'Travel', description: 'For short visits such as tourism or short courses.', duration: 'Up to 90 days', requirements: 'Passport, return ticket' },
];

export const documentsData = [
  { id: 'doc-passport', name: 'Valid Passport', description: 'Passport valid for at least 6 months beyond your intended stay.', category: 'Identity', priority: 'high' },
  { id: 'doc-photos', name: 'Passport Photos', description: 'Recent passport-size photos (4x6 cm, color, white background).', category: 'Photos', priority: 'high' },
  { id: 'doc-invitation', name: 'Invitation/Acceptance Letter', description: 'Official letter from employer, school, or sponsor in Korea.', category: 'Official', priority: 'high' },
  { id: 'doc-proof-funds', name: 'Proof of Financial Means', description: 'Bank statements or financial documents showing sufficient funds.', category: 'Financial', priority: 'high' },
  { id: 'doc-travel-insurance', name: 'Travel Health Insurance', description: 'Valid health insurance covering your stay in Korea.', category: 'Insurance', priority: 'medium' },
  { id: 'doc-accommodation', name: 'Accommodation Confirmation', description: 'Hotel reservations or rental agreement for your stay.', category: 'Travel', priority: 'medium' },
  { id: 'doc-itinerary', name: 'Travel Itinerary', description: 'Detailed schedule of your activities during your visit.', category: 'Travel', priority: 'medium' },
  { id: 'doc-criminal', name: 'Criminal Record Certificate', description: 'Police clearance or certificate of no criminal record.', category: 'Background', priority: 'medium' },
  { id: 'doc-employment', name: 'Employment Contract (if applicable)', description: 'Signed employment contract with your Korean employer.', category: 'Employment', priority: 'high' },
  { id: 'doc-education', name: 'Educational Certificates', description: 'Diplomas, transcripts, or certificates from previous education.', category: 'Education', priority: 'medium' },
  { id: 'doc-marriage', name: 'Marriage Certificate (if applicable)', description: 'Official marriage certificate if sponsoring a family member.', category: 'Family', priority: 'low' },
  { id: 'doc-birth', name: 'Birth Certificate (if applicable)', description: 'Birth certificate for dependent family members.', category: 'Family', priority: 'low' },
];

export const guidesData = [
  { id: 'guide-1', slug: 'moving-to-seoul', title: 'Moving to Seoul: A Practical Guide', summary: 'Everything you need to know about settling in Seoul.', category: 'travel', publishedAt: '2026-04-15' },
  { id: 'guide-2', slug: 'working-in-korea', title: 'Working in Korea: Permits & Culture', summary: 'Guide to employment, permits, and workplace culture.', category: 'work', publishedAt: '2026-03-10' },
  { id: 'guide-3', slug: 'study-abroad', title: 'Study Abroad: Korean Universities', summary: 'Applying, visa steps, and tips for international students.', category: 'study', publishedAt: '2026-02-22' },
  { id: 'guide-4', slug: 'cheap-eating', title: 'Eating Well on a Budget', summary: 'Affordable food options and market shopping tips.', category: 'wellness', publishedAt: '2026-01-05' },
];

export const updatesData = [
  { id: 'update-1', title: 'Entry Rules Updated', content: 'Quarantine requirements relaxed for vaccinated travelers.', date: '2026-05-01', priority: 'high' },
  { id: 'update-2', title: 'New Student Grant', content: 'Government announces new support for international students.', date: '2026-04-01', priority: 'medium' },
];

export const faqsData = [
  { id: 'faq-1', question: 'How long does visa processing take?', answer: 'Processing typically takes 2-6 weeks depending on the visa type.' },
  { id: 'faq-2', question: 'Can I work on a student visa?', answer: 'Part-time work is allowed under certain conditions; check visa rules.' },
];

export const instructorsData = [
  { id: 'ins-1', name: 'Ji-hoon Park', title: 'Korean Language Instructor', bio: '10+ years teaching Korean to internationals.', image: '/images/instructors/jihoon.jpg' },
  { id: 'ins-2', name: 'Min-seo Lee', title: 'Cultural Guide', bio: 'Cultural immersion specialist and translator.', image: '/images/instructors/minseo.jpg' },
];

export const coursesData = [
  { id: '1', title: 'Korean for Beginners', instructor: 'Ji-hoon Park', duration: '6 weeks', rating: 4.8, level: 'Beginner', category: 'Language', image: '/images/courses/korean-beginners.jpg', description: 'Start learning Hangul and basic conversation.' },
  { id: '2', title: 'Interview Korean', instructor: 'Min-seo Lee', duration: '4 weeks', rating: 4.6, level: 'Intermediate', category: 'Career', image: '/images/courses/interview-korean.jpg', description: 'Prepare for job interviews in Korean.' },
  { id: '3', title: 'Living in Seoul', instructor: 'Ji-hoon Park', duration: '3 weeks', rating: 4.7, level: 'All', category: 'Lifestyle', image: '/images/courses/living-seoul.jpg', description: 'Practical guide to daily life and housing.' },
  { id: '4', title: 'Korean Writing', instructor: 'Min-seo Lee', duration: '5 weeks', rating: 4.5, level: 'Beginner', category: 'Language', image: '/images/courses/korean-writing.jpg', description: 'Improve reading and writing skills.' },
];

const fakeData = { visaData, documentsData, guidesData, updatesData, faqsData };
export default fakeData;

// lib/data.js
// Green Field Hospital
// Local demo data — No database required.

/* =========================================================
   HOSPITAL INFORMATION
========================================================= */

export const hospital = {
  name: "Green Field Hospital",
  shortName: "GFH",
  tagline: "Quality Healthcare, Trusted Care",
  address: "Dhaka, Bangladesh",
  phone: "+880 2 5555 1234",
  emergency: "999",
  email: "info@greenfieldhospital.com",
  website: "www.greenfieldhospital.com",
};


/* =========================================================
   DOCTORS
========================================================= */

export const doctors = [
  {
    id: "DOC-001",
    name: "Dr. Rahim Ahmed",
    specialty: "Cardiologist",
    department: "Cardiology",
    phone: "+880 1711-111111",
    email: "rahim@greenfieldhospital.com",
    status: "Available",
    experience: "12 Years",
    qualification: "MBBS, FCPS, MD",
    schedule: "09:00 AM - 05:00 PM",
    room: "Room 201",
    patientsToday: 18,
  },

  {
    id: "DOC-002",
    name: "Dr. Nusrat Jahan",
    specialty: "Neurologist",
    department: "Neurology",
    phone: "+880 1812-222222",
    email: "nusrat@greenfieldhospital.com",
    status: "Available",
    experience: "9 Years",
    qualification: "MBBS, FCPS, MD",
    schedule: "10:00 AM - 06:00 PM",
    room: "Room 205",
    patientsToday: 14,
  },

  {
    id: "DOC-003",
    name: "Dr. Tanvir Hasan",
    specialty: "Orthopedic Surgeon",
    department: "Orthopedics",
    phone: "+880 1913-333333",
    email: "tanvir@greenfieldhospital.com",
    status: "Busy",
    experience: "15 Years",
    qualification: "MBBS, MS",
    schedule: "08:00 AM - 04:00 PM",
    room: "Room 301",
    patientsToday: 21,
  },

  {
    id: "DOC-004",
    name: "Dr. Farzana Akter",
    specialty: "Pediatrician",
    department: "Pediatrics",
    phone: "+880 1614-444444",
    email: "farzana@greenfieldhospital.com",
    status: "Available",
    experience: "8 Years",
    qualification: "MBBS, DCH",
    schedule: "09:30 AM - 04:30 PM",
    room: "Room 108",
    patientsToday: 16,
  },

  {
    id: "DOC-005",
    name: "Dr. Mahmudul Karim",
    specialty: "Dermatologist",
    department: "Dermatology",
    phone: "+880 1515-555555",
    email: "mahmud@greenfieldhospital.com",
    status: "Available",
    experience: "10 Years",
    qualification: "MBBS, DDV",
    schedule: "11:00 AM - 07:00 PM",
    room: "Room 402",
    patientsToday: 12,
  },

  {
    id: "DOC-006",
    name: "Dr. Sadia Rahman",
    specialty: "Gynecologist",
    department: "Gynecology",
    phone: "+880 1816-666666",
    email: "sadia@greenfieldhospital.com",
    status: "On Leave",
    experience: "11 Years",
    qualification: "MBBS, FCPS",
    schedule: "09:00 AM - 03:00 PM",
    room: "Room 305",
    patientsToday: 0,
  },
];


/* =========================================================
   PATIENTS
========================================================= */

export const patients = [
  {
    id: "PAT-001",
    name: "Mohammad Hasan",
    age: 42,
    gender: "Male",
    bloodGroup: "B+",
    phone: "+880 1712-123456",
    email: "hasan@example.com",
    address: "Dhanmondi, Dhaka",
    doctor: "Dr. Rahim Ahmed",
    department: "Cardiology",
    condition: "Hypertension",
    status: "Active",
    lastVisit: "2026-08-28",
  },

  {
    id: "PAT-002",
    name: "Ayesha Rahman",
    age: 29,
    gender: "Female",
    bloodGroup: "A+",
    phone: "+880 1813-234567",
    email: "ayesha@example.com",
    address: "Mirpur, Dhaka",
    doctor: "Dr. Nusrat Jahan",
    department: "Neurology",
    condition: "Migraine",
    status: "Active",
    lastVisit: "2026-08-30",
  },

  {
    id: "PAT-003",
    name: "Sakib Ahmed",
    age: 35,
    gender: "Male",
    bloodGroup: "O+",
    phone: "+880 1914-345678",
    email: "sakib@example.com",
    address: "Uttara, Dhaka",
    doctor: "Dr. Tanvir Hasan",
    department: "Orthopedics",
    condition: "Back Pain",
    status: "Active",
    lastVisit: "2026-08-25",
  },

  {
    id: "PAT-004",
    name: "Nusrat Tasnim",
    age: 7,
    gender: "Female",
    bloodGroup: "AB+",
    phone: "+880 1615-456789",
    email: "parent@example.com",
    address: "Mohammadpur, Dhaka",
    doctor: "Dr. Farzana Akter",
    department: "Pediatrics",
    condition: "Fever",
    status: "Recovered",
    lastVisit: "2026-08-27",
  },

  {
    id: "PAT-005",
    name: "Arif Hossain",
    age: 51,
    gender: "Male",
    bloodGroup: "O-",
    phone: "+880 1516-567890",
    email: "arif@example.com",
    address: "Banani, Dhaka",
    doctor: "Dr. Rahim Ahmed",
    department: "Cardiology",
    condition: "Chest Pain",
    status: "Critical",
    lastVisit: "2026-08-31",
  },

  {
    id: "PAT-006",
    name: "Sabrina Islam",
    age: 34,
    gender: "Female",
    bloodGroup: "B+",
    phone: "+880 1717-678901",
    email: "sabrina@example.com",
    address: "Gulshan, Dhaka",
    doctor: "Dr. Sadia Rahman",
    department: "Gynecology",
    condition: "Routine Checkup",
    status: "Active",
    lastVisit: "2026-08-29",
  },
];


/* =========================================================
   APPOINTMENTS
========================================================= */

export const appointments = [
  {
    id: "APT-001",
    patientId: "PAT-001",
    patient: "Mohammad Hasan",
    doctorId: "DOC-001",
    doctor: "Dr. Rahim Ahmed",
    department: "Cardiology",
    date: "2026-09-01",
    time: "09:30 AM",
    type: "Consultation",
    status: "Confirmed",
  },

  {
    id: "APT-002",
    patientId: "PAT-002",
    patient: "Ayesha Rahman",
    doctorId: "DOC-002",
    doctor: "Dr. Nusrat Jahan",
    department: "Neurology",
    date: "2026-09-01",
    time: "10:30 AM",
    type: "Follow-up",
    status: "Confirmed",
  },

  {
    id: "APT-003",
    patientId: "PAT-003",
    patient: "Sakib Ahmed",
    doctorId: "DOC-003",
    doctor: "Dr. Tanvir Hasan",
    department: "Orthopedics",
    date: "2026-09-01",
    time: "11:00 AM",
    type: "Consultation",
    status: "Pending",
  },

  {
    id: "APT-004",
    patientId: "PAT-004",
    patient: "Nusrat Tasnim",
    doctorId: "DOC-004",
    doctor: "Dr. Farzana Akter",
    department: "Pediatrics",
    date: "2026-09-02",
    time: "09:45 AM",
    type: "Checkup",
    status: "Confirmed",
  },

  {
    id: "APT-005",
    patientId: "PAT-005",
    patient: "Arif Hossain",
    doctorId: "DOC-001",
    doctor: "Dr. Rahim Ahmed",
    department: "Cardiology",
    date: "2026-09-02",
    time: "02:00 PM",
    type: "Emergency",
    status: "Confirmed",
  },

  {
    id: "APT-006",
    patientId: "PAT-006",
    patient: "Sabrina Islam",
    doctorId: "DOC-006",
    doctor: "Dr. Sadia Rahman",
    department: "Gynecology",
    date: "2026-09-03",
    time: "11:30 AM",
    type: "Routine Checkup",
    status: "Pending",
  },
];


/* =========================================================
   BILLING
========================================================= */

export const bills = [
  {
    id: "INV-001",
    patientId: "PAT-001",
    patient: "Mohammad Hasan",
    service: "Cardiology Consultation",
    doctor: "Dr. Rahim Ahmed",
    amount: 2500,
    paid: 2500,
    due: 0,
    status: "Paid",
    date: "2026-08-28",
  },

  {
    id: "INV-002",
    patientId: "PAT-002",
    patient: "Ayesha Rahman",
    service: "Neurology Consultation",
    doctor: "Dr. Nusrat Jahan",
    amount: 3000,
    paid: 1500,
    due: 1500,
    status: "Partial",
    date: "2026-08-30",
  },

  {
    id: "INV-003",
    patientId: "PAT-003",
    patient: "Sakib Ahmed",
    service: "Orthopedic Consultation",
    doctor: "Dr. Tanvir Hasan",
    amount: 3500,
    paid: 0,
    due: 3500,
    status: "Pending",
    date: "2026-08-25",
  },

  {
    id: "INV-004",
    patientId: "PAT-004",
    patient: "Nusrat Tasnim",
    service: "Pediatric Consultation",
    doctor: "Dr. Farzana Akter",
    amount: 1800,
    paid: 1800,
    due: 0,
    status: "Paid",
    date: "2026-08-27",
  },

  {
    id: "INV-005",
    patientId: "PAT-005",
    patient: "Arif Hossain",
    service: "Emergency Cardiology",
    doctor: "Dr. Rahim Ahmed",
    amount: 7500,
    paid: 5000,
    due: 2500,
    status: "Partial",
    date: "2026-08-31",
  },

  {
    id: "INV-006",
    patientId: "PAT-006",
    patient: "Sabrina Islam",
    service: "Gynecology Checkup",
    doctor: "Dr. Sadia Rahman",
    amount: 2200,
    paid: 2200,
    due: 0,
    status: "Paid",
    date: "2026-08-29",
  },
];


/* =========================================================
   DEPARTMENTS
========================================================= */

export const departments = [
  {
    id: "DEP-001",
    name: "Cardiology",
    doctors: 8,
    patients: 124,
    status: "Active",
  },

  {
    id: "DEP-002",
    name: "Neurology",
    doctors: 6,
    patients: 87,
    status: "Active",
  },

  {
    id: "DEP-003",
    name: "Orthopedics",
    doctors: 7,
    patients: 102,
    status: "Active",
  },

  {
    id: "DEP-004",
    name: "Pediatrics",
    doctors: 5,
    patients: 96,
    status: "Active",
  },

  {
    id: "DEP-005",
    name: "Dermatology",
    doctors: 4,
    patients: 61,
    status: "Active",
  },

  {
    id: "DEP-006",
    name: "Gynecology",
    doctors: 6,
    patients: 93,
    status: "Active",
  },
];


/* =========================================================
   DASHBOARD STATISTICS
========================================================= */

export const dashboardStats = {
  totalPatients: patients.length,
  totalDoctors: doctors.length,
  totalAppointments: appointments.length,

  todayAppointments: appointments.filter(
    (appointment) => appointment.date === "2026-09-01"
  ).length,

  availableDoctors: doctors.filter(
    (doctor) =>
      doctor.status?.toLowerCase() === "available"
  ).length,

  pendingAppointments: appointments.filter(
    (appointment) =>
      appointment.status === "Pending"
  ).length,

  totalRevenue: bills.reduce(
    (total, bill) => total + bill.paid,
    0
  ),

  totalDue: bills.reduce(
    (total, bill) => total + bill.due,
    0
  ),
};


/* =========================================================
   RECENT ACTIVITIES
========================================================= */

export const recentActivities = [
  {
    id: 1,
    type: "appointment",
    title: "New appointment scheduled",
    description: "Mohammad Hasan booked a cardiology consultation.",
    time: "10 minutes ago",
  },

  {
    id: 2,
    type: "patient",
    title: "New patient registered",
    description: "Sabrina Islam was added to the patient directory.",
    time: "35 minutes ago",
  },

  {
    id: 3,
    type: "payment",
    title: "Payment received",
    description: "Invoice INV-001 was paid in full.",
    time: "1 hour ago",
  },

  {
    id: 4,
    type: "doctor",
    title: "Doctor availability updated",
    description: "Dr. Rahim Ahmed is currently available.",
    time: "2 hours ago",
  },

  {
    id: 5,
    type: "appointment",
    title: "Appointment confirmed",
    description: "Ayesha Rahman's neurology appointment was confirmed.",
    time: "3 hours ago",
  },
];


/* =========================================================
   ADMIN USER
========================================================= */

export const adminUser = {
  id: "ADMIN-001",
  name: "Siam Babu",
  email: "mdruhulamin96888@gmail.com",
  role: "ADMIN",
  department: "Administration",
  status: "Active",
};


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

export function getDoctorById(id) {
  return doctors.find((doctor) => doctor.id === id);
}

export function getPatientById(id) {
  return patients.find((patient) => patient.id === id);
}

export function getAppointmentById(id) {
  return appointments.find(
    (appointment) => appointment.id === id
  );
}

export function getBillById(id) {
  return bills.find((bill) => bill.id === id);
}

export function getDoctorsByDepartment(department) {
  return doctors.filter(
    (doctor) => doctor.department === department
  );
}

export function getAppointmentsByDoctor(doctorId) {
  return appointments.filter(
    (appointment) => appointment.doctorId === doctorId
  );
}

export function getAppointmentsByPatient(patientId) {
  return appointments.filter(
    (appointment) => appointment.patientId === patientId
  );
}


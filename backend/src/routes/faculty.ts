import { Router } from 'express';
import { query, isConnected } from '../config/db.js';

export const facultyRouter = Router();

let memoryFaculty: any[] = [
  {
    id: 'fac-1',
    empId: 'KMCE-CSE-001',
    name: 'Dr. P. Murali Krishna',
    designation: 'Professor & Head of Department (HOD)',
    department: 'CSE',
    isHod: true,
    email: 'hod.cse@kmce.edu.in',
    phone: '+91 98480 12345',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    qualification: 'Ph.D in Computer Science (IIT Madras), M.Tech (JNTUH)',
    experienceYears: 19,
    officeLocation: 'Academic Block-A, 2nd Floor, Room A-204',
    assignedSubjects: ['Design & Analysis of Algorithms (CS402PC)', 'Advanced Data Structures (CS301PC)'],
    researchAreas: ['Algorithmic Complexity', 'Distributed Cloud Computing', 'Graph Neural Networks'],
  },
  {
    id: 'fac-2',
    empId: 'KMCE-CSM-001',
    name: 'Dr. S. Radhika Devi',
    designation: 'Professor & Head of Department (HOD)',
    department: 'CSM',
    isHod: true,
    email: 'hod.csm@kmce.edu.in',
    phone: '+91 94401 98765',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    qualification: 'Ph.D in AI & Machine Learning (NIT Warangal), M.Tech',
    experienceYears: 16,
    officeLocation: 'Center for AI Excellence, 3rd Floor, Room C-302',
    assignedSubjects: ['Machine Learning (AI501PC)', 'Deep Learning & Neural Architectures (AI602PC)'],
    researchAreas: ['Computer Vision', 'Deep Generative Models', 'Explainable AI (XAI)'],
  },
  {
    id: 'fac-3',
    empId: 'KMCE-ECE-001',
    name: 'Dr. K. Venkat Rao',
    designation: 'Professor & Head of Department (HOD)',
    department: 'ECE',
    isHod: true,
    email: 'hod.ece@kmce.edu.in',
    phone: '+91 98765 43210',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    qualification: 'Ph.D in VLSI Design (Osmania University), M.Tech',
    experienceYears: 22,
    officeLocation: 'Electronics Wing, 1st Floor, Room E-108',
    assignedSubjects: ['Digital Signal Processing (EC501PC)', 'VLSI Design & Embedded Systems (EC601PC)'],
    researchAreas: ['Low Power VLSI', 'FPGA Prototyping', 'Wireless Sensor Networks'],
  },
];

// GET /api/faculty
facultyRouter.get('/', async (req, res) => {
  try {
    if (isConnected()) {
      const result = await query('SELECT * FROM faculty ORDER BY is_hod DESC, name ASC');
      const formatted = result.rows.map((r) => ({
        id: r.id,
        empId: r.emp_id,
        name: r.name,
        designation: r.designation,
        department: r.department,
        isHod: r.is_hod,
        email: r.email,
        phone: r.phone,
        photo: r.photo,
        qualification: r.qualification,
        experienceYears: r.experience_years,
        officeLocation: r.office_location,
        assignedSubjects: r.assigned_subjects,
        researchAreas: r.research_areas,
      }));
      return res.json({ faculty: formatted, source: 'postgresql' });
    }
    res.json({ faculty: memoryFaculty, source: 'memory_fallback' });
  } catch (err) {
    res.json({ faculty: memoryFaculty, source: 'fallback_error' });
  }
});

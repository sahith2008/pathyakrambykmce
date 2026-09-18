import {
  AcademicDocument,
  AttendanceRecord,
  CollegeInfo,
  CourseListing,
  FacultyProfile,
  PushNotification,
  QuizDefinition,
} from '../types';

export const KMCE_COLLEGE_INFO: CollegeInfo = {
  name: 'Keshav Memorial College of Engineering',
  shortName: 'KMCE',
  tagline: 'Excellence in Engineering & Technological Innovation',
  affiliation: 'Affiliated to Jawaharlal Nehru Technological University Hyderabad (JNTUH) - R25 / R22 Regulations',
  approvedBy: 'Approved by AICTE, New Delhi & Govt. of Telangana | Accredited by NBA & NAAC',
  address: 'NH-65, Ibrahimpatnam / Hyderabad Campus, Ranga Reddy District',
  city: 'Hyderabad',
  state: 'Telangana',
  pincode: '501506',
  phone: '+91-40-2756 1234',
  altPhone: '+91-9490 876 543 / +91-9848 112 233',
  email: 'principal@kmce.edu.in',
  examBranchEmail: 'exams.branch@kmce.edu.in',
  website: 'https://kmce.edu.in',
  counselingCode: 'KMCE (EAMCET / ECET Code: KMCE)',
  campusHighlights: [
    'State-of-the-art AI & High Performance Computing Research Labs',
    'Dedicated JNTUH R25 Examination & Digital Evaluation Cell (Affiliated to JNTU)',
    'Advanced IoT & Embedded Systems Lab sponsored by Texas Instruments',
    'High-speed 1 Gbps Campus WiFi & 24/7 Digital Library Access',
    'Active Industry MoU with TCS, Tech Mahindra, Infosys, and AWS Academy',
    'Incubation & Innovation Cell fostering Student Patent Publications'
  ]
};

export const INITIAL_FACULTY_LIST: FacultyProfile[] = [
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
    researchAreas: ['Algorithmic Complexity', 'Distributed Cloud Computing', 'Graph Neural Networks']
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
    researchAreas: ['Computer Vision', 'Deep Generative Models', 'Explainable AI (XAI)']
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
    researchAreas: ['Low Power VLSI', 'FPGA Prototyping', 'Wireless Sensor Networks']
  },
  {
    id: 'fac-4',
    empId: 'KMCE-CSE-004',
    name: 'Prof. Ananya Varma',
    designation: 'Associate Professor',
    department: 'CSE',
    isHod: false,
    email: 'ananya.varma@kmce.edu.in',
    phone: '+91 91234 56780',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    qualification: 'M.Tech (CSE - JNTUH), Ph.D (Pursuing - BITS Pilani)',
    experienceYears: 11,
    officeLocation: 'Academic Block-A, Room A-212',
    assignedSubjects: ['Database Management Systems (CS403PC)', 'Operating Systems (CS404PC)'],
    researchAreas: ['Database Query Optimization', 'Big Data Streaming', 'Cloud DBs']
  },
  {
    id: 'fac-5',
    empId: 'KMCE-CSM-003',
    name: 'Dr. Rajeshwar Reddy',
    designation: 'Associate Professor',
    department: 'CSM',
    isHod: false,
    email: 'rajeshwar.reddy@kmce.edu.in',
    phone: '+91 99887 76655',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    qualification: 'Ph.D (AI & Robotics - University of Hyderabad)',
    experienceYears: 13,
    officeLocation: 'AI Block, Room C-310',
    assignedSubjects: ['Natural Language Processing (AI603PE)', 'Reinforcement Learning (AI701PC)'],
    researchAreas: ['Large Language Models', 'Speech Recognition', 'Autonomous Navigation']
  },
  {
    id: 'fac-6',
    empId: 'KMCE-ECE-005',
    name: 'Prof. M. Sreenivasa Chary',
    designation: 'Senior Assistant Professor',
    department: 'ECE',
    isHod: false,
    email: 'sreenivas.chary@kmce.edu.in',
    phone: '+91 97000 11223',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    qualification: 'M.Tech (Embedded Systems - JNTUH), B.Tech (ECE)',
    experienceYears: 9,
    officeLocation: 'Electronics Wing, Room E-115',
    assignedSubjects: ['Microprocessors & Microcontrollers (EC502PC)', 'Analog Electronics (EC302PC)'],
    researchAreas: ['ARM Cortex Architecture', 'IoT Node Edge Computing']
  }
];

export const INITIAL_DOCUMENTS: AcademicDocument[] = [
  {
    id: 'doc-qp-1',
    title: 'Design and Analysis of Algorithms - Semester End Examination (Regular)',
    type: 'question_paper',
    branch: 'CSE',
    semester: 4,
    subjectCode: 'CS402PC',
    subjectName: 'Design and Analysis of Algorithms',
    academicYear: '2024-25',
    examType: 'Semester Regular',
    uploadedBy: 'Dr. P. Murali Krishna (HOD CSE)',
    uploaderEmpId: 'KMCE-CSE-001',
    uploadDate: '2025-06-15',
    fileSize: '1.8 MB',
    fileUrl: 'https://kmce.edu.in/portal/papers/CS402PC-2025-Regular.pdf',
    downloadCount: 412,
    curriculum: 'R25',
    description: 'Complete JNTUH R25 End Semester Question Paper covering Dynamic Programming, Greedy Method, Graph Algorithms, and NP-Completeness.',
    questionsPreview: {
      sectionA: [
        'Define asymptotic notations Big-O, Big-Omega, and Big-Theta with mathematical definitions.',
        'State Master Theorem for solving divide-and-conquer recurrences.',
        'Explain the greedy choice property and optimal substructure in Fractional Knapsack.',
        'Differentiate between Prim’s and Kruskal’s minimum spanning tree algorithms.',
        'Define NP-Hard and NP-Complete problems with an example.'
      ],
      sectionB: [
        { qNum: 'Q1(a)', text: 'Explain Strassen’s matrix multiplication and derive its time complexity recurrence.', marks: 7 },
        { qNum: 'Q1(b)', text: 'Apply 0/1 Knapsack dynamic programming algorithm for weights [2, 3, 4, 5] and values [3, 4, 5, 6] with capacity W=8.', marks: 8 },
        { qNum: 'Q2(a)', text: 'Write and illustrate Dijkstra’s Single Source Shortest Path algorithm on a directed weighted graph.', marks: 8 },
        { qNum: 'Q2(b)', text: 'Explain the 8-Queens problem using Backtracking state-space tree formulation.', marks: 7 }
      ]
    }
  },
  {
    id: 'doc-qp-2',
    title: 'Machine Learning - Mid Term-I Examination',
    type: 'question_paper',
    branch: 'CSM',
    semester: 5,
    subjectCode: 'AI501PC',
    subjectName: 'Machine Learning & Foundations',
    academicYear: '2024-25',
    examType: 'Mid-1',
    uploadedBy: 'Dr. S. Radhika Devi (HOD CSM)',
    uploaderEmpId: 'KMCE-CSM-001',
    uploadDate: '2025-02-10',
    fileSize: '1.2 MB',
    fileUrl: 'https://kmce.edu.in/portal/papers/AI501PC-Mid1-2025.pdf',
    downloadCount: 298,
    curriculum: 'R25',
    description: 'Mid-I Descriptive & Objective Question Paper for Unit 1 (Supervised Learning, Linear Regression) and Unit 2 (Decision Trees, Ensemble Methods).',
    questionsPreview: {
      sectionA: [
        'Differentiate between generative vs discriminative models.',
        'Explain L1 (Lasso) and L2 (Ridge) regularization formulas.',
        'What is information gain and Gini impurity in Decision Trees?'
      ],
      sectionB: [
        { qNum: 'Q1', text: 'Derive the closed-form normal equation for Ordinary Least Squares (OLS) Multiple Linear Regression.', marks: 10 },
        { qNum: 'Q2', text: 'Explain Random Forest bagging algorithm and out-of-bag (OOB) error estimation.', marks: 10 }
      ]
    }
  },
  {
    id: 'doc-qp-3',
    title: 'Digital Signal Processing - Previous Year Semester End Paper',
    type: 'question_paper',
    branch: 'ECE',
    semester: 5,
    subjectCode: 'EC501PC',
    subjectName: 'Digital Signal Processing',
    academicYear: '2023-24',
    examType: 'Semester Regular',
    uploadedBy: 'Dr. K. Venkat Rao (HOD ECE)',
    uploaderEmpId: 'KMCE-ECE-001',
    uploadDate: '2024-07-02',
    fileSize: '2.1 MB',
    fileUrl: 'https://kmce.edu.in/portal/papers/EC501PC-2024-Regular.pdf',
    downloadCount: 345,
    curriculum: 'R22',
    description: 'JNTUH University End Exam Paper covering DFT, Radix-2 FFT, IIR Butterworth/Chebyshev filter design, and FIR window techniques.',
    questionsPreview: {
      sectionA: [
        'Compute 4-point DFT of x(n) = {1, 2, 3, 4}.',
        'State the advantages of FFT over direct DFT computation.',
        'What is bilinear transformation in digital IIR filter design?'
      ],
      sectionB: [
        { qNum: 'Q1', text: 'Compute 8-point DFT using Decimation-in-Time (DIT) Radix-2 FFT butterfly diagram for x(n) = {1, 0, 1, 0, 1, 0, 1, 0}.', marks: 15 },
        { qNum: 'Q2', text: 'Design a digital Butterworth low-pass filter satisfying given passband and stopband attenuation specifications using Impulse Invariance method.', marks: 15 }
      ]
    }
  },
  {
    id: 'doc-qp-4',
    title: 'Database Management Systems - Mid-2 Question Paper with Answer Keys',
    type: 'question_paper',
    branch: 'CSE',
    semester: 4,
    subjectCode: 'CS403PC',
    subjectName: 'Database Management Systems',
    academicYear: '2024-25',
    examType: 'Mid-2',
    uploadedBy: 'Prof. Ananya Varma',
    uploaderEmpId: 'KMCE-CSE-004',
    uploadDate: '2025-04-12',
    fileSize: '1.4 MB',
    fileUrl: 'https://kmce.edu.in/portal/papers/CS403PC-Mid2-2025.pdf',
    downloadCount: 520,
    curriculum: 'R25',
    description: 'Covers Normalization up to BCNF/4NF, ACID properties, Conflict Serializability, and Two-Phase Locking (2PL).'
  },
  {
    id: 'doc-qp-5',
    title: 'Deep Learning & Neural Architectures - Model Question Paper R25',
    type: 'question_paper',
    branch: 'CSM',
    semester: 6,
    subjectCode: 'AI602PC',
    subjectName: 'Deep Learning & Neural Architectures',
    academicYear: '2024-25',
    examType: 'Model Paper',
    uploadedBy: 'Dr. S. Radhika Devi (HOD CSM)',
    uploaderEmpId: 'KMCE-CSM-001',
    uploadDate: '2025-03-01',
    fileSize: '1.5 MB',
    fileUrl: 'https://kmce.edu.in/portal/papers/AI602PC-Model-R25.pdf',
    downloadCount: 380,
    curriculum: 'R25',
    description: 'Expert model question paper aligned with JNTUH R25 guidelines covering CNN backprop, Transformers, and GAN loss formulations.'
  },
  {
    id: 'doc-qp-6',
    title: 'VLSI Design & Technology - Mid-1 Question Paper',
    type: 'question_paper',
    branch: 'ECE',
    semester: 6,
    subjectCode: 'EC601PC',
    subjectName: 'VLSI Design & Technology',
    academicYear: '2024-25',
    examType: 'Mid-1',
    uploadedBy: 'Dr. K. Venkat Rao (HOD ECE)',
    uploaderEmpId: 'KMCE-ECE-001',
    uploadDate: '2025-02-18',
    fileSize: '1.6 MB',
    fileUrl: 'https://kmce.edu.in/portal/papers/EC601PC-Mid1-2025.pdf',
    downloadCount: 270,
    curriculum: 'R25',
    description: 'CMOS Inverter DC characteristics, Stick diagrams, Lambda design rules, and Elmore delay calculations.'
  },
  // Lesson Plans
  {
    id: 'doc-lp-1',
    title: 'Design & Analysis of Algorithms - Comprehensive 60-Hour Lesson Plan',
    type: 'lesson_plan',
    branch: 'CSE',
    semester: 4,
    subjectCode: 'CS402PC',
    subjectName: 'Design and Analysis of Algorithms',
    academicYear: '2024-25',
    uploadedBy: 'Dr. P. Murali Krishna (HOD CSE)',
    uploaderEmpId: 'KMCE-CSE-001',
    uploadDate: '2025-01-05',
    fileSize: '950 KB',
    fileUrl: 'https://kmce.edu.in/portal/lessonplans/CS402PC-LessonPlan.pdf',
    downloadCount: 189,
    curriculum: 'R25',
    description: 'Unit-by-unit mapped lecture roadmap with Blooms taxonomy levels, textbook references (Cormen & Horowitz), assignment problems, and lab co-requisites.'
  },
  {
    id: 'doc-lp-2',
    title: 'Machine Learning & AI - R25 Semester Course Delivery & Lesson Plan',
    type: 'lesson_plan',
    branch: 'CSM',
    semester: 5,
    subjectCode: 'AI501PC',
    subjectName: 'Machine Learning & Foundations',
    academicYear: '2024-25',
    uploadedBy: 'Dr. S. Radhika Devi (HOD CSM)',
    uploaderEmpId: 'KMCE-CSM-001',
    uploadDate: '2025-01-08',
    fileSize: '820 KB',
    fileUrl: 'https://kmce.edu.in/portal/lessonplans/AI501PC-LessonPlan.pdf',
    downloadCount: 142,
    curriculum: 'R25',
    description: 'Syllabus breakdown with Kaggle hands-on sessions, PyTorch demo dates, and weekly quiz checkpoints.'
  },
  {
    id: 'doc-lp-3',
    title: 'Digital Signal Processing - Lecture Schedule & Lesson Plan',
    type: 'lesson_plan',
    branch: 'ECE',
    semester: 5,
    subjectCode: 'EC501PC',
    subjectName: 'Digital Signal Processing',
    academicYear: '2024-25',
    uploadedBy: 'Dr. K. Venkat Rao (HOD ECE)',
    uploaderEmpId: 'KMCE-ECE-001',
    uploadDate: '2025-01-06',
    fileSize: '780 KB',
    fileUrl: 'https://kmce.edu.in/portal/lessonplans/EC501PC-LessonPlan.pdf',
    downloadCount: 110,
    curriculum: 'R25',
    description: 'Detailed 55-lecture lesson plan with MATLAB DSP toolbox experiments and filter simulation assignments.'
  },
  // Internal Exam Schedules
  {
    id: 'doc-sched-1',
    title: 'B.Tech IV Semester (CSE/CSM/ECE) - Mid-II Examination Time Table (March 2025)',
    type: 'internal_schedule',
    branch: 'ALL',
    semester: 4,
    subjectCode: 'EXAM-MID2-IV-SEM',
    subjectName: 'B.Tech IV Sem Mid-II Central Schedule',
    academicYear: '2024-25',
    uploadedBy: 'KMCE Examination Cell / Chief Superintendent',
    uploaderEmpId: 'KMCE-ADMIN-EXAM',
    uploadDate: '2025-03-01',
    fileSize: '650 KB',
    fileUrl: 'https://kmce.edu.in/portal/schedules/Mid2-IV-Sem-TimeTable.pdf',
    downloadCount: 890,
    curriculum: 'R25',
    examDate: '24-03-2025 to 29-03-2025',
    description: 'Official Mid-II schedule: Session 1 (10:00 AM - 12:00 PM) and Session 2 (02:00 PM - 04:00 PM). Seating plans will be pasted in Exam Control Room.'
  },
  {
    id: 'doc-sched-2',
    title: 'B.Tech VI Semester (CSE/CSM/ECE) - Mid-I Examination Schedule',
    type: 'internal_schedule',
    branch: 'ALL',
    semester: 6,
    subjectCode: 'EXAM-MID1-VI-SEM',
    subjectName: 'B.Tech VI Sem Mid-I Central Schedule',
    academicYear: '2024-25',
    uploadedBy: 'KMCE Examination Cell',
    uploaderEmpId: 'KMCE-ADMIN-EXAM',
    uploadDate: '2025-02-05',
    fileSize: '580 KB',
    fileUrl: 'https://kmce.edu.in/portal/schedules/Mid1-VI-Sem-TimeTable.pdf',
    downloadCount: 640,
    curriculum: 'R25',
    examDate: '17-02-2025 to 22-02-2025',
    description: 'Official schedule for 3rd Year B.Tech students. Hall tickets and college ID cards mandatory.'
  }
];

export const INITIAL_COURSES: CourseListing[] = [
  {
    id: 'crs-cse-401',
    courseCode: 'CS402PC',
    courseName: 'Design and Analysis of Algorithms',
    branch: 'CSE',
    semester: 4,
    credits: 3,
    instructorName: 'Dr. P. Murali Krishna',
    instructorEmpId: 'KMCE-CSE-001',
    department: 'CSE',
    totalLectures: 48,
    modules: [
      { unit: 1, title: 'Introduction & Asymptotic Analysis', topics: ['Algorithm definition', 'Space/Time complexity', 'Big-O, Omega, Theta', 'Amortized analysis'], hours: 9 },
      { unit: 2, title: 'Divide and Conquer & Greedy Method', topics: ['Merge Sort', 'Quick Sort', 'Strassen Matrix Mult', 'Knapsack', 'MST Prim/Kruskal'], hours: 10 },
      { unit: 3, title: 'Dynamic Programming', topics: ['Matrix Chain Multiplication', '0/1 Knapsack', 'All Pairs Shortest Path (Floyd)', 'Travelling Salesperson'], hours: 11 },
      { unit: 4, title: 'Backtracking & Branch-and-Bound', topics: ['N-Queens Problem', 'Graph Coloring', 'Hamiltonian Cycles', 'FIFO/LC Branch and Bound'], hours: 9 },
      { unit: 5, title: 'NP-Hard and NP-Complete Problems', topics: ['Basic concepts', 'Non-deterministic algorithms', 'Cook’s Theorem', 'NP-Complete reductions'], hours: 9 }
    ],
    referenceBooks: ['Introduction to Algorithms - Cormen, Leiserson, Rivest (MIT Press)', 'Fundamentals of Computer Algorithms - Ellis Horowitz, Sartaj Sahni']
  },
  {
    id: 'crs-cse-402',
    courseCode: 'CS403PC',
    courseName: 'Database Management Systems',
    branch: 'CSE',
    semester: 4,
    credits: 3,
    instructorName: 'Prof. Ananya Varma',
    instructorEmpId: 'KMCE-CSE-004',
    department: 'CSE',
    totalLectures: 45,
    modules: [
      { unit: 1, title: 'Database System Concepts & ER Model', topics: ['Architecture', 'Data Independence', 'ER Diagrams', 'Relational Model'], hours: 9 },
      { unit: 2, title: 'Relational Algebra & SQL', topics: ['Select, Project, Joins', 'Complex SQL Queries', 'Triggers & Stored Procedures', 'Views'], hours: 9 },
      { unit: 3, title: 'Schema Refinement & Normal Forms', topics: ['Functional Dependencies', '1NF, 2NF, 3NF', 'Boyce-Codd Normal Form (BCNF)', 'Lossless join & Dependency preservation'], hours: 10 },
      { unit: 4, title: 'Transaction Management & Concurrency', topics: ['ACID Properties', 'Serializability', '2-Phase Locking Protocol', 'Deadlock Detection'], hours: 9 },
      { unit: 5, title: 'Storage, Indexing & Query Processing', topics: ['B+ Trees Indexing', 'Hashing', 'Query Optimization', 'Recovery Mechanisms'], hours: 8 }
    ],
    referenceBooks: ['Database System Concepts - Silberschatz, Korth, Sudarshan', 'Database Management Systems - Raghu Ramakrishnan']
  },
  {
    id: 'crs-csm-501',
    courseCode: 'AI501PC',
    courseName: 'Machine Learning & Foundations',
    branch: 'CSM',
    semester: 5,
    credits: 4,
    instructorName: 'Dr. S. Radhika Devi',
    instructorEmpId: 'KMCE-CSM-001',
    department: 'CSM',
    totalLectures: 52,
    modules: [
      { unit: 1, title: 'Supervised Learning & Regression', topics: ['Linear Regression', 'Cost Functions', 'Gradient Descent', 'Polynomial Regression', 'Regularization (L1/L2)'], hours: 11 },
      { unit: 2, title: 'Classification & Tree Models', topics: ['Logistic Regression', 'Support Vector Machines (SVM)', 'Decision Trees (ID3/C4.5)', 'Random Forests'], hours: 11 },
      { unit: 3, title: 'Probabilistic Models & Clustering', topics: ['Bayes Theorem', 'Naive Bayes Classifier', 'Gaussian Mixture Models', 'K-Means & Hierarchical Clustering'], hours: 10 },
      { unit: 4, title: 'Dimensionality Reduction & PCA', topics: ['Curse of Dimensionality', 'Principal Component Analysis (PCA)', 't-SNE', 'Feature Engineering'], hours: 10 },
      { unit: 5, title: 'Neural Networks & Evaluation', topics: ['Perceptrons', 'Multi-layer Perceptron (MLP)', 'Backpropagation', 'ROC-AUC & Confusion Matrix'], hours: 10 }
    ],
    referenceBooks: ['Pattern Recognition and Machine Learning - Christopher Bishop', 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow - Aurélien Géron']
  },
  {
    id: 'crs-csm-601',
    courseCode: 'AI602PC',
    courseName: 'Deep Learning & Neural Architectures',
    branch: 'CSM',
    semester: 6,
    credits: 3,
    instructorName: 'Dr. Rajeshwar Reddy',
    instructorEmpId: 'KMCE-CSM-003',
    department: 'CSM',
    totalLectures: 46,
    modules: [
      { unit: 1, title: 'Deep Neural Networks Optimization', topics: ['Vanishing Gradient', 'Adam/RMSprop Optimizers', 'Batch Normalization', 'Dropout'], hours: 9 },
      { unit: 2, title: 'Convolutional Neural Networks (CNN)', topics: ['Conv Layers, Pooling', 'ResNet, VGG, MobileNet', 'Object Detection (YOLO)'], hours: 10 },
      { unit: 3, title: 'Recurrent Networks & Sequences', topics: ['RNN, LSTM, GRU', 'Vanishing gradients in sequences', 'Seq2Seq with Attention'], hours: 9 },
      { unit: 4, title: 'Transformer Architectures', topics: ['Self-Attention mechanism', 'Multi-Head Attention', 'BERT & GPT foundations'], hours: 10 },
      { unit: 5, title: 'Generative Deep Learning', topics: ['Autoencoders', 'Variational Autoencoders (VAE)', 'Generative Adversarial Networks (GAN)'], hours: 8 }
    ],
    referenceBooks: ['Deep Learning - Ian Goodfellow, Yoshua Bengio, Aaron Courville (MIT Press)']
  },
  {
    id: 'crs-ece-501',
    courseCode: 'EC501PC',
    courseName: 'Digital Signal Processing',
    branch: 'ECE',
    semester: 5,
    credits: 4,
    instructorName: 'Dr. K. Venkat Rao',
    instructorEmpId: 'KMCE-ECE-001',
    department: 'ECE',
    totalLectures: 50,
    modules: [
      { unit: 1, title: 'Discrete-Time Signals & Systems', topics: ['LTI Systems', 'Z-Transform properties', 'Frequency analysis of LTI systems'], hours: 10 },
      { unit: 2, title: 'Discrete Fourier Transform (DFT) & FFT', topics: ['Properties of DFT', 'Circular Convolution', 'Radix-2 DIT & DIF FFT algorithms'], hours: 10 },
      { unit: 3, title: 'IIR Digital Filter Design', topics: ['Butterworth & Chebyshev approximation', 'Bilinear transformation', 'Impulse invariance method'], hours: 11 },
      { unit: 4, title: 'FIR Digital Filter Design', topics: ['Linear phase characteristics', 'Windowing techniques (Hamming, Hanning, Kaiser)', 'Frequency sampling method'], hours: 10 },
      { unit: 5, title: 'Multirate DSP & Architectures', topics: ['Decimation & Interpolation', 'Filter Banks', 'DSP Processor architecture (TMS320C54x)'], hours: 9 }
    ],
    referenceBooks: ['Digital Signal Processing: Principles, Algorithms & Applications - John G. Proakis, Dimitris G. Manolakis']
  },
  {
    id: 'crs-ece-502',
    courseCode: 'EC502PC',
    courseName: 'Microprocessors & Microcontrollers',
    branch: 'ECE',
    semester: 5,
    credits: 3,
    instructorName: 'Prof. M. Sreenivasa Chary',
    instructorEmpId: 'KMCE-ECE-005',
    department: 'ECE',
    totalLectures: 45,
    modules: [
      { unit: 1, title: '8086 Microprocessor Architecture', topics: ['Internal Architecture', 'Register Organization', 'Memory Segmentation', 'Addressing Modes'], hours: 9 },
      { unit: 2, title: '8086 Assembly Language Programming', topics: ['Instruction Set', 'Assembler Directives', 'Procedures & Macros', 'Interrupts'], hours: 9 },
      { unit: 3, title: 'Peripheral Interfacing', topics: ['8255 PPI', '8259 PIC', '8251 USART', 'ADC/DAC Interfacing'], hours: 9 },
      { unit: 4, title: '8051 Microcontroller Architecture', topics: ['Pin Diagram', 'SFRs', 'Timers & Counters', 'Serial Communication'], hours: 9 },
      { unit: 5, title: 'ARM Cortex-M Architecture', topics: ['ARM Cortex Profile', 'Thumb-2 Technology', 'Memory Map & GPIO Programming'], hours: 9 }
    ],
    referenceBooks: ['Microprocessors and Interfacing - Douglas V. Hall', 'The 8051 Microcontroller and Embedded Systems - Muhammad Ali Mazidi']
  }
];

export const JNTUH_R25_QUIZZES: QuizDefinition[] = [
  {
    id: 'quiz-cse-1',
    title: 'JNTUH R25 Design & Analysis of Algorithms Mastery Test',
    branch: 'CSE',
    semester: 4,
    subjectCode: 'CS402PC',
    subjectName: 'Design and Analysis of Algorithms',
    topic: 'Dynamic Programming & Graph Algorithms',
    curriculum: 'R25',
    difficulty: 'Medium',
    durationMinutes: 15,
    totalMarks: 20,
    questions: [
      {
        id: 'q-cse-101',
        question: 'What is the time complexity of solving the 0/1 Knapsack problem with n items and maximum capacity W using Dynamic Programming?',
        options: ['O(n log n)', 'O(n * W)', 'O(2^n)', 'O(n^2)'],
        correctAnswer: 1,
        explanation: 'The Dynamic Programming approach builds a 2D table of size (n+1) x (W+1), iterating through all items and weights, making the time complexity pseudo-polynomial O(n * W).',
        topic: 'Dynamic Programming',
        difficulty: 'Medium'
      },
      {
        id: 'q-cse-102',
        question: 'Which algorithmic paradigm does Floyd-Warshall All-Pairs Shortest Path algorithm utilize?',
        options: ['Divide and Conquer', 'Greedy Method', 'Dynamic Programming', 'Branch and Bound'],
        correctAnswer: 2,
        explanation: 'Floyd-Warshall uses Dynamic Programming with the recurrence: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) over all intermediate vertices k.',
        topic: 'Graph Algorithms',
        difficulty: 'Easy'
      },
      {
        id: 'q-cse-103',
        question: 'In Kruskal’s Minimum Spanning Tree algorithm, which data structure is optimal for cycle detection during edge inclusion?',
        options: ['Priority Queue / Min Heap', 'Disjoint Set Union (Union-Find) with Path Compression', 'Adjacency Matrix', 'Red-Black Tree'],
        correctAnswer: 1,
        explanation: 'Disjoint Set Union (DSU) with union by rank and path compression allows find and union operations in nearly O(alpha(V)) time, preventing cycles in O(E log V) total time.',
        topic: 'Greedy Method',
        difficulty: 'Medium'
      },
      {
        id: 'q-cse-104',
        question: 'According to Cook’s Theorem, which of the following is the first known NP-Complete problem?',
        options: ['Travelling Salesperson Problem (TSP)', 'Boolean Satisfiability Problem (SAT)', 'Vertex Cover Problem', '0/1 Knapsack'],
        correctAnswer: 1,
        explanation: 'Stephen Cook (1971) proved that the Boolean Satisfiability (SAT) problem is NP-Complete by reducing any non-deterministic polynomial time Turing machine computation to SAT.',
        topic: 'NP-Completeness',
        difficulty: 'Hard'
      },
      {
        id: 'q-cse-105',
        question: 'What is the space complexity of solving Matrix Chain Multiplication using memoized dynamic programming for n matrices?',
        options: ['O(n)', 'O(n^2)', 'O(n^3)', 'O(2^n)'],
        correctAnswer: 1,
        explanation: 'Matrix Chain Multiplication requires an n x n table m[i][j] to store optimal costs for multiplying matrix chain A_i ... A_j, yielding O(n^2) space complexity.',
        topic: 'Dynamic Programming',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'quiz-csm-1',
    title: 'JNTUH R25 Machine Learning: Supervised & Neural Models',
    branch: 'CSM',
    semester: 5,
    subjectCode: 'AI501PC',
    subjectName: 'Machine Learning & Foundations',
    topic: 'Supervised Learning & Regularization',
    curriculum: 'R25',
    difficulty: 'Medium',
    durationMinutes: 15,
    totalMarks: 20,
    questions: [
      {
        id: 'q-csm-101',
        question: 'Which regularization technique induces sparsity by driving unimportant feature weights strictly to zero?',
        options: ['L2 Regularization (Ridge)', 'L1 Regularization (Lasso)', 'Elastic Net with alpha=0', 'Dropout'],
        correctAnswer: 1,
        explanation: 'L1 (Lasso) penalty adds lambda * sum(|w_i|). Its diamond-shaped constraint contour touches axes first, causing non-informative weights to become exactly 0 (feature selection).',
        topic: 'Regularization',
        difficulty: 'Easy'
      },
      {
        id: 'q-csm-102',
        question: 'In Decision Trees, what formula computes the Gini Impurity for a dataset with K classes where p_i is probability of class i?',
        options: ['- sum(p_i * log2(p_i))', '1 - sum(p_i^2)', 'sum(p_i * (1 - p_i)^2)', 'sqrt(sum(p_i^2))'],
        correctAnswer: 1,
        explanation: 'Gini Impurity is given by 1 - sum(p_i^2) for i = 1 to K. For a pure node (p_1 = 1), Gini is 0.',
        topic: 'Decision Trees',
        difficulty: 'Medium'
      },
      {
        id: 'q-csm-103',
        question: 'Which kernel trick transformation maps 2D data into an infinite-dimensional feature space in Support Vector Machines (SVM)?',
        options: ['Polynomial Kernel', 'Linear Kernel', 'Radial Basis Function (RBF) / Gaussian Kernel', 'Sigmoid Kernel'],
        correctAnswer: 2,
        explanation: 'The RBF / Gaussian kernel K(x, x\') = exp(-gamma * ||x - x\'||^2) corresponds to an inner product in an infinite-dimensional Hilbert space via Taylor series expansion.',
        topic: 'Support Vector Machines',
        difficulty: 'Hard'
      },
      {
        id: 'q-csm-104',
        question: 'What happens to Bias and Variance when the maximum depth of a Decision Tree is increased excessively?',
        options: ['High Bias, High Variance', 'Low Bias, High Variance (Overfitting)', 'High Bias, Low Variance (Underfitting)', 'Low Bias, Low Variance'],
        correctAnswer: 1,
        explanation: 'A deep decision tree memorizes training points, leading to low training error (low bias) but very high sensitivity to minor sample fluctuations (high variance/overfitting).',
        topic: 'Bias-Variance Tradeoff',
        difficulty: 'Medium'
      },
      {
        id: 'q-csm-105',
        question: 'In Principal Component Analysis (PCA), the principal components correspond to which mathematical vectors of the covariance matrix?',
        options: ['Eigenvectors with largest eigenvalues', 'Singular values with lowest magnitudes', 'Orthogonal projection residues', 'Gradient vectors'],
        correctAnswer: 0,
        explanation: 'PCA computes eigenvectors of the data covariance matrix sorted in descending order of their corresponding eigenvalues, capturing directions of maximum variance.',
        topic: 'Dimensionality Reduction',
        difficulty: 'Hard'
      }
    ]
  },
  {
    id: 'quiz-ece-1',
    title: 'JNTUH R25 Digital Signal Processing & Filter Design Challenge',
    branch: 'ECE',
    semester: 5,
    subjectCode: 'EC501PC',
    subjectName: 'Digital Signal Processing',
    topic: 'DFT, FFT & IIR/FIR Filter Design',
    curriculum: 'R25',
    difficulty: 'Hard',
    durationMinutes: 15,
    totalMarks: 20,
    questions: [
      {
        id: 'q-ece-101',
        question: 'How many complex multiplications are required to compute an N-point DFT using Radix-2 Decimation-in-Time (DIT) FFT compared to direct DFT computation?',
        options: ['(N/2) log2(N) vs N^2', 'N log2(N) vs 2N', 'N^2 log2(N) vs N^3', '(N/4) vs N^2'],
        correctAnswer: 0,
        explanation: 'Radix-2 FFT reduces complex multiplications from N^2 (direct DFT) to (N/2) * log2(N) by exploiting periodicity and symmetry properties of the twiddle factor W_N.',
        topic: 'FFT Algorithms',
        difficulty: 'Medium'
      },
      {
        id: 'q-ece-102',
        question: 'In Bilinear Transformation method of digital IIR filter design, which nonlinear phenomenon occurs between analog frequency (Omega) and digital frequency (omega)?',
        options: ['Frequency Aliasing', 'Frequency Warping (Omega = 2/T * tan(omega/2))', 'Gibbs Phenomenon', 'Limit Cycle Oscillation'],
        correctAnswer: 1,
        explanation: 'The mapping s = (2/T) * ((1 - z^-1)/(1 + z^-1)) compresses the entire infinite j-Omega axis into the unit circle [-pi, pi], producing frequency warping.',
        topic: 'IIR Filters',
        difficulty: 'Hard'
      },
      {
        id: 'q-ece-103',
        question: 'Which window function offers the highest main-lobe sharpness (lowest transition width) among the standard fixed FIR windows, but has the highest side-lobe level (-13 dB)?',
        options: ['Blackman Window', 'Hamming Window', 'Rectangular Window', 'Kaiser Window'],
        correctAnswer: 2,
        explanation: 'The Rectangular window has the narrowest main lobe (4*pi/N) but the poorest side-lobe attenuation (-13 dB), leading to significant Gibbs ringing.',
        topic: 'FIR Windows',
        difficulty: 'Medium'
      },
      {
        id: 'q-ece-104',
        question: 'What is the condition for a digital FIR filter to possess strictly linear phase?',
        options: ['Its impulse response must be symmetric or anti-symmetric: h(n) = +/- h(N-1-n)', 'Its poles must lie exactly on the unit circle', 'All zeros must be located at z = 0', 'It must be an all-pass filter'],
        correctAnswer: 0,
        explanation: 'Linear phase in FIR filters requires the impulse response h(n) to exhibit symmetry h(n) = h(N-1-n) or anti-symmetry h(n) = -h(N-1-n), ensuring constant group delay.',
        topic: 'FIR Linear Phase',
        difficulty: 'GATE Level'
      },
      {
        id: 'q-ece-105',
        question: 'If an analog pole is located at s = -2 in the left half s-plane, where does it map in the z-plane under Impulse Invariance Transformation with sampling period T = 0.5s?',
        options: ['z = e^-1 approx 0.368 (inside unit circle)', 'z = e^2 approx 7.389 (outside unit circle)', 'z = -1 on unit circle', 'z = 0'],
        correctAnswer: 0,
        explanation: 'Impulse Invariance maps s_p to z_p = e^(s_p * T). With s = -2 and T = 0.5, z = e^(-2 * 0.5) = e^-1 approx 0.368, safely inside the unit circle |z| < 1 (stable).',
        topic: 'Filter Mapping',
        difficulty: 'GATE Level'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: 'notif-1',
    title: '📢 Mid-II Examination Timetable Released (R25 Regulations)',
    message: 'The central examination branch has published the official Mid-II timetable for B.Tech IV & VI Semesters starting from March 24, 2025. Download your subject-wise schedule.',
    category: 'exam',
    priority: 'urgent',
    timestamp: '10 mins ago',
    read: false,
    targetBranch: 'ALL',
    targetSemester: 4
  },
  {
    id: 'notif-2',
    title: '⚡ Real-Time Schedule Update: DAA Lab Relocated',
    message: 'Prof. Dr. P. Murali Krishna: CSE Section A DAA Lab (CS408PC) on Thursday has been shifted to High Performance Computing Lab (Block-A, Room A-302).',
    category: 'schedule',
    priority: 'high',
    timestamp: '1 hour ago',
    read: false,
    targetBranch: 'CSE',
    targetSemester: 4
  },
  {
    id: 'notif-3',
    title: '🎯 New Topic-Wise R25 Quiz Activated: Deep Learning CNNs',
    message: 'Dr. S. Radhika Devi uploaded a new 15-minute challenge quiz on Convolutional Neural Networks and Optimization. Test your mastery and track score analytics.',
    category: 'quiz',
    priority: 'normal',
    timestamp: '3 hours ago',
    read: false,
    targetBranch: 'CSM',
    targetSemester: 6
  },
  {
    id: 'notif-4',
    title: '⚠️ Attendance Condonation Notice - Sem Midpoint Check',
    message: 'Students with attendance below 75% are advised to check the Attendance Tracker and consult their respective Faculty Mentors before Mid-II exams.',
    category: 'attendance',
    priority: 'high',
    timestamp: 'Yesterday',
    read: true,
    targetBranch: 'ALL'
  }
];

export const DEFAULT_ATTENDANCE_DATA: Record<string, AttendanceRecord[]> = {
  'CSE': [
    { id: 'att-1', subjectCode: 'CS402PC', subjectName: 'Design & Analysis of Algorithms', branch: 'CSE', semester: 4, facultyName: 'Dr. P. Murali Krishna', totalClasses: 42, attendedClasses: 36, percentage: 85.7, type: 'Theory', lastUpdated: 'Today' },
    { id: 'att-2', subjectCode: 'CS403PC', subjectName: 'Database Management Systems', branch: 'CSE', semester: 4, facultyName: 'Prof. Ananya Varma', totalClasses: 38, attendedClasses: 32, percentage: 84.2, type: 'Theory', lastUpdated: 'Today' },
    { id: 'att-3', subjectCode: 'CS404PC', subjectName: 'Operating Systems & Architecture', branch: 'CSE', semester: 4, facultyName: 'Prof. G. Ramesh', totalClasses: 40, attendedClasses: 28, percentage: 70.0, type: 'Theory', lastUpdated: 'Yesterday' },
    { id: 'att-4', subjectCode: 'CS405PC', subjectName: 'Discrete Mathematics & Logic', branch: 'CSE', semester: 4, facultyName: 'Dr. V. Shanthi', totalClasses: 36, attendedClasses: 31, percentage: 86.1, type: 'Theory', lastUpdated: '2 days ago' },
    { id: 'att-5', subjectCode: 'CS408PC', subjectName: 'Algorithms & DBMS Lab', branch: 'CSE', semester: 4, facultyName: 'Dr. P. Murali Krishna', totalClasses: 14, attendedClasses: 13, percentage: 92.8, type: 'Lab', lastUpdated: 'This week' }
  ],
  'CSM': [
    { id: 'att-6', subjectCode: 'AI501PC', subjectName: 'Machine Learning & Foundations', branch: 'CSM', semester: 5, facultyName: 'Dr. S. Radhika Devi', totalClasses: 44, attendedClasses: 39, percentage: 88.6, type: 'Theory', lastUpdated: 'Today' },
    { id: 'att-7', subjectCode: 'AI502PC', subjectName: 'Artificial Intelligence Search & Logic', branch: 'CSM', semester: 5, facultyName: 'Dr. Rajeshwar Reddy', totalClasses: 40, attendedClasses: 31, percentage: 77.5, type: 'Theory', lastUpdated: 'Yesterday' },
    { id: 'att-8', subjectCode: 'AI503PC', subjectName: 'Data Analytics with Python', branch: 'CSM', semester: 5, facultyName: 'Prof. K. Swathi', totalClasses: 36, attendedClasses: 32, percentage: 88.8, type: 'Theory', lastUpdated: 'Today' },
    { id: 'att-9', subjectCode: 'AI508PC', subjectName: 'AI & Machine Learning Lab', branch: 'CSM', semester: 5, facultyName: 'Dr. S. Radhika Devi', totalClasses: 12, attendedClasses: 11, percentage: 91.6, type: 'Lab', lastUpdated: 'This week' }
  ],
  'ECE': [
    { id: 'att-10', subjectCode: 'EC501PC', subjectName: 'Digital Signal Processing', branch: 'ECE', semester: 5, facultyName: 'Dr. K. Venkat Rao', totalClasses: 45, attendedClasses: 38, percentage: 84.4, type: 'Theory', lastUpdated: 'Today' },
    { id: 'att-11', subjectCode: 'EC502PC', subjectName: 'Microprocessors & Microcontrollers', branch: 'ECE', semester: 5, facultyName: 'Prof. M. Sreenivasa Chary', totalClasses: 42, attendedClasses: 29, percentage: 69.0, type: 'Theory', lastUpdated: 'Yesterday' },
    { id: 'att-12', subjectCode: 'EC503PC', subjectName: 'Antennas & Wave Propagation', branch: 'ECE', semester: 5, facultyName: 'Dr. T. Sudhakar', totalClasses: 38, attendedClasses: 33, percentage: 86.8, type: 'Theory', lastUpdated: '2 days ago' },
    { id: 'att-13', subjectCode: 'EC508PC', subjectName: 'DSP & Microcontroller Lab', branch: 'ECE', semester: 5, facultyName: 'Prof. M. Sreenivasa Chary', totalClasses: 14, attendedClasses: 14, percentage: 100.0, type: 'Lab', lastUpdated: 'This week' }
  ]
};



export const INITIAL_ACADEMIC_DOCUMENTS = INITIAL_DOCUMENTS;
export const KMCE_COURSES_CATALOG = INITIAL_COURSES;
export const DEFAULT_NOTIFICATIONS = INITIAL_NOTIFICATIONS;


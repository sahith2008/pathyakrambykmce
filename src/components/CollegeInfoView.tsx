import React from 'react';
import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  School,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { KMCE_COLLEGE_INFO } from '../data/mockData';
import kmceCampusImg from '../assets/images/kmce_campus_photo_real_1788079482219.jpg';

export const CollegeInfoView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Campus Photo Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-[#800020] text-white">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={kmceCampusImg}
            alt="KMCE Hyderabad Campus with White & Maroon Blocks"
            className="w-full h-full object-cover opacity-75 hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#36000d]/90 via-[#800020]/40 to-black/20" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
                  {KMCE_COLLEGE_INFO.counselingCode}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold border border-white/30">
                  NAAC & NBA Accredited
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold border border-white/30">
                  JNTUH R25 Autonomous
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
                {KMCE_COLLEGE_INFO.name}
              </h1>
              <p className="text-xs sm:text-sm text-rose-100/90 mt-1 max-w-xl">
                {KMCE_COLLEGE_INFO.affiliation}
              </p>
            </div>

            <a
              href={KMCE_COLLEGE_INFO.website}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-white text-[#800020] hover:bg-rose-50 font-bold text-xs shadow-md transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>Official College Portal</span>
            </a>
          </div>
        </div>
      </div>

      {/* College Heritage & Autonomous Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-[#800020] dark:text-rose-400 flex items-center justify-center font-bold">
            <School className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Keshav Memorial Educational Society
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {KMCE_COLLEGE_INFO.tagline}. Established with a vision to deliver world-class engineering education and technological competence.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-[#800020] dark:text-rose-400 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Autonomous R25 Curriculum
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Pioneering the advanced JNTUH R25 curriculum with industry internships, AI and ML skill specializations, and digital examination repositories.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-[#800020] dark:text-rose-400 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Designated Engineering Programs
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Offering accredited 4-year B.Tech degrees in Computer Science (CSE), CSE Artificial Intelligence & Machine Learning (CSM), and Electronics & Communication (ECE).
          </p>
        </div>
      </div>

      {/* Campus Infrastructure Highlights */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#800020] dark:text-rose-400" />
          <span>KMCE Campus & Academic Infrastructure</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {KMCE_COLLEGE_INFO.campusHighlights.map((hl, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-[#800020] dark:text-rose-400 shrink-0 mt-0.5" />
              <span>{hl}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Official Directory & Contact Information */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#800020] dark:text-rose-400" />
          <span>Administrative Contact & Location Information</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-[#800020] dark:text-rose-400">
              Campus Address:
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>{KMCE_COLLEGE_INFO.name}</strong><br />
              {KMCE_COLLEGE_INFO.address}<br />
              {KMCE_COLLEGE_INFO.city}, {KMCE_COLLEGE_INFO.state} - {KMCE_COLLEGE_INFO.pincode}
            </p>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{KMCE_COLLEGE_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{KMCE_COLLEGE_INFO.phone}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-[#800020] dark:text-rose-400">
              Examination & Academic Helpdesk:
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              For queries regarding question papers, internal exam timetables, attendance condonation, or hall tickets:
            </p>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{KMCE_COLLEGE_INFO.examBranchEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Room No. 104, Administrative Block, KMCE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

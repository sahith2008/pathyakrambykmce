import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  HelpCircle,
  MinusCircle,
  PlusCircle,
  ShieldCheck,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import { AttendanceRecord, BranchCode, StudentProfile } from '../types';
import { DEFAULT_ATTENDANCE_DATA } from '../data/mockData';

interface AttendanceTrackerViewProps {
  currentStudent: StudentProfile | null;
  userBranch?: BranchCode;
}

export const AttendanceTrackerView: React.FC<AttendanceTrackerViewProps> = ({
  currentStudent,
  userBranch = 'CSE',
}) => {
  const branchKey = currentStudent?.branch || userBranch || 'CSE';
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>(
    DEFAULT_ATTENDANCE_DATA[branchKey] || DEFAULT_ATTENDANCE_DATA['CSE']
  );

  // Overall Statistics Calculation
  const totalConducted = attendanceList.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const totalAttended = attendanceList.reduce((acc, curr) => acc + curr.attendedClasses, 0);
  const overallPercentage = totalConducted > 0 ? Number(((totalAttended / totalConducted) * 100).toFixed(1)) : 0;

  // Safe Bunks / Classes Required Calculation Helper for 75% Target
  const calculateAttendanceAdvice = (attended: number, total: number) => {
    if (total === 0) return { status: 'safe', text: 'No classes conducted yet.' };

    const currentPct = (attended / total) * 100;
    if (currentPct >= 75) {
      // How many future classes can student miss while staying >= 75%?
      // (attended) / (total + x) >= 0.75 => total + x <= attended / 0.75 => x <= (attended / 0.75) - total
      const safeMisses = Math.floor(attended / 0.75 - total);
      return {
        status: 'safe',
        safeCount: safeMisses,
        text: safeMisses > 0
          ? `You can safely miss ${safeMisses} more class${safeMisses > 1 ? 'es' : ''} and still maintain >= 75% attendance.`
          : `You are exactly at the 75% threshold! Do not miss the next class.`
      };
    } else {
      // How many consecutive future classes must student attend to reach 75%?
      // (attended + y) / (total + y) >= 0.75 => attended + y >= 0.75 * total + 0.75 * y => 0.25 * y >= 0.75 * total - attended => y = ceil((0.75 * total - attended) / 0.25)
      const needed = Math.ceil((0.75 * total - attended) / 0.25);
      return {
        status: 'warning',
        neededCount: needed,
        text: `Condonation Risk: You must attend the next ${needed} consecutive class${needed > 1 ? 'es' : ''} to reach 75%.`
      };
    }
  };

  const handleMarkAttendance = (id: string, isPresent: boolean) => {
    setAttendanceList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newAttended = isPresent ? item.attendedClasses + 1 : item.attendedClasses;
          const newTotal = item.totalClasses + 1;
          const newPct = Number(((newAttended / newTotal) * 100).toFixed(1));
          return {
            ...item,
            attendedClasses: newAttended,
            totalClasses: newTotal,
            percentage: newPct,
            lastUpdated: 'Just now',
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-[#800020] dark:bg-[#4a0013] text-white shadow-lg border border-[#68001a]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-rose-100 border border-white/30 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Automated JNTUH Condonation Engine
              </span>
              <span className="text-xs text-rose-100">
                Regulation Minimum: <strong>75%</strong> (65% with Medical Condonation)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-light">
              Automated Attendance Tracker <span className="font-bold">& Safe-Bunk Calculator</span>
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/90 mt-1 max-w-xl">
              Live attendance tracking for <strong>{currentStudent?.name || 'KMCE Student'}</strong> ({currentStudent?.hallticket || '23KM1A0542'}). Real-time calculation of safe leaves without risking exam hall ticket detention.
            </p>
          </div>

          {/* Big Overall Percentage Gauge */}
          <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/25 shrink-0">
            <div className="text-right">
              <span className="text-xs text-rose-100 block">Overall Aggregate</span>
              <span className="text-3xl font-extrabold font-heading text-white">
                {overallPercentage}%
              </span>
              <span
                className={`text-[10px] font-bold block uppercase tracking-wider ${
                  overallPercentage >= 75 ? 'text-emerald-300' : overallPercentage >= 65 ? 'text-amber-300' : 'text-rose-200'
                }`}
              >
                {overallPercentage >= 75 ? 'Eligible for Exams' : overallPercentage >= 65 ? 'Condonation Required' : 'Critical Shortage'}
              </span>
            </div>
            <div className="w-14 h-14 rounded-full border-4 flex items-center justify-center font-bold text-sm bg-white/10"
                 style={{
                   borderColor: overallPercentage >= 75 ? '#34d399' : overallPercentage >= 65 ? '#fbbf24' : '#f87171'
                 }}>
              {overallPercentage >= 75 ? (
                <CheckCircle2 className="w-7 h-7 text-emerald-300" />
              ) : (
                <AlertTriangle className="w-7 h-7 text-amber-300" />
              )}
            </div>
          </div>
        </div>
        <div className="absolute right-[-40px] top-[-40px] w-64 h-64 bg-rose-400/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-semibold">Total Periods</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {totalConducted}
          </div>
          <span className="text-[11px] text-slate-400">Conducted to date</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-semibold">Classes Attended</span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {totalAttended}
          </div>
          <span className="text-[11px] text-emerald-600/80 font-medium">Present in session</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-semibold">Classes Missed</span>
          <div className="text-xl sm:text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
            {totalConducted - totalAttended}
          </div>
          <span className="text-[11px] text-rose-600/80 font-medium">Leaves / Absences</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-semibold">Status Rating</span>
          <div className="text-base sm:text-lg font-bold text-[#800020] dark:text-rose-400 mt-1 truncate">
            {overallPercentage >= 75 ? 'Safe Standing' : 'Action Required'}
          </div>
          <span className="text-[11px] text-slate-400">JNTUH R25 Portal</span>
        </div>
      </div>

      {/* Subject-Wise Attendance Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Subject-Wise Attendance & Safe Bunk Analytics
          </h3>
          <span className="text-xs text-slate-500">
            Click (+ / -) to simulate attendance logging
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attendanceList.map((record) => {
            const advice = calculateAttendanceAdvice(record.attendedClasses, record.totalClasses);
            const isSafe = record.percentage >= 75;

            return (
              <div
                key={record.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs font-mono-code font-bold text-[#800020] dark:text-rose-400">
                        {record.subjectCode}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {record.subjectName}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Faculty: {record.facultyName}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-xl font-extrabold ${
                          record.percentage >= 75
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : record.percentage >= 65
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {record.percentage}%
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        {record.attendedClasses} / {record.totalClasses} classes
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden my-3">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        record.percentage >= 75
                          ? 'bg-emerald-500'
                          : record.percentage >= 65
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, record.percentage)}%` }}
                    />
                  </div>

                  {/* Safe Bunks / Advice Box */}
                  <div
                    className={`p-2.5 rounded-xl text-xs flex items-start gap-2 ${
                      isSafe
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-900'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-900'
                    }`}
                  >
                    {isSafe ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <span className="leading-snug">{advice.text}</span>
                  </div>
                </div>

                {/* Real-time Simulator Actions */}
                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    Updated: {record.lastUpdated}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMarkAttendance(record.id, true)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-semibold transition-colors cursor-pointer"
                      title="Log Attended Class"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>+ Present</span>
                    </button>
                    <button
                      onClick={() => handleMarkAttendance(record.id, false)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 font-semibold transition-colors cursor-pointer"
                      title="Log Absent Class"
                    >
                      <MinusCircle className="w-3.5 h-3.5" />
                      <span>+ Absent</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

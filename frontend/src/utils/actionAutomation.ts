// Action Automation System
// Handles multi-task execution when an action is triggered
// Each action triggers multiple predictable updates visible to the user

import { toast } from 'react-toastify';

// Define action types
export type ActionType = 
  | 'MARK_CANDIDATE_SCREENED'
  | 'MOVE_CANDIDATE_STAGE'
  | 'ASSIGN_RECRUITER'
  | 'SCHEDULE_INTERVIEW'
  | 'UPDATE_APPLICATION_PRIORITY'
  | 'PROCESS_DAILY_APPLICATIONS'
  | 'MARK_TASK_COMPLETE'
  | 'REFRESH_STATS';

// Define the action payload interface
export interface ActionPayload {
  candidateId?: number;
  recruiterId?: number;
  applicationId?: number;
  stage?: string;
  priority?: string;
  status?: string;
  interviewDate?: string;
  additionalData?: any;
}

// Define the result of an action
export interface ActionResult {
  success: boolean;
  message: string;
  updatedFields: string[];
  affectedComponents: string[];
  timestamp: Date;
}

// Mock data store for tracking state
let applicationData: any[] = [];
let recruiterData: any[] = [];
let candidateData: any[] = [];
let dashboardStats: any = {};

// Initialize with mock data
export const initializeData = () => {
  applicationData = [
    { id: 1, candidateName: 'John Smith', position: 'Software Engineer', status: 'SCREENING', priority: 'HIGH', date: '2025-10-15', recruiterId: null },
    { id: 2, candidateName: 'Sarah Johnson', position: 'Marketing Manager', status: 'REVIEWED', priority: 'MEDIUM', date: '2025-10-14', recruiterId: 1 },
    { id: 3, candidateName: 'Michael Chen', position: 'Full Stack Developer', status: 'SCREENING', priority: 'HIGH', date: '2025-10-12', recruiterId: null },
    { id: 4, candidateName: 'Emma Rodriguez', position: 'UI/UX Designer', status: 'SHORTLISTED', priority: 'LOW', date: '2025-10-10', recruiterId: 2 },
    { id: 5, candidateName: 'David Kim', position: 'Sales Associate', status: 'REJECTED', priority: 'MEDIUM', date: '2025-10-08', recruiterId: 3 }
  ];
  
  recruiterData = [
    { id: 1, name: 'Alex Johnson', taskCount: 3, performance: 85 },
    { id: 2, name: 'Sam Wilson', taskCount: 5, performance: 72 },
    { id: 3, name: 'Taylor Reed', taskCount: 4, performance: 91 }
  ];
  
  candidateData = [
    { id: 1, name: 'John Smith', stage: 'SCREENING', score: 85 },
    { id: 2, name: 'Sarah Johnson', stage: 'REVIEWED', score: 78 },
    { id: 3, name: 'Michael Chen', stage: 'SCREENING', score: 92 },
    { id: 4, name: 'Emma Rodriguez', stage: 'SHORTLISTED', score: 88 },
    { id: 5, name: 'David Kim', stage: 'REJECTED', score: 65 }
  ];
  
  dashboardStats = {
    pendingApplications: 3,
    activeCandidates: 5,
    availablePositions: 12,
    revenueToday: 12500,
    hiringRate: 65,
    recruitersActive: 3,
    pendingInterviews: 4,
    avgResponseTime: 32,
    candidateSatisfaction: 94
  };
};

// Initialize the data store
initializeData();

// Action automation handler
export const executeAction = async (actionType: ActionType, payload: ActionPayload): Promise<ActionResult> => {
  try {
    let updatedFields: string[] = [];
    let affectedComponents: string[] = [];
    let message = '';

    switch (actionType) {
      case 'MARK_CANDIDATE_SCREENED':
        // Update candidate status
        const candidateIndex = candidateData.findIndex(c => c.id === payload.candidateId);
        if (candidateIndex !== -1) {
          candidateData[candidateIndex].stage = 'SCREENED';
          candidateData[candidateIndex].screenedDate = new Date();
          updatedFields.push('candidate.stage', 'candidate.screenedDate');
          affectedComponents.push('candidate-cards', 'dashboard-stats', 'pipeline-view');
        }
        
        // Update application status
        const appIndex = applicationData.findIndex(a => a.id === payload.applicationId);
        if (appIndex !== -1) {
          applicationData[appIndex].status = 'SCREENED';
          updatedFields.push('application.status');
          affectedComponents.push('application-table', 'dashboard-stats');
          
          // Decrement pending applications
          dashboardStats.pendingApplications = Math.max(0, dashboardStats.pendingApplications - 1);
          updatedFields.push('dashboard.pendingApplications');
        }
        
        // Update recruiter workload
        if (payload.recruiterId) {
          const recruiterIndex = recruiterData.findIndex(r => r.id === payload.recruiterId);
          if (recruiterIndex !== -1) {
            recruiterData[recruiterIndex].taskCount = Math.max(0, recruiterData[recruiterIndex].taskCount - 1);
            updatedFields.push('recruiter.taskCount');
            affectedComponents.push('recruiter-table', 'dashboard-stats');
          }
        }
        
        // Update badge/score
        if (candidateIndex !== -1) {
          candidateData[candidateIndex].screeningScore = Math.min(100, candidateData[candidateIndex].score + 5);
          updatedFields.push('candidate.screeningScore');
        }
        
        message = `Candidate ${candidateData[candidateIndex]?.name || 'Unknown'} marked as screened`;
        toast.success(message);
        break;

      case 'MOVE_CANDIDATE_STAGE':
        // Update candidate stage
        const cIndex = candidateData.findIndex(c => c.id === payload.candidateId);
        if (cIndex !== -1) {
          const oldStage = candidateData[cIndex].stage;
          candidateData[cIndex].stage = payload.stage || 'REVIEWED';
          updatedFields.push('candidate.stage');
          affectedComponents.push('candidate-cards', 'pipeline-view');
          
          // Update application status
          const appIndex2 = applicationData.findIndex(a => a.id === payload.applicationId);
          if (appIndex2 !== -1) {
            applicationData[appIndex2].status = payload.stage;
            updatedFields.push('application.status');
            affectedComponents.push('application-table');
          }
          
          // Color-code urgency based on stage
          if (payload.stage === 'URGENT') {
            dashboardStats.pendingApplications += 1;
            updatedFields.push('dashboard.pendingApplications');
          }
          
          message = `Candidate moved from ${oldStage} to ${payload.stage}`;
          toast.info(message);
        }
        break;

      case 'ASSIGN_RECRUITER':
        // Update application with recruiter assignment
        const appIndex3 = applicationData.findIndex(a => a.id === payload.applicationId);
        if (appIndex3 !== -1) {
          const oldRecruiterId = applicationData[appIndex3].recruiterId;
          applicationData[appIndex3].recruiterId = payload.recruiterId;
          updatedFields.push('application.recruiterId');
          affectedComponents.push('application-table', 'recruiter-table');
          
          // Update recruiter workload
          const recruiterIndex = recruiterData.findIndex(r => r.id === payload.recruiterId);
          if (recruiterIndex !== -1) {
            recruiterData[recruiterIndex].taskCount += 1;
            updatedFields.push('recruiter.taskCount');
            affectedComponents.push('recruiter-table', 'dashboard-stats');
          }
          
          // If changing from another recruiter, adjust their count
          if (oldRecruiterId) {
            const oldRecruiterIndex = recruiterData.findIndex(r => r.id === oldRecruiterId);
            if (oldRecruiterIndex !== -1) {
              recruiterData[oldRecruiterIndex].taskCount = Math.max(0, recruiterData[oldRecruiterIndex].taskCount - 1);
              updatedFields.push('recruiter.taskCount');
            }
          }
          
          // Flag for next stage
          applicationData[appIndex3].nextAction = 'Schedule Interview';
          updatedFields.push('application.nextAction');
          
          // Find recruiter name for message
          const recruiterName = recruiterData.find(r => r.id === payload.recruiterId)?.name || 'Recruiter';
          const candidateName = applicationData[appIndex3].candidateName;
          message = `${candidateName} assigned to ${recruiterName}`;
          toast.success(message);
        }
        break;

      case 'SCHEDULE_INTERVIEW':
        // Mark slot as taken in calendar (simulated)
        const appIndex4 = applicationData.findIndex(a => a.id === payload.applicationId);
        if (appIndex4 !== -1) {
          applicationData[appIndex4].interviewDate = payload.interviewDate;
          applicationData[appIndex4].status = 'SCHEDULED';
          updatedFields.push('application.interviewDate', 'application.status');
          affectedComponents.push('application-table', 'calendar-view', 'dashboard-stats');
          
          // Update dashboard interview count
          dashboardStats.pendingInterviews += 1;
          updatedFields.push('dashboard.pendingInterviews');
          
          // Notify candidate & recruiter (simulated)
          // In real app, this would trigger notification system
          
          const candidateName = applicationData[appIndex4].candidateName;
          const interviewDate = payload.interviewDate || 'not specified';
          message = `Interview scheduled for ${candidateName} on ${interviewDate}`;
          toast.success(message);
        }
        break;

      case 'UPDATE_APPLICATION_PRIORITY':
        // Update application priority
        const appIndex5 = applicationData.findIndex(a => a.id === payload.applicationId);
        if (appIndex5 !== -1) {
          const oldPriority = applicationData[appIndex5].priority;
          applicationData[appIndex5].priority = payload.priority || 'MEDIUM';
          updatedFields.push('application.priority');
          affectedComponents.push('application-table', 'dashboard-stats');
          
          // Color highlight based on priority
          message = `Priority changed from ${oldPriority} to ${payload.priority}`;
          toast.info(message);
        }
        break;

      case 'PROCESS_DAILY_APPLICATIONS':
        // Auto-count screened applications
        const screenedToday = candidateData.filter(c => 
          c.screenedDate && 
          new Date(c.screenedDate).toDateString() === new Date().toDateString()
        ).length;
        dashboardStats.hiringRate = Math.min(100, dashboardStats.hiringRate + (screenedToday * 2));
        updatedFields.push('dashboard.hiringRate');
        affectedComponents.push('dashboard-stats');
        
        // Update badges
        const totalScreened = candidateData.filter(c => c.stage === 'SCREENED').length;
        dashboardStats.activeCandidates = totalScreened;
        updatedFields.push('dashboard.activeCandidates');
        
        // Flag overdue applications
        const overdueApps = applicationData.filter(app => 
          !app.screenedDate && 
          new Date(app.date) < new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days old
        );
        overdueApps.forEach(app => {
          app.priority = 'HIGH';
          app.overdue = true;
        });
        updatedFields.push('application.priority', 'application.overdue');
        affectedComponents.push('application-table', 'dashboard-stats');
        
        message = `Processed ${screenedToday} applications today`;
        toast.success(message);
        break;

      case 'MARK_TASK_COMPLETE':
        // Update candidate status
        const cIndex2 = candidateData.findIndex(c => c.id === payload.candidateId);
        if (cIndex2 !== -1) {
          candidateData[cIndex2].stage = 'COMPLETED';
          updatedFields.push('candidate.stage');
          affectedComponents.push('candidate-cards', 'pipeline-view');
        }
        
        // Update application status
        const appIndex6 = applicationData.findIndex(a => a.id === payload.applicationId);
        if (appIndex6 !== -1) {
          applicationData[appIndex6].status = 'COMPLETED';
          updatedFields.push('application.status');
          affectedComponents.push('application-table', 'dashboard-stats');
          
          // Update recruiter performance
          if (payload.recruiterId) {
            const recruiterIndex = recruiterData.findIndex(r => r.id === payload.recruiterId);
            if (recruiterIndex !== -1) {
              // Increase performance score
              recruiterData[recruiterIndex].performance = Math.min(100, recruiterData[recruiterIndex].performance + 3);
              updatedFields.push('recruiter.performance');
              affectedComponents.push('recruiter-table');
            }
          }
        }
        
        message = `Task marked as complete`;
        toast.success(message);
        break;

      case 'REFRESH_STATS':
        // Update all dashboard stats based on current data
        dashboardStats.pendingApplications = applicationData.filter(app => 
          app.status === 'SCREENING' || app.status === 'REVIEWED'
        ).length;
        
        dashboardStats.activeCandidates = candidateData.filter(c => 
          ['SCREENING', 'REVIEWED', 'SHORTLISTED'].includes(c.stage)
        ).length;
        
        dashboardStats.recruitersActive = recruiterData.length;
        
        updatedFields.push('dashboard.pendingApplications', 'dashboard.activeCandidates', 'dashboard.recruitersActive');
        affectedComponents.push('dashboard-stats');
        
        message = `Stats refreshed successfully`;
        toast.info(message);
        break;

      default:
        message = `Unknown action type: ${actionType}`;
        toast.warn(message);
        break;
    }

    // Return success result with updated info
    return {
      success: true,
      message: message,
      updatedFields,
      affectedComponents,
      timestamp: new Date()
    };

  } catch (error) {
    console.error('Action execution failed:', error);
    toast.error('Action execution failed');
    return {
      success: false,
      message: `Action failed: ${error}`,
      updatedFields: [],
      affectedComponents: [],
      timestamp: new Date()
    };
  }
};

// Get current data for dashboard
export const getDashboardData = () => ({
  applications: [...applicationData],
  recruiters: [...recruiterData],
  candidates: [...candidateData],
  stats: { ...dashboardStats }
});

// Get specific data
export const getApplications = () => [...applicationData];
export const getRecruiters = () => [...recruiterData];
export const getCandidates = () => [...candidateData];
export const getStats = () => ({ ...dashboardStats });
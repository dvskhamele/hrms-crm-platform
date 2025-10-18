/**
 * HR Operations Service
 * Handles dynamic data updates based on internal HR operations
 */

const fs = require('fs');
const path = require('path');

class HROperationsService {
  constructor(dataFilePath = path.join(__dirname, 'data.json')) {
    this.dataFilePath = dataFilePath;
    this.data = this.loadData();
  }

  // Load data from file
  loadData() {
    try {
      if (fs.existsSync(this.dataFilePath)) {
        const fileData = fs.readFileSync(this.dataFilePath, 'utf8');
        return JSON.parse(fileData);
      } else {
        console.error('Data file not found');
        return null;
      }
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  }

  // Save data to file
  saveData() {
    try {
      fs.writeFileSync(this.dataFilePath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  // Process a new candidate application
  processCandidateApplication(candidateInfo) {
    // Generate new IDs
    const applicationId = this.data.applications.length > 0 ? 
      Math.max(...this.data.applications.map(a => a.id)) + 1 : 1;
    const candidateId = this.data.candidates.length > 0 ? 
      Math.max(...this.data.candidates.map(c => c.id)) + 1 : 1;

    // Create new candidate
    const newCandidate = {
      id: candidateId,
      name: candidateInfo.name,
      email: candidateInfo.email,
      phone: candidateInfo.phone || '',
      positionApplied: candidateInfo.positionApplied,
      status: 'Applied',
      skills: candidateInfo.skills || [],
      experience: candidateInfo.experience || 'Not specified',
      resume: candidateInfo.resume || 'Not provided',
      appliedDate: new Date().toISOString(),
      ...candidateInfo.additionalInfo
    };

    // Create new application
    const newApplication = {
      id: applicationId,
      candidateName: candidateInfo.name,
      positionId: candidateInfo.positionId,
      title: `${candidateInfo.positionApplied} Application`,
      description: candidateInfo.description || 'No description',
      department: candidateInfo.department || 'General',
      priority: candidateInfo.priority || 'MEDIUM',
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    // Update data
    this.data.candidates.push(newCandidate);
    this.data.applications.push(newApplication);

    // Add activity log
    this.addActivity('application', 'New application received', 
      `${candidateInfo.name} - ${candidateInfo.positionApplied}`);

    this.saveData();
    return { candidate: newCandidate, application: newApplication };
  }

  // Update application status and related data
  updateApplicationStatus(applicationId, newStatus) {
    const application = this.data.applications.find(a => a.id === applicationId);
    if (!application) {
      throw new Error(`Application with ID ${applicationId} not found`);
    }

    // Update application status
    const oldStatus = application.status;
    application.status = newStatus;
    
    if (newStatus === 'COMPLETED' && !application.completedAt) {
      application.completedAt = new Date().toISOString();
    }

    // Find and update related candidate
    const candidate = this.data.candidates.find(c => 
      c.name === application.candidateName);
    if (candidate) {
      // Update candidate status based on application status
      if (newStatus === 'COMPLETED') {
        candidate.status = 'Hired';
      } else if (newStatus === 'PENDING') {
        candidate.status = 'Applied';
      } else if (newStatus === 'IN_PROGRESS') {
        candidate.status = 'Under Review';
      } else if (newStatus === 'REJECTED') {
        candidate.status = 'Rejected';
      }
    }

    // Update position status if application is completed (hired)
    if (newStatus === 'COMPLETED') {
      const position = this.data.positions.find(p => p.id === application.positionId);
      if (position) {
        position.status = 'FILLED';
        position.updatedAt = new Date().toISOString();
        
        // Add activity log for position update
        this.addActivity('position', 'Position status updated', 
          `${position.title} marked as FILLED`);
      }
    }

    // Add activity log
    this.addActivity('application', `Application ${newStatus.toLowerCase()}`, 
      `${application.candidateName} - ${application.title}`);

    this.saveData();
    return application;
  }

  // Update position status
  updatePositionStatus(positionId, newStatus) {
    const position = this.data.positions.find(p => p.id === positionId);
    if (!position) {
      throw new Error(`Position with ID ${positionId} not found`);
    }

    const oldStatus = position.status;
    position.status = newStatus;
    position.updatedAt = new Date().toISOString();

    // Add activity log
    this.addActivity('position', 'Position status updated', 
      `${position.title} marked as ${newStatus}`);

    this.saveData();
    return position;
  }

  // Update recruiter status
  updateRecruiterStatus(recruiterId, newStatus) {
    const recruiter = this.data.recruiters.find(r => r.id === recruiterId);
    if (!recruiter) {
      throw new Error(`Recruiter with ID ${recruiterId} not found`);
    }

    const oldStatus = recruiter.status;
    recruiter.status = newStatus;

    // Update department stats if needed
    this.updateDepartmentStats(recruiter.department);

    this.saveData();
    return recruiter;
  }

  // Process new hire and create onboarding record
  processNewHire(applicationId) {
    const application = this.data.applications.find(a => a.id === applicationId);
    if (!application) {
      throw new Error(`Application with ID ${applicationId} not found`);
    }

    // Update application status
    this.updateApplicationStatus(applicationId, 'COMPLETED');

    // Create onboarding record
    const onboardingId = Date.now(); // Use timestamp as unique ID
    const newOnboarding = {
      id: onboardingId,
      candidateId: this.data.candidates.find(c => c.name === application.candidateName)?.id,
      positionId: application.positionId,
      hireDate: new Date().toISOString().split('T')[0], // Date only
      status: 'IN_PROGRESS',
      tasks: [
        { id: 1, title: 'Complete paperwork', completed: false },
        { id: 2, title: 'IT setup', completed: false },
        { id: 3, title: 'Orientation', completed: false },
        { id: 4, title: 'Meet team', completed: false }
      ],
      createdAt: new Date().toISOString()
    };

    this.data.onboarding.push(newOnboarding);

    // Add activity log
    this.addActivity('onboarding', 'New hire onboarding started', 
      `${application.candidateName} hired for ${application.title}`);

    this.saveData();
    return newOnboarding;
  }

  // Update onboarding task status
  updateOnboardingTask(onboardingId, taskId, completed) {
    const onboarding = this.data.onboarding.find(o => o.id === onboardingId);
    if (!onboarding) {
      throw new Error(`Onboarding record with ID ${onboardingId} not found`);
    }

    const task = onboarding.tasks.find(t => t.id === taskId);
    if (!task) {
      throw new Error(`Task with ID ${taskId} not found in onboarding ${onboardingId}`);
    }

    task.completed = completed;

    // Check if all tasks are completed to update overall status
    const allCompleted = onboarding.tasks.every(t => t.completed);
    if (allCompleted) {
      onboarding.status = 'COMPLETED';
    } else {
      onboarding.status = 'IN_PROGRESS';
    }

    this.saveData();
    return onboarding;
  }

  // Update department stats
  updateDepartmentStats(departmentName) {
    const department = this.data.departments.find(d => d.name === departmentName);
    if (!department) {
      throw new Error(`Department ${departmentName} not found`);
    }

    // Calculate stats for the department
    const recruitersInDept = this.data.recruiters.filter(r => r.department === departmentName);
    const activeRecruiters = recruitersInDept.filter(r => 
      r.status === 'Active' || r.status === 'Break').length; // Consider both active and on break as active staff

    // Calculate average performance for the department
    const totalPerformance = recruitersInDept.reduce((sum, recruiter) => sum + recruiter.performance, 0);
    const avgPerformance = recruitersInDept.length > 0 ? 
      Math.round(totalPerformance / recruitersInDept.length) : 0;

    // Update department stats
    department.recruiterCount = recruitersInDept.length;
    department.performance = avgPerformance;

    // Update related positions status counts
    const deptPositions = this.data.positions.filter(p => p.department === departmentName);
    const openPositions = deptPositions.filter(p => p.status === 'OPEN').length;

    this.saveData();
    return department;
  }

  // Add activity to the log
  addActivity(type, title, description) {
    const activityId = this.data.activity.length > 0 ? 
      Math.max(...this.data.activity.map(a => a.id)) + 1 : 1;

    const activity = {
      id: activityId,
      type: type,
      title: title,
      description: description,
      timestamp: new Date().toISOString(),
      status: 'LOGGED'
    };

    this.data.activity.push(activity);
    return activity;
  }

  // Update department head
  updateDepartmentHead(departmentName, newHeadName) {
    const department = this.data.departments.find(d => d.name === departmentName);
    if (!department) {
      throw new Error(`Department ${departmentName} not found`);
    }

    department.head = newHeadName;

    // Add activity log
    this.addActivity('department', 'Department head updated', 
      `${departmentName} head changed to ${newHeadName}`);

    this.saveData();
    return department;
  }

  // Update candidate status directly
  updateCandidateStatus(candidateId, newStatus) {
    const candidate = this.data.candidates.find(c => c.id === candidateId);
    if (!candidate) {
      throw new Error(`Candidate with ID ${candidateId} not found`);
    }

    candidate.status = newStatus;

    // If candidate is hired, also update related applications
    if (newStatus === 'Hired') {
      const relatedApplications = this.data.applications.filter(
        a => a.candidateName === candidate.name
      );
      relatedApplications.forEach(app => {
        app.status = 'COMPLETED';
        if (!app.completedAt) {
          app.completedAt = new Date().toISOString();
        }
      });
    }

    this.saveData();
    return candidate;
  }

  // Get dashboard statistics
  getDashboardStats() {
    const stats = {
      pendingApplications: this.data.applications.filter(a => a.status === 'PENDING').length,
      activeCandidates: this.data.candidates.filter(c => 
        ['Applied', 'Under Review', 'Interview Scheduled'].includes(c.status)).length,
      availablePositions: this.data.positions.filter(p => p.status === 'OPEN').length,
      completedHires: this.data.candidates.filter(c => c.status === 'Hired').length,
      recruitersActive: this.data.recruiters.filter(r => r.status === 'Active').length,
      onboardingInProgress: this.data.onboarding.filter(o => o.status === 'IN_PROGRESS').length,
      departmentsCount: this.data.departments.length
    };

    return stats;
  }

  // Run daily operations to update data based on time-based HR operations
  runDailyOperations() {
    console.log('Running daily HR operations...');
    
    // Update any time-dependent statuses
    this.updateStaleApplications();
    
    // Update employee anniversaries, if applicable
    this.updateEmployeeMilestones();
    
    // Generate daily reports
    this.generateDailyReport();
    
    console.log('Daily HR operations completed.');
  }

  // Update applications that have been pending too long
  updateStaleApplications() {
    const now = new Date();
    const staleThreshold = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

    this.data.applications.forEach(application => {
      if (application.status === 'PENDING') {
        const appliedDate = new Date(application.createdAt);
        const timeDiff = now - appliedDate;

        // If application is pending for more than 30 days, mark as stale
        if (timeDiff > staleThreshold) {
          this.addActivity('application', 'Application stale alert', 
            `${application.candidateName} - ${application.title} pending for more than 30 days`);
        }
      }
    });
  }

  // Update employee milestones (anniversaries, etc.)
  updateEmployeeMilestones() {
    // Placeholder for future functionality
    // This would check hire dates and update employee milestones
  }

  // Generate daily HR report
  generateDailyReport() {
    const report = {
      date: new Date().toISOString().split('T')[0],
      summary: this.getDashboardStats(),
      newApplications: this.data.applications.filter(a => {
        const appDate = new Date(a.createdAt);
        const today = new Date();
        return appDate.toDateString() === today.toDateString();
      }).length,
      statusChanges: this.data.activity.filter(a => {
        const activityDate = new Date(a.timestamp);
        const today = new Date();
        return activityDate.toDateString() === today.toDateString();
      }).length
    };

    // Add report to a daily reports collection (if we had one)
    // For now, we just log it
    console.log('Daily HR Report:', JSON.stringify(report, null, 2));

    return report;
  }
}

module.exports = HROperationsService;
# 🚀 Gem HRMS/CRM Platform - Prototype Mode

This document explains how to run the Gem platform in prototype mode, which allows the application to work fully without requiring a backend connection.

## 🎯 What is Prototype Mode?

Prototype mode enables the complete HRMS/CRM platform to function without any backend services running. All features work with mock data that simulates real functionality.

## 🌟 Benefits of Prototype Mode

- **No Backend Required**: Run the full application with just the frontend
- **Instant Setup**: Start using the platform immediately
- **Offline Capable**: Works without internet connection
- **Full Feature Set**: All UI components and interactions work
- **Easy Demo**: Perfect for showcasing functionality to stakeholders
- **Development Friendly**: Rapid iteration without backend dependencies

## 🚀 Running in Prototype Mode

### Method 1: Using NPM Scripts
```bash
# Navigate to frontend directory
cd frontend

# Run in prototype mode
npm run prototype

# Or use the alias
npm run dev:prototype
```

### Method 2: Manual Environment Variable
```bash
# Navigate to frontend directory
cd frontend

# Set environment variable and run
NEXT_PUBLIC_PROTOTYPE_MODE=true npm run dev
```

### Method 3: Using .env File
1. Copy the prototype environment file:
```bash
cp .env.prototype .env.local
```

2. Run the application normally:
```bash
npm run dev
```

## 🧪 Features Available in Prototype Mode

All core features work completely in prototype mode:

### 📊 Dashboard
- Real-time KPIs with mock data
- Interactive charts and graphs
- Action-triggered updates
- Expandable widgets

### 👥 Candidate Management
- Full candidate profiles
- Application tracking
- Status updates
- Bulk operations

### 📋 Position Management
- Create/edit positions
- Status tracking
- Department assignments
- Priority management

### 🔍 Screening & Scheduling
- Candidate screening workflows
- Interview scheduling
- Calendar integration
- Status notifications

### 🧑‍💼 Recruiter Management
- Recruiter assignments
- Performance tracking
- Workload balancing
- Auto-badge updates

### 📈 Analytics
- Real-time metrics
- Conversion tracking
- Performance dashboards
- Custom reports

### 🛏️ Bench Matching
- Candidate matching system
- Skill-based recommendations
- Drag-and-drop assignments
- Auto-updates

## 🎮 Action-Triggered Automation

The prototype mode fully supports the action-triggered automation system:

### One Tap, Multiple Outcomes
- Click any KPI → Expands with actionable options
- Mark candidate screened → Updates recruiter workload, pipeline progress, dashboard metrics
- Move candidate stage → Adjusts hiring %, color-codes urgency, updates recruiter badge
- Schedule interview → Reserves calendar slot, notifies parties, updates status

### Bulk Operations
- Select multiple candidates → Apply actions to all
- Process daily applications → Updates all metrics simultaneously
- Auto-assign candidates → Distributes workload evenly

## 📱 Mobile Responsiveness

Prototype mode maintains full mobile responsiveness:

- **Touch-Optimized UI**: Larger touch targets for mobile
- **Responsive Layouts**: Adapts to all screen sizes
- **Mobile-Native Gestures**: Swipe, tap, and scroll optimized
- **Performance Optimized**: Lightweight mock data for fast loading

## 🗄️ Data Persistence

In prototype mode, data is persisted using localStorage:

- **Session Persistence**: Data survives page refreshes
- **User Preferences**: Saved settings and configurations
- **Mock State**: Simulated application state
- **Local Storage**: No external dependencies required

## 🛠️ Configuration Options

The prototype environment can be customized through environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_PROTOTYPE_MODE` | Enable prototype mode | `false` |
| `MOCK_DELAY_MIN` | Minimum mock API delay (ms) | `200` |
| `MOCK_DELAY_MAX` | Maximum mock API delay (ms) | `500` |
| `STORAGE_TYPE` | Storage mechanism | `localStorage` |

## 🔄 Transitioning to Production

Moving from prototype to production is seamless:

1. **Disable Prototype Mode**:
   ```bash
   # Remove the environment variable or set to false
   NEXT_PUBLIC_PROTOTYPE_MODE=false
   ```

2. **Connect Backend Services**:
   - Start backend API server
   - Configure database connections
   - Set up authentication providers

3. **Deploy Normally**:
   - The same UI components work with real data
   - No code changes required
   - All action-triggered automation persists

## 📋 Limitations

While prototype mode is feature-complete, there are some limitations:

- **No Real Data Persistence**: Data resets on browser clear
- **Mock API Responses**: Simulated backend responses
- **No Real Authentication**: Demo login with any credentials
- **Limited External Integrations**: No third-party service connections

## 🆘 Troubleshooting

### Common Issues

1. **Prototype Mode Not Working**
   - Ensure `NEXT_PUBLIC_PROTOTYPE_MODE=true` is set
   - Check that you're using the correct npm script

2. **Data Not Persisting**
   - Verify localStorage is enabled in browser
   - Check browser privacy settings

3. **Features Missing**
   - Ensure all dependencies are installed
   - Check for console errors

### Need Help?

For issues or questions about prototype mode:
- Check the browser console for errors
- Verify environment variables are set correctly
- Ensure all npm dependencies are installed

The prototype mode is designed to provide a complete, realistic experience of the Gem platform without requiring backend services.
# Load Sphere - Visual Guide

## 🎨 Application Appearance

### Color Palette
```
Primary Background:    #0f0f0f (Deep Black)
Secondary Background:  #1a1a1a (Charcoal)
Tertiary Background:   #252525 (Dark Grey)
Ember Orange:          #ff6b35 (Primary Accent)
Ember Amber:           #f59e0b (Secondary Accent)
Success Green:         #4ade80
Warning Yellow:        #fbbf24
Danger Red:            #ef4444
Text Primary:          #f5f5f5
Text Secondary:        #a0a0a0
```

## 📱 Layout Structure

### Sidebar (Left - 280px)
```
┌─────────────────────┐
│  Load Sphere       │  ← Orange glow title
│  Probabilistic     │
│  Analysis          │
├─────────────────────┤
│  📊 Dashboard      │  ← Navigation items
│  📡 Traffic        │     with icons
│  🖥️  Server        │     Active: orange
│  📈 Analytics      │     border + bg
├─────────────────────┤
│  v1.0.0            │  ← Footer
│  Network & Server  │
└─────────────────────┘
```

### Main Content Area
```
┌──────────────────────────────────────────┐
│  [☰ Toggle]  Page Title (Orange Glow)  │
│  ─────────────────────────────────────  │
│                                          │
│  [Control Panel - Dark Grey Card]       │
│  • Sliders                               │
│  • [Start] [Stop] Buttons (Orange)      │
│                                          │
│  [Metrics Grid - 4 Cards]               │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ Icon │ │ Icon │ │ Icon │ │ Icon │  │
│  │ Val  │ │ Val  │ │ Val  │ │ Val  │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│                                          │
│  [Charts - Large Cards]                 │
│  ┌────────────────────────────────────┐ │
│  │   📈 Chart Title (Orange)          │ │
│  │   [Recharts Area/Line/Bar Chart]   │ │
│  │   - Orange/Red/Amber gradients     │ │
│  └────────────────────────────────────┘ │
│                                          │
│  [Calculation Display Card]             │
│  Formula: Orange text, centered         │
│  Steps: Monospace, detailed             │
│                                          │
│  [Recommendations Panel]                │
│  Grid of scaling cards + text box       │
└──────────────────────────────────────────┘
```

## 🎯 Dashboard Page

### Top Statistics (4 Cards)
```
┌────────────────────┐  ┌────────────────────┐
│ 📡 [Orange Icon]   │  │ 🖥️ [Amber Icon]    │
│ Average Reliability│  │ Max Server Load    │
│     94.5%          │  │     87.3%          │
│ Network Performance│  │ Peak Utilization   │
└────────────────────┘  └────────────────────┘

┌────────────────────┐  ┌────────────────────┐
│ 📈 [Green Icon]    │  │ ⚠️ [Yellow Icon]   │
│ Peak Traffic       │  │ Avg Queue Length   │
│    12,500          │  │      23.4          │
│ Total Packets      │  │ Server Queue       │
└────────────────────┘  └────────────────────┘
```

### Charts Section
```
┌────────────────────────────────────────┐
│ Traffic Reliability Trend              │
│ [Orange Line Chart - Ascending]        │
│ Y: Reliability % | X: Time            │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Server Utilization History             │
│ [Orange Bar Chart - Varying Heights]   │
│ Y: Utilization % | X: Time            │
└────────────────────────────────────────┘
```

### System Status
```
┌────────────────────┐  ┌────────────────────┐
│ System Status      │  │ Quick Actions      │
│ • [●] Traffic Mon. │  │ [Start Traffic]    │
│ • [●] Server Track.│  │ [Start Server]     │
│ • [●] DB Connected │  │ (Orange buttons)   │
└────────────────────┘  └────────────────────┘
```

## 📡 Traffic Prediction Page

### Control Panel
```
┌──────────────────────────────────────────┐
│ Growth Rate: 50 packets/sec              │
│ [━━━━━●━━━━] 10 ──────── 200            │
│                                          │
│ [▶ Start Simulation] [⏹ Stop Simulation]│
└──────────────────────────────────────────┘
```

### Live Metrics (4 Cards)
```
Total Packets (n)    Successful (k)    Failed        Success (p)
   12,345           ✓ 11,789          ✗ 556         95.49%
```

### Area Chart
```
┌────────────────────────────────────────┐
│ Traffic Growth vs Success Rate         │
│                                        │
│ [Area Chart with two gradients:]      │
│ - Orange area: Total packets          │
│ - Green area: Successful packets      │
│                                        │
│ Shows increasing traffic over time    │
└────────────────────────────────────────┘
```

### Calculation Display
```
┌────────────────────────────────────────┐
│ Binomial Distribution Calculation      │
│ ────────────────────────────────────── │
│                                        │
│ Formula (Orange, Centered):            │
│ P(X = k) = nCk × p^k × (1-p)^(n-k)   │
│                                        │
│ Step 1: Calculate nCk...               │
│ Step 2: Apply Binomial Formula...      │
│ Result: 95.49% probability             │
└────────────────────────────────────────┘
```

### Reliability Panel (4 Items)
```
📈 Packet Success Probability: 95.49%
⚠️ Packet Loss Probability: 4.51%
🖥️ Retransmission Estimate: 834 packets
✓ Network Reliability Score: 95.49%
```

### Scaling Recommendations
```
┌──────────────┐  ┌──────────────┐
│ Horizontal   │  │ Vertical     │
│ Scaling      │  │ Scaling      │
│     2        │  │    25%       │
│ Extra servers│  │ CPU/RAM inc. │
└──────────────┘  └──────────────┘

[⚠️] Moderate load detected. Consider adding 
     2 server(s) or increasing resources by 25%.
```

## 🖥️ Server Performance Page

### Control Panel
```
┌──────────────────────────────────────────┐
│ Base Arrival Rate (λ): 5 req/sec        │
│ [━━━━━●━━━━] 1 ──────── 20              │
│                                          │
│ [▶ Start Simulation] [⏹ Stop Simulation]│
└──────────────────────────────────────────┘
```

### Live Metrics (4 Cards)
```
Requests/Sec    Arrival Rate (λ)    Queue Length    Utilization
     10              5.23                45          87.2%
```

### Bar Chart
```
┌────────────────────────────────────────┐
│ Request Arrival Histogram              │
│                                        │
│ [Bar Chart:]                           │
│ - Orange bars: Total requests         │
│ - Red bars: Queue length              │
│                                        │
│ Bars increase over time               │
└────────────────────────────────────────┘
```

### Line Chart
```
┌────────────────────────────────────────┐
│ Server Utilization Curve               │
│                                        │
│ [Line Chart:]                          │
│ - Thick orange line                   │
│ - Shows utilization % over time       │
│ - Line increases as load grows        │
└────────────────────────────────────────┘
```

### Poisson Calculation
```
┌────────────────────────────────────────┐
│ Poisson Distribution Calculation       │
│ ────────────────────────────────────── │
│                                        │
│ Formula (Orange):                      │
│ P(X = k) = (λ^k × e^-λ) / k!         │
│                                        │
│ Step 1: Identify Parameters...         │
│ Step 2: Calculate λ^k...               │
│ Step 3: Calculate e^(-λ)...            │
│ Step 4: Calculate k!...                │
│ Step 5: Apply Poisson Formula...       │
│ Result: 17.6% probability              │
└────────────────────────────────────────┘
```

### Boost Analyzer (4 Items)
```
⚠️ Probability of Overload: 35%
📊 Expected Response Delay: 4.5 sec
⚙️ Queue Congestion Risk: 28%
✓ Performance Boost Required: 30%
```

### Boost Recommendations
```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ CPU      │  │ Instance │  │ Auto-    │
│ Scaling  │  │ Scaling  │  │ Scaling  │
│   25%    │  │    2     │  │   70%    │
└──────────┘  └──────────┘  └──────────┘

[⚠️] WARNING: High server load.
     Recommended actions:
     - Scale CPU by 25%
     - Add 2 instances
     - Monitor and set auto-scaling at 70%
```

## 📈 Analytics Page

### Tabs
```
┌─────────────────────┬─────────────────────┐
│ Traffic Simulations │ Server Simulations  │
│       (12)          │        (8)          │
└─────────────────────┴─────────────────────┘
      Active                Inactive
```

### Scatter Plot
```
┌────────────────────────────────────────┐
│ Traffic Reliability Comparison         │
│                                        │
│ [Scatter Chart:]                       │
│ - Orange dots scattered                │
│ - X-axis: Total Packets               │
│ - Y-axis: Reliability %               │
│                                        │
│ Shows relationship between volume     │
│ and reliability                       │
└────────────────────────────────────────┘
```

### Data Table
```
┌──────────────────────────────────────────────────────────┐
│ Timestamp         │ Packets │ Success │ Failed │ Reliab. │
├──────────────────────────────────────────────────────────┤
│ Feb 14, 10:30 AM │ 12,345  │ 11,789  │  556   │ 95.49% │
│ Feb 14, 10:15 AM │  8,920  │  8,534  │  386   │ 95.67% │
│ Feb 14, 10:00 AM │  6,780  │  6,441  │  339   │ 95.00% │
└──────────────────────────────────────────────────────────┘
                 [👁️ View] [🗑️ Delete]
```

### Modal Detail View
```
┌────────────────────────────────────────┐
│ Traffic Simulation Details            │
│ ────────────────────────────────────── │
│                                        │
│ Total Packets: 12,345                  │
│ Successful: ✓ 11,789                   │
│ Failed: ✗ 556                          │
│ Success Probability: 95.4900%          │
│ Reliability Score: 95.49%              │
│ Packet Loss: 4.51%                     │
│                                        │
│ [Full Binomial Calculation Display]   │
│                                        │
│ [Scaling Recommendation Text]          │
│                                        │
│            [Close]                     │
└────────────────────────────────────────┘
```

## 🎭 Interactive Elements

### Buttons
```
Primary:  [▶ Start Simulation] ← Orange gradient
          Hover: Lifts up + glow

Danger:   [⏹ Stop Simulation] ← Red solid
          Hover: Darker red

Secondary: [🔄 Refresh] ← Grey with orange border
           Hover: Orange fill
```

### Cards
```
Default State:
┌────────────────┐
│ Dark grey bg   │
│ Subtle shadow  │
└────────────────┘

Hover State:
┌────────────────┐
│ Lifts up 4px   │ ← transform: translateY(-4px)
│ Orange border  │
│ Orange glow    │
└────────────────┘
```

### Sliders
```
Track: ━━━━━━━━━━━ (Dark grey)
Thumb: ●           (Orange with glow)
       Hover: Bigger + brighter glow
```

### Loading State
```
┌────────────────────────────────────────┐
│                                        │
│           [◐] Loading...               │
│        (Spinning orange circle)        │
│                                        │
└────────────────────────────────────────┘
```

### Alerts
```
Success: [✓] Simulation stopped and data saved!
         Green border, green background fade

Info:    [ℹ] Traffic simulation started...
         Blue border, blue background fade

Error:   [✗] Failed to save simulation data
         Red border, red background fade
```

## 📱 Responsive Behavior

### Desktop (>768px)
- Sidebar: Fixed, always visible
- Content: Full width with sidebar offset
- Charts: 2 columns
- Metrics: 4 columns

### Tablet (768px)
- Sidebar: Toggle with hamburger
- Charts: 2 columns
- Metrics: 2 columns

### Mobile (<768px)
- Sidebar: Overlay, toggle
- Content: Full width
- Charts: 1 column (stacked)
- Metrics: 1 column (stacked)

## ✨ Animations

1. Page Load: Fade in from bottom
2. Card Hover: Lift up + glow
3. Button Hover: Color change + scale
4. Chart Lines: Draw from left
5. Numbers: Count up animation
6. Sidebar: Slide in/out
7. Modal: Fade in + scale
8. Loading: Spin animation
9. Status Dots: Pulse animation
10. Alerts: Slide down from top

---

## 🎨 Design Philosophy

**Dark Ember Aesthetic:**
- Dark backgrounds reduce eye strain
- Orange accents create focus points
- Glow effects add futuristic feel
- Smooth animations enhance experience
- High contrast ensures readability
- Professional dashboard appearance

**User Experience:**
- Clear visual hierarchy
- Intuitive navigation
- Instant feedback
- Responsive interactions
- Loading states for async ops
- Error handling with messages

---

*This visual guide describes the complete appearance and interaction patterns of the Load Sphere application.*

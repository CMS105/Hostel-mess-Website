# 🍽️ MESSMATE – Smart Hostel Mess Management & Food Feedback Platform

> **"Every Meal Matters. Every Voice Counts."**  
> *A comprehensive, full-stack, browser-first solution for Problem Card 15 – Mess Menu Rater.*

---

## 🌟 Overview & Problem Statement

In college hostels, mess food quality, daily menu unpredictability, lack of feedback responsiveness, food wastage, and hygiene oversights are daily struggles for thousands of students.

**MESSMATE** bridges the trust and operational gap between hostel residents and mess management. It provides a real-time, data-driven platform that democratizes hostel dining: students voice ratings, request backup meal alternatives, and audit hygiene zones; while mess owners and wardens leverage analytics to adjust recipes, prevent food wastage, and resolve hygiene tickets.

---

## 🏗️ Architecture & Dual-Portal System

MESSMATE runs as a single web application with two interconnected demo portals:

### 1. 🎓 Student Portal
- **Today's Dashboard**: Live date display, today's 4 courses (Breakfast, Lunch, Evening Snacks, Dinner), real-time meal availability badges (`Served`, `Serving Now`, `Upcoming`), radial satisfaction gauge, latest mess announcements, and quick rating buttons.
- **Weekly Menu Calendar**: Complete Monday-to-Sunday navigation with 4 meal slots per day, category filters (*South Indian, North Indian, Snacks, Special, Comfort*), and backup dish previews.
- **Food Rating Engine (5 Criteria)**:
  - 1 to 5 star rating across:
    1. *Taste & Flavor*
    2. *Food Quality & Freshness*
    3. *Portion Quantity*
    4. *Food Temperature*
    5. *Overall Satisfaction*
  - Instant live average score recalculation and localStorage persistence.
- **Strict Future Meal Protection**:
  - Automatically compares current system time against meal serving windows.
  - Locks rating submission for future meals with: *"Rating will open when this meal is available."*
  - Includes a navbar toggle for judges: *"Demo Unlock"* to preview rating future slots at any hour.
- **Mandatory Low-Rating Investigation**:
  - If a student gives 1 star or less in any category, an alert section appears requiring:
    - Selectable reasons (*Too spicy, Too oily, Not fresh, Cold, Poor taste, Poor quality, Insufficient quantity, Other*).
    - Mandatory detailed explanation.
    - Optional constructive suggestions (+15 bonus pts).
- **Food Alternative Democracy Hub**:
  - View pre-listed backup alternatives for any meal (e.g., Chapati, Curd Rice, Khichdi).
  - Submit votes or suggest custom alternative dishes.
  - Transparent student vote tallies with clear advisory notice.
- **Campus Cleanliness & Hygiene Audit**:
  - 1-to-5 star rating across 5 mess zones: *Dining Hall, Dining Tables, Drinking Water Area, Kitchen Hygiene, Washrooms*.
  - Incident complaint dispatcher: Select issue type, zone, severity (*Low, Medium, High*), description, and optional photo attachment with instant preview.
- **Student Gamification & Rating History**:
  - Demo identity: *Rahul Sharma (Room B-204, CSE 3rd Year)*.
  - Participation points awarded for feedback, audits, and reports (never contingent on positive ratings!).
  - Engagement tiers: *Bronze Explorer → Silver Contributor → Gold Messmate → Platinum Legend*.
  - Full history tabs for points, rated meals, submitted feedback, and hygiene tickets.

---

### 2. 👨‍🍳 Admin Portal (Mess Owner & Management)
- **Executive Operations Dashboard**:
  - 8 core metric cards: Total meals served, total ratings, overall satisfaction, average cleanliness score, estimated daily food wastage, hygiene tickets, alternative requests, student participation percentage.
  - Responsive charts: Daily ratings vs target (4.0 ★), 4-week satisfaction growth, food waste trends, and zone cleanliness scores.
- **Weekly Menu Manager**:
  - Full CRUD editor: add, edit, or delete items across Monday–Sunday and 4 meal slots.
  - Dish names, descriptions, serving times, categories, illustrations, alternative dishes, and availability toggles.
  - One-click **"Publish Weekly Menu"** instantly syncing to the Student Portal.
- **Sensory & Rating Analytics**:
  - Comprehensive dish-by-dish sensory breakdown bars (Taste, Quality, Quantity, Temperature, Overall).
  - Top 5 Best-Rated Dishes (*Hall of Fame*).
  - Top 5 Lowest-Rated Dishes (*Dishes Needing Urgent Improvement*).
  - Filterable by date, day, meal category, and search query.
- **Anonymous Student Feedback Logs (Strict Zero-PII Privacy)**:
  - Strict privacy enforcement: **Student names, phone numbers, and emails are permanently masked**.
  - All entries indexed anonymously as `FB-001`, `FB-002`, `FB-003`, etc.
  - Highlights mandatory 1-star investigations and constructive suggestions.
- **Kitchen Food Wastage Management**:
  - Daily recording modal: Prepared (kg), Served (kg), Remaining (kg), Actual Wasted (kg), Students Served, Reason.
  - Formula: $\text{Waste } \% = (\frac{\text{Wasted Food}}{\text{Food Prepared}}) \times 100$.
  - Prominent alert warning banner when wastage exceeds configurable threshold (e.g. >15%).
  - Most wasted food items ranking and smart reduction tips.
- **Cleanliness Operations & Ticket Resolution**:
  - Real-time zone cleanliness averages.
  - Prominent alert banner for unresolved high-severity hygiene tickets.
  - Complaint workflow: change status (*Pending → In Progress → Resolved*) with admin resolution notes.
  - Staff inspection log creator with safety scores and corrective actions.
- **Alternative Food Request Management**:
  - Tally of student requests per dish.
  - Actions: Accept (authorizes counter), Plan (adds to future menu), or Reject (with polite explanation).
- **Mess Announcements Broadcast**:
  - Create and broadcast notices (*Menu Changes, Special Feasts, Timing Adjustments*).
- **Smart Mess Intelligence (Local Heuristic Engine)**:
  - Automated rule-based insights generated directly from stored ratings and waste logs without external API dependency:
    - *"Vegetable pulao received a low average taste rating this week."*
    - *"Dining hall cleanliness ratings decreased compared with previous week."*
    - *"Food wastage is highest during dinner (avg. 24.5 kg/day)."*
    - *"Students frequently requested chapati as an alternative (68 requests)."*
    - *"Breakfast satisfaction improved this week (4.4 ★)."*
  - Outputs problem identified, supporting evidence, suggested action, priority level, and preliminary tags.
- **Reports & Instant CSV Export**:
  - One-click CSV exports for:
    1. `messmate_food_ratings_*.csv`
    2. `messmate_food_waste_audit_*.csv`
    3. `messmate_anonymous_feedback_logs_*.csv`
    4. `messmate_hygiene_inspections_*.csv`

---

## 🛠️ Technology Stack & Constraints Adherence

| Layer | Technology |
|---|---|
| **Framework** | React 18 with Vite |
| **Styling** | Tailwind CSS with responsive glassmorphism and modern palettes |
| **Icons** | Lucide React |
| **Charts** | Lightweight, high-performance responsive SVG charts |
| **Gamification** | Canvas Confetti celebration effects |
| **Persistence** | Browser `localStorage` with automated schema migrations & reset |
| **APIs / Keys** | **None (100% offline & local browser execution, zero external API keys or secret dependencies)** |

---

## 🚀 Running the Project Locally

```bash
# Navigate to the project directory
cd messmate

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in any modern web browser.

---

## 🧪 Key Demo Scenarios to Test During Evaluation

1. **Role Switching**:
   - Click the top-right button in the navbar to switch between **Student View** and **Admin View**, or click the Home icon to view the **Role Selection** landing page.
2. **Future Meal Lock**:
   - In Student View, notice that upcoming meals show *"Rating will open when this meal is available."*
   - Toggle the *"Demo Unlock: ON"* button in the navbar to test rating any meal at will.
3. **Low-Rating Investigation**:
   - Rate any meal and choose 1 star in Taste or Quality.
   - Notice the mandatory red feedback section appear with selectable reasons and required explanation.
4. **Instant Kitchen Analytics Sync**:
   - Submit a rating or alternative vote; notice the meal rating count and average score update instantly.
   - Switch to Admin View → Food Rating Analytics or Anonymous Feedback Logs to view the newly submitted anonymous record (`FB-XXX`).
5. **Admin Menu Editing & Publishing**:
   - In Admin View → Weekly Menu Manager, add or edit a dish and click **Publish Weekly Menu**.
   - Switch to Student View to see the updated menu immediately.
6. **CSV Exporting**:
   - In Admin View → Reports & CSV Export, click any download button to get structured CSV data.
7. **Reset Demo Data**:
   - Click the circular reset button in the navbar at any time to restore pristine hackathon sample data.

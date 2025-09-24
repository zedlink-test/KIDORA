import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from "./pages/admin-dashboard";
import SecretaryDashboard from "./pages/secretary-dashboard";
import Login from "./pages/login";
import StudentEvaluation from "./pages/student-evaluation";

// 🚨 Temporarily commented out because these pages don't exist yet
// import TeacherManagement from "./pages/teacher-management";
// import StudentManagement from "./pages/student-management";
// import TeacherDashboard from "./pages/teacher-dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Default route */}
          <Route path="/" element={<AdminDashboard />} />

          {/* Dashboards */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/secretary-dashboard" element={<SecretaryDashboard />} />
          <Route path="/student-evaluation" element={<StudentEvaluation />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Future pages */}
          {/*
          <Route path="/teacher-management" element={<TeacherManagement />} />
          <Route path="/student-management" element={<StudentManagement />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          */}

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

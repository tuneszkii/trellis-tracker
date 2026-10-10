import { Routes, Route } from 'react-router-dom';
import { ProjectsProvider } from './projects-context.js';
import { AppShell } from './app-shell.js';
import { DashboardPage } from './dashboard-page.js';
import { NewProjectPage } from './new-project-page.js';
import { CardPage, NotFound } from './card-page.js';
import { ChecklistPage } from './checklist-page.js';
import { SettingsPage } from './settings-page.js';
import './trellis-app.module.css';

/**
 * Trellis — a project tracker where cards nest inside cards to any depth and
 * checking off tasks rolls progress up through every level to the project.
 * Each view is its own screen: Dashboard, Project/Card, Checklist, Settings, New project.
 */
export function TrellisApp() {
  return (
    <ProjectsProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/new" element={<NewProjectPage />} />
          <Route path="/projects/:projectId" element={<CardPage />} />
          <Route path="/projects/:projectId/cards/:cardId" element={<CardPage />} />
          <Route path="/projects/:projectId/checklist" element={<ChecklistPage />} />
          <Route path="/projects/:projectId/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </ProjectsProvider>
  );
}

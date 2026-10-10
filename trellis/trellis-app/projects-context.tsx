import { createContext, useContext, type ReactNode } from 'react';
import { useProjects } from './use-projects.js';

type ProjectsValue = ReturnType<typeof useProjects>;

const ProjectsContext = createContext<ProjectsValue | null>(null);

/**
 * Loads projects once and shares them with every frame (dashboard, project, focus).
 * @param props.children - app content
 */
export function ProjectsProvider({ children }: { children: ReactNode }) {
  const value = useProjects();
  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

/**
 * Access the shared projects state.
 * @returns projects plus mutation helpers
 */
export function useProjectsContext(): ProjectsValue {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error('useProjectsContext must be used inside <ProjectsProvider>');
  return ctx;
}

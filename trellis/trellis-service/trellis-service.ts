import { ProjectRepository } from './project-repository.js';
import { ImageRepository, type StoredImage } from './image-repository.js';
import type { Project, ProjectInput } from './project-type.js';
import { seedProjects } from './seed.js';

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const DATA_URL = /^data:(image\/(?:png|jpeg|webp|gif));base64,/;

/**
 * Trellis service — business logic for projects, their card/task trees and pictures.
 */
export class TrellisService {
  constructor(
    private repo: ProjectRepository = new ProjectRepository(),
    private images: ImageRepository = new ImageRepository()
  ) {}

  /** Lists all projects. */
  listProjects(): Promise<Project[]> {
    return this.repo.list();
  }

  /** Gets one project. */
  getProject(id: string): Promise<Project | null> {
    return this.repo.get(id);
  }

  /** Creates a project after validating its name. */
  async createProject(input: Partial<ProjectInput>): Promise<Project> {
    const name = (input.name || '').trim();
    if (!name) throw new Error('Project name is required');
    return this.repo.create({
      name,
      description: input.description || '',
      color: input.color,
      logo: input.logo || '',
      tasks: Array.isArray(input.tasks) ? input.tasks : [],
    });
  }

  /** Updates a project (name, description, color, logo, task tree). */
  updateProject(id: string, input: Partial<ProjectInput>): Promise<Project | null> {
    const patch: Partial<ProjectInput> = {};
    if (typeof input.name === 'string' && input.name.trim()) patch.name = input.name.trim();
    if (typeof input.description === 'string') patch.description = input.description;
    if (typeof input.color === 'string') patch.color = input.color;
    if (typeof input.logo === 'string') patch.logo = input.logo;
    if (Array.isArray(input.tasks)) patch.tasks = input.tasks;
    return this.repo.update(id, patch);
  }

  /** Deletes a project. */
  deleteProject(id: string): Promise<boolean> {
    return this.repo.remove(id);
  }

  /**
   * Stores an uploaded picture sent as a base64 data URL.
   * @param dataUrl - e.g. "data:image/webp;base64,...."
   * @returns the new image id
   */
  async saveImage(dataUrl: unknown): Promise<string> {
    const match = typeof dataUrl === 'string' ? DATA_URL.exec(dataUrl) : null;
    if (!match || typeof dataUrl !== 'string') throw new Error('Upload a PNG, JPEG, WebP or GIF image');
    const data = Buffer.from(dataUrl.slice(match[0].length), 'base64');
    if (!data.length) throw new Error('The image is empty');
    if (data.length > MAX_IMAGE_BYTES) throw new Error('The image is too large (max 2 MB)');
    return this.images.save({ data, contentType: match[1] });
  }

  /** Reads a stored picture. */
  getImage(id: string): Promise<StoredImage | null> {
    return this.images.get(id);
  }

  /** Seeds an example project when the database is empty. */
  async seed(): Promise<void> {
    if ((await this.repo.count()) > 0) return;
    for (const p of seedProjects) await this.repo.create(p);
  }

  /**
   * create a new instance of a trellis service.
   */
  static from() {
    return new TrellisService();
  }
}

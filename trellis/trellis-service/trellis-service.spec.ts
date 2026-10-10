import { TrellisService } from './trellis-service.js';

describe('trellis service', () => {
  it('rejects a project without a name', async () => {
    let created = 0;
    const fakeRepo: any = { create: async () => { created += 1; } };
    const service = new TrellisService(fakeRepo);
    await expect(service.createProject({ name: '  ' })).rejects.toThrow('Project name is required');
    expect(created).toBe(0);
  });

  it('only accepts real image data URLs', async () => {
    const saved: unknown[] = [];
    const fakeImages: any = { save: async (i: unknown) => { saved.push(i); return 'img1'; } };
    const service = new TrellisService({} as any, fakeImages);
    await expect(service.saveImage('data:text/html;base64,PGI+')).rejects.toThrow('Upload a PNG');
    await expect(service.saveImage('data:image/png;base64,iVBORw0KGgo=')).resolves.toBe('img1');
    expect(saved).toHaveLength(1);
  });
});

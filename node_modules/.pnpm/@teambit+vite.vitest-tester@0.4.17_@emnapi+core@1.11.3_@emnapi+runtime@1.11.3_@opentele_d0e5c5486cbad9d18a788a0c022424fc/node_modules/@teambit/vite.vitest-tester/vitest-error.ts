export class VitestError extends Error {
  constructor(
    message: string,
    public readonly stack?: string,
    public readonly code?: unknown,
    public readonly type?: string
  ) {
    super(message);
  }
}

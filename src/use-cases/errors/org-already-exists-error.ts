export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('An org with this email already exists');
  }
}

const XSS_PATTERN = /<script|onerror=|onload=|javascript:/i;

export class JsonValidator {
  constructor(private value: unknown) {}

  isValid(): boolean {
    return !XSS_PATTERN.test(JSON.stringify(this.value));
  }
}

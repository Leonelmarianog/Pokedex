import validateInput from '../validation.js';

describe('validation', () => {
  it('Validates that input is not empty', () => {
    const isValid = validateInput('Pikachu');

    expect(isValid).toBe(true);
  });

  it('Throws an error when input is empty', () => {
    try {
      validateInput('');
    } catch (error) {
      expect(error.image).toBeDefined();
      expect(error.message).toBeDefined();
    }
  });
});

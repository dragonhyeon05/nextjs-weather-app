// lib/utils.test.ts
import { formatTime, convertTemp } from './utils';

describe('util functions', () => {
  // Test untuk formatTime
  it('should format time string correctly', () => {
    expect(formatTime('06:30 AM')).toBe('06:30');
    expect(formatTime(' 10:15 PM ')).toBe('10:15');
    expect(formatTime(undefined)).toBe('N/A');
  });

  // Test untuk convertTemp
  it('should convert celsius to fahrenheit correctly', () => {
    expect(convertTemp(0, 'celsius')).toBe(0);
    expect(convertTemp(0, 'fahrenheit')).toBe(32);
    expect(convertTemp(100, 'fahrenheit')).toBe(212);
  });
});
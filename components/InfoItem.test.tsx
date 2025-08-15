// components/InfoItem.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { InfoItem } from './InfoItem';
import { Droplets } from 'lucide-react';

describe('InfoItem Component', () => {
  it('renders the label, value, and icon correctly', () => {
    render(<InfoItem icon={Droplets} label="Kelembapan" value="86%" />);

    // Cek apakah label dan value muncul di dokumen
    expect(screen.getByText('Kelembapan')).toBeInTheDocument();
    expect(screen.getByText('86%')).toBeInTheDocument();
  });
});
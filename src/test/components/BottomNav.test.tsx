import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import { BottomNav } from '../../components/layout/BottomNav';

describe('BottomNav', () => {
  it('renders without crashing', () => {
    render(<BottomNav />);
    expect(document.querySelector('nav')).toBeInTheDocument();
  });

  it('renders all 4 tabs', () => {
    render(<BottomNav />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(4);
  });

  it('shows the navigation landmark', () => {
    render(<BottomNav />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders a custom icon in each tab', () => {
    const { container } = render(<BottomNav />);
    // Each of the 4 tabs renders one custom SVG glyph (no emoji-as-UI).
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBe(4);
  });

  it('renders Main as the first tab', () => {
    render(<BottomNav />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAccessibleName('nav.main');
    expect(buttons[3]).toHaveAccessibleName('nav.more');
  });

  it('marks the Main tab active on the splash route', () => {
    render(<BottomNav />, { routerProps: { initialEntries: ['/'] } });
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].getAttribute('aria-current')).toBe('page');
  });

  it('marks the current tool route tab as active', () => {
    render(<BottomNav />, { routerProps: { initialEntries: ['/warmup'] } });
    // Main is first; Warmup is second and carries aria-current="page" on /warmup.
    const buttons = screen.getAllByRole('button');
    expect(buttons[1].getAttribute('aria-current')).toBe('page');
  });

  it('keeps the More tab active on More sub-pages', () => {
    render(<BottomNav />, { routerProps: { initialEntries: ['/timer'] } });
    const buttons = screen.getAllByRole('button');
    expect(buttons[3].getAttribute('aria-current')).toBe('page');
    expect(buttons.filter((button) => button.getAttribute('aria-current') === 'page')).toHaveLength(1);
  });
});

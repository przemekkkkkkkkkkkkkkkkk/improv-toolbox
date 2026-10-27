import { beforeEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import { AppIntro } from '../../components/intro/AppIntro';

describe('AppIntro', () => {
  beforeEach(() => localStorage.clear());

  it('walks a first-time visitor through the tour once', async () => {
    const { unmount } = render(<AppIntro />);
    expect(screen.getByRole('dialog')).toHaveTextContent('intro.welcome.title');

    for (let i = 0; i < 3; i++) await userEvent.click(screen.getByRole('button', { name: 'intro.next' }));
    await userEvent.click(screen.getByRole('button', { name: 'intro.done' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    unmount();

    render(<AppIntro />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('can be skipped with Escape', async () => {
    render(<AppIntro />);
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(localStorage.getItem('introSeen')).toBe('1');
  });
});

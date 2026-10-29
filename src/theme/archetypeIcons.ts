import { createElement, type CSSProperties, type HTMLAttributes } from 'react';

import caregiverIcon from '../assets/archetype-icons/caregiver.webp';
import creatorIcon from '../assets/archetype-icons/creator.webp';
import explorerIcon from '../assets/archetype-icons/explorer.webp';
import foolIcon from '../assets/archetype-icons/fool.webp';
import heroIcon from '../assets/archetype-icons/hero.webp';
import loverIcon from '../assets/archetype-icons/lover.webp';
import mentorIcon from '../assets/archetype-icons/mentor.webp';
import rebelIcon from '../assets/archetype-icons/rebel.webp';
import sageIcon from '../assets/archetype-icons/sage.webp';
import shadowIcon from '../assets/archetype-icons/shadow.webp';
import tricksterIcon from '../assets/archetype-icons/trickster.webp';
import villainIcon from '../assets/archetype-icons/villain.webp';

const ARCHETYPE_ICON_SRC: Record<string, string> = {
  hero: heroIcon,
  fool: foolIcon,
  villain: villainIcon,
  mentor: mentorIcon,
  trickster: tricksterIcon,
  lover: loverIcon,
  sage: sageIcon,
  shadow: shadowIcon,
  rebel: rebelIcon,
  caregiver: caregiverIcon,
  creator: creatorIcon,
  explorer: explorerIcon,
};

export function getArchetypeIconSrc(id: string): string {
  return ARCHETYPE_ICON_SRC[id] ?? foolIcon;
}

interface ArchetypeGlyphProps extends HTMLAttributes<HTMLSpanElement> {
  id: string;
  size?: number;
  strokeWidth?: number;
}

export function ArchetypeGlyph({
  id,
  size = 24,
  strokeWidth: ignoredStrokeWidth,
  className = '',
  style,
  ...props
}: ArchetypeGlyphProps) {
  void ignoredStrokeWidth;

  const src = getArchetypeIconSrc(id);
  const maskStyle = {
    width: size,
    height: size,
    backgroundColor: 'currentColor',
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    ...style,
  } as CSSProperties;

  return createElement('span', {
    'aria-hidden': true,
    ...props,
    className: `inline-block shrink-0 ${className}`.trim(),
    style: maskStyle,
  });
}

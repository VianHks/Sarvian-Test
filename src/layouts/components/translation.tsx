import type { FC } from 'react';

interface TranslationProps {
  readonly text: string
}

const Translation: FC<TranslationProps> = ({ text }) => {
  return <>{text}</>;
};

Translation.displayName = 'Translation';

export { Translation };

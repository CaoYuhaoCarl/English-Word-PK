import { useCallback } from 'react';
import { TTSService } from '../services/ttsService';

export function useSpeech() {
  const speak = useCallback((text: string, options = {}) => {
    TTSService.getInstance().speak(text, options);
  }, []);

  return { speak };
}
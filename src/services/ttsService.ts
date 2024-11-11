export class TTSService {
  private static instance: TTSService;

  private constructor() {}

  static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService();
    }
    return TTSService.instance;
  }

  async speak(text: string, options: {
    lang?: string;
    voice?: string;
    rate?: number;
    pitch?: number;
  } = {}): Promise<void> {
    const defaultOptions = {
      lang: 'en-US',
      rate: 1,
      pitch: 1,
    };

    const finalOptions = { ...defaultOptions, ...options };

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = finalOptions.lang;
      utterance.rate = finalOptions.rate;
      utterance.pitch = finalOptions.pitch;
      
      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event);

      // Get available voices
      let voices = speechSynthesis.getVoices();
      if (voices.length === 0) {
        // If voices aren't loaded yet, wait for them
        speechSynthesis.onvoiceschanged = () => {
          voices = speechSynthesis.getVoices();
          const voice = voices.find(v => 
            v.lang.includes(finalOptions.lang) || 
            v.name.toLowerCase().includes(finalOptions.lang.toLowerCase())
          );
          if (voice) {
            utterance.voice = voice;
          }
          speechSynthesis.speak(utterance);
        };
      } else {
        const voice = voices.find(v => 
          v.lang.includes(finalOptions.lang) || 
          v.name.toLowerCase().includes(finalOptions.lang.toLowerCase())
        );
        if (voice) {
          utterance.voice = voice;
        }
        speechSynthesis.speak(utterance);
      }
    });
  }
}
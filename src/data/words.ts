export interface Word {
  word: string;
  type: string;
  meaning: string;
  example?: string;
}

export const words: Word[] = [
  { word: "survive", type: "v", meaning: "幸存；生存", example: "They managed to survive the harsh winter." },
  { word: "survival", type: "n", meaning: "生存；存活", example: "Survival in the wild requires skill and knowledge." },
  { word: "survivor", type: "n", meaning: "幸存者", example: "The survivors were rescued from the island." },
  { word: "taste", type: "n/v", meaning: "味道；品尝", example: "This cake has a unique taste." },
  { word: "tasty", type: "a", meaning: "美味的", example: "The food was really tasty." },
  { word: "teach", type: "v", meaning: "教；教授", example: "She loves to teach math." },
  { word: "teacher", type: "n", meaning: "教师", example: "He is a dedicated teacher." },
  { word: "terrible", type: "a", meaning: "糟糕的；可怕的", example: "The weather was terrible yesterday." },
  { word: "terribly", type: "adv", meaning: "非常；糟糕地", example: "He performed terribly in the exam." },
  { word: "thank", type: "v", meaning: "感谢", example: "I thank you for your help." },
  { word: "thankful", type: "a", meaning: "感激的", example: "She was thankful for the support." },
  { word: "include", type: "v", meaning: "包括", example: "Please include your contact information." },
  { word: "including", type: "prep", meaning: "包括在内", example: "There are 10 members, including two teachers." },
  { word: "inclusion", type: "n", meaning: "包含；纳入", example: "The inclusion of everyone is important." },
  { word: "organize", type: "v", meaning: "组织；安排", example: "They organized a charity event." },
  { word: "organizer", type: "n", meaning: "组织者", example: "She was the main organizer of the event." },
  { word: "organized", type: "a", meaning: "有条理的；有组织的", example: "He is very organized with his work." },
  { word: "organization", type: "n", meaning: "组织；机构", example: "This organization helps the homeless." },
  { word: "hope", type: "v/n", meaning: "希望；期望", example: "We hope for the best." },
  { word: "hopeful", type: "a", meaning: "充满希望的", example: "She is hopeful about the future." },
  { word: "hopeless", type: "a", meaning: "绝望的", example: "The situation seemed hopeless." },
  { word: "imagine", type: "v", meaning: "想象；设想", example: "Imagine a world without poverty." },
  { word: "imagination", type: "n", meaning: "想象力", example: "Her imagination knows no bounds." },
  { word: "imaginative", type: "a", meaning: "富有想象力的", example: "He is an imaginative artist." },
  { word: "simple", type: "a", meaning: "简单的", example: "The instructions were simple." },
  { word: "simply", type: "adv", meaning: "简单地；仅仅", example: "Just simply press the button." },
  { word: "possible", type: "a", meaning: "可能的", example: "Is it possible to finish today?" },
  { word: "possibly", type: "adv", meaning: "可能地", example: "They could possibly arrive early." },
  { word: "impossible", type: "a", meaning: "不可能的", example: "It seems impossible to solve." },
  { word: "impossibly", type: "adv", meaning: "极其地；不可能地", example: "She was impossibly talented." },
  { word: "electric", type: "a", meaning: "电的；电动的", example: "He drives an electric car." },
  { word: "electricity", type: "n", meaning: "电；电力", example: "The electricity went out." },
  { word: "argue", type: "v", meaning: "争论；辩论", example: "They often argue about politics." },
  { word: "argument", type: "n", meaning: "争论；论点", example: "They had an argument over money." },
  { word: "fail", type: "v", meaning: "失败", example: "He failed to meet the deadline." },
  { word: "failure", type: "n", meaning: "失败", example: "The project was a failure." }
];

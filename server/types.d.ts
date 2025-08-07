
export interface SurveyResult {
  [key: string]: string;
}

export interface LocalizedText {
  en: string;
  fr: string;
}

export interface LearnMore {
  en: string;
  fr: string;
}

export interface Question {
  id: string;
  type: string;
  category: string;
  choiceGroup: string;
  answerType: string;
  displayType: string;
  label: LocalizedText;
  learnMore?: LearnMore;
  order: string;
}

export interface Choice {
  value: number;
  label: LocalizedText;
}

export interface ChoiceGroup {
  id: string;
  splitOffLast: string;
  choices: Choice[];
}

export interface Language {
  code: string;
}

export interface Leader {
  en: string;
  fr: string;
}

export interface Party {
  code: string;
  name: LocalizedText;
  color: string;
  leader: Leader;
  leader_id: string;
}

export interface SurveyConfig {
  questions: Record<string, Question>;
  choiceGroups: Record<string, ChoiceGroup>;
  languages: Record<string, Language>;
  parties: Party[];
}

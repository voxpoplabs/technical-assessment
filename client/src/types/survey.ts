export interface SurveyAnswers {
  [questionId: string]: string;
}

export interface LocalizedLabel {
  en: string;
  fr: string;
}

export interface Choice {
  value: number;
  label: LocalizedLabel;
}

export interface ChoiceGroup {
  id: string;
  splitOffLast: string;
  choices: Choice[];
}

export interface PolicyQuestion {
  id: string;
  type: 'policy';
  category: string;
  choiceGroup: string;
  answerType: 'single';
  displayType: 'radio';
  label: LocalizedLabel;
  learnMore?: LocalizedLabel;
  order: string;
}

export interface Language {
  code: string;
}

export interface PoliticalSurveyConfig {
  questions: { [key: string]: PolicyQuestion };
  choiceGroups: { [key: string]: ChoiceGroup };
  languages: { [key: string]: Language };
}
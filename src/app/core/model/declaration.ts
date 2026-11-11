import {DictionaryValue} from "./dictionary-value";

type DocMode = 'electronic' | 'paper' | null;
interface DocRow {
  dic: DictionaryValue;
  mode: DocMode;
}

interface RequestDto {
  iin: string;
  fullName: string;
  file?: string | null;

  purposes: {
    disability: boolean;           // установление/переосвидетельствование/изменение причины
    capacityLoss: boolean;         // степень утраты трудоспособности
    ipr: boolean;                   // ИПР/нуждаемость доп. видов помощи/ухода
  };

  docs: DocRow[];

  consentPlace: 'home' | 'stationary' | 'remote';
  earlyReasons: {
    agreePD: boolean;              // согласие на обработку ПД
    warnedFake: boolean;           // предупрежден за недостоверные сведения
    warnedChange: boolean;         // предупрежден о возможном изменении группы/размера
  };

  smsCode: string;
}

export interface Declaration{
  id: number;
  created: Date;
  iin: string;
  guardianIin: string
  status: string
  jsonData: RequestDto;
  mainId: number;
  fileId: number;
  socialSecurityCode: string;
}

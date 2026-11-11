export interface RequestDto {
  iin: string;
  fullName: string;
  file?: File;

  purpose: {
    primary: boolean;
    prolongation: boolean;
    reexamination: boolean;
    rehabilitation: boolean;
    additional: boolean;
  };

  consent: 'agree' | 'refuse';

  earlyReasons: {
    dataMismatch: boolean;
    diagnosisLoss: boolean;
    error: boolean;
    doctorConclusion: boolean;
    decisionChange: boolean;
    other: boolean;
  };

  smsCode: string;
}

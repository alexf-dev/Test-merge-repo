/**
 * Модель Реабилитационно-экспертная диагностика
 */
export interface RehabilitationDiagnosticsDTO {
  rehabilitationPotential: string | null;
  rehabilitationPrognosis: string | null;
  rehabilitationPrognosisComment: string;
  clinicalPrognosis: string | null;
}

export interface RehabilitationRecommendationsDTO {
  socialRehabilitation: string;
  professionalRehabilitation: string;
}

export interface RehabilitationConclusionDTO {
  specialist: string;  // ← ДОБАВЛЕНО
  diagnostics: RehabilitationDiagnosticsDTO;
  recommendations: RehabilitationRecommendationsDTO;
}

export interface DictionaryOption {
  value: string;
  labelKey: string;
}

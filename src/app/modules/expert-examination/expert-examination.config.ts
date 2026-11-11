/**
 * Режим начального раскрытия блоков формы.
 * - 'all'    — раскрыты все блоки;
 * - 'none'   — все блоки свёрнуты;
 * - number   — раскрыты первые N блоков (1 — только первый);
 * - number[] — раскрыты блоки с указанными индексами (нумерация с 0).
 */
export type ExpandedBlocksSetting = 'all' | 'none' | number | number[];

/**
 * Глобальные UI-настройки раздела "Экспертное обследование".
 */
export const EXPERT_EXAMINATION_UI_CONFIG = {
  /**
   * Какие блоки раскрыты при входе в форму раздела.
   *
   * Настройка влияет только на НАЧАЛЬНОЕ состояние при открытии формы:
   * пользовательские клики по заголовкам блоков и начальное состояние
   * вложенных подблоков (например, "Увеличены", "Позвоночник") от неё не зависят.
   */
  expandedBlocks: 1 as ExpandedBlocksSetting
};

/**
 * Вычисляет начальное раскрытие блока по его порядковому номеру в форме.
 * Единая точка логики для всех форм раздела.
 */
export function isBlockExpandedByConfig(blockIndex: number): boolean {
  const setting = EXPERT_EXAMINATION_UI_CONFIG.expandedBlocks;

  if (setting === 'all') {
    return true;
  }

  if (setting === 'none') {
    return false;
  }

  if (Array.isArray(setting)) {
    return setting.includes(blockIndex);
  }

  return blockIndex < setting;
}

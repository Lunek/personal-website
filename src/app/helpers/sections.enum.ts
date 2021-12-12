enum SectionsByIndexes {
  welcome = 0,
  about = 1,
  education = 2,
}

export const getSectionByIndex = (index: number): string => {
  return SectionsByIndexes[index];
};

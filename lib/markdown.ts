export const sanitizeDevToMarkdown = (markdown: string) => {
  let correctedMarkdown = '';

  // Dev.to sometimes turns "# header" into "#&nbsp;header"
  const replaceSpaceCharRegex = new RegExp(String.fromCharCode(160), 'g');
  correctedMarkdown = markdown.replace(replaceSpaceCharRegex, ' ');

  // Dev.to allows headers with no space after the hashtag (I don't use # on Dev.to due to the title)
  const addSpaceAfterHeaderHashtagRegex = /##(?=[a-z|A-Z])/g;
  return correctedMarkdown.replace(addSpaceAfterHeaderHashtagRegex, '$& ');
};

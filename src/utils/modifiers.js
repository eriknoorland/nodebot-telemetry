export default (blockName, modifiers) => {
  if (!modifiers) {
    return blockName;
  }

  const modifierClasses = modifiers
    .split(' ')
    .map(modifier => `${blockName}--${modifier}`)
    .join(' ');
  
  return `${blockName} ${modifierClasses}`;
};
const dataFilter = (data, filterWords) => {
  return data.filter((sample) => {
    const allIngredients = [
      ...sample.missedIngredients,
      ...sample.usedIngredients,
      ...sample.unusedIngredients,
    ];
    for (const ingredient of allIngredients) {
      for (const word of filterWords) {
        if (ingredient.originalName.toLowerCase().includes(word)) {
          return false;
        }
      }
    }
    return true;
  });
};

module.exports = { dataFilter };

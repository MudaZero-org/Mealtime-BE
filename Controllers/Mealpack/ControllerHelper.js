const dataFilter = (data, filterWords) => {
  return data.filter((recipe) => {
    const allIngredients = [
      ...recipe.missedIngredients,
      ...recipe.usedIngredients,
      ...recipe.unusedIngredients,
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

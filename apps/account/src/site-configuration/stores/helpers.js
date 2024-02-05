export function moveArrayItem(array, fromIndex, toIndex) {
  // Без проброса через JSON почему-то криво срабатывает реактивность,
  // и при переносе переименованного элемента, в label записывает значение из элемента toIndex
  const element = JSON.parse(JSON.stringify(array[fromIndex]));
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, element);
}

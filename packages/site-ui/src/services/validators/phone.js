export function phone(value) {
  if (value.length === 0) {
    return true;
  }

  const phone = value.replaceAll(/\D+/g, '');

  return (
    phone.length >= 6 &&
    phone.length <= 17 &&
    ![...phone].every((value, index, array) => value === array[0])
  );
}

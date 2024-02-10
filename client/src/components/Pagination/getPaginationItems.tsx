function getPaginationItems(
  currentPage: number,
  itemsPerPage: number,
  maxLength: number
) {
  const paginationItems = [];
  const firstPage = 1;
  const confirmedPagesCount = 3;
  const deductedMaxLength = maxLength - confirmedPagesCount;
  const sideLength = deductedMaxLength / 2;

  if (itemsPerPage <= maxLength) {
    for (let i = 1; i <= itemsPerPage; i++) {
      paginationItems.push(i);
    }
  } else {
    if (
      currentPage - firstPage < sideLength ||
      itemsPerPage - currentPage < sideLength
    ) {
      for (let j = 1; j <= sideLength + firstPage; j++) {
        paginationItems.push(j);
      }
      paginationItems.push(NaN);
      for (let k = itemsPerPage - sideLength; k <= itemsPerPage; k++) {
        paginationItems.push(k);
      }
    } else {
      const deductedSideLength = sideLength - 1;
      paginationItems.push(1);
      paginationItems.push(NaN);
      for (
        let l = currentPage - deductedSideLength;
        l <= currentPage + deductedSideLength;
        l++
      ) {
        paginationItems.push(l);
      }
      paginationItems.push(NaN);
      paginationItems.push(itemsPerPage);
    }
  }

  return paginationItems;
}

export default getPaginationItems;

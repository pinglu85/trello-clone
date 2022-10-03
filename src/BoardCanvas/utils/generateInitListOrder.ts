function generateInitListOrder(lists: ListWithCards[]): string[] {
  return lists.map(({ id }) => id);
}

export default generateInitListOrder;

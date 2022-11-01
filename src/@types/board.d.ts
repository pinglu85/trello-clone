type ReorderListsInCurrBoard = (
  sourceIndex: number,
  destinationIndex: number
) => void;

interface Orderable {
  rank: string;
}

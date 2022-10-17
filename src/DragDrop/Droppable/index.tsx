import { DragDropTypes } from '../types';

interface DroppableProps extends WithChildrenProps {
  droppableId: string;
  type: DragDropTypes;
  className?: string;
}

const Droppable = ({
  droppableId,
  type,
  children,
  ...props
}: DroppableProps): JSX.Element => {
  return (
    <div data-droppable-id={droppableId} data-droppable-type={type} {...props}>
      {children}
    </div>
  );
};

export default Droppable;

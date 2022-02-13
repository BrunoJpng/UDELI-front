import { ReactNode, useRef } from "react";
import { chakra, Flex, GridItem, GridItemProps, Text } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from 'dnd-core';

import { ItemTypes } from "./ItemTypes";

type DragCardProps = GridItemProps & {
  id: string;
  index: number;
  children: ReactNode;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
  removeCard?: (id: string) => void;
}

type DragItem = {
  id: string;
  index: number;
}

const CloseButton = chakra(MdClose);

export function DragCard({ 
  children, 
  index, 
  moveCard, 
  id,
  removeCard,
  ...rest }: DragCardProps) {
  const dropRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!dropRef.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = dropRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <GridItem
      ref={dropRef}
      style={{ opacity }}
      backgroundColor="white"
      textAlign="center"
      padding={4}
      border="1px"
      borderColor="gray.400"
      borderRadius="md"
      overflowY="hidden"
      data-handler-id={handlerId}
      {...rest}
    >
      <Flex
        ref={dragRef}
        alignItems="center"
        justifyContent="space-between"
        marginBottom={2}
      >
        <div />
        <Text fontSize="xl" fontWeight="semibold">{id}</Text>
        
        <CloseButton
          size={24} 
          color="red.700"
          onClick={() => removeCard(id)} 
        />
      </Flex>
      {children}
    </GridItem>
  )
}
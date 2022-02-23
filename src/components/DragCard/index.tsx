import { ReactNode, useRef, useState } from "react";
import { CloseButton, GridItem, GridItemProps, Text } from "@chakra-ui/react";

import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from 'dnd-core';

import { useCards } from "../../hooks/useCards";

import { ItemTypes } from "./ItemTypes";

type DragCardProps = GridItemProps & {
  id: string;
  title: string;
  index: number;
  children: ReactNode;
}

type DragItem = {
  id: string;
  index: number;
}

export function DragCard(props: DragCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  const { moveCard, removeCard } = useCards();

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
      const hoverIndex = props.index;

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
      const { id, index } = props;
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <GridItem
      ref={dropRef}
      backgroundColor="white"
      border="1px"
      borderColor="gray.400"
      borderRadius="md"
      boxShadow="base"
      textAlign="center"
      padding={4}
      overflowY="hidden"
      position="relative"
      opacity={isDragging ? 0 : 1}
      data-handler-id={handlerId}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      <Text 
        ref={dragRef}
        fontSize="xl" 
        fontWeight="semibold"
        cursor={isDragging ? "grabbing" : "grab"}
      >
        {props.title}
      </Text>

      {isVisible && !isDragging && (
        <CloseButton
          size="lg" 
          backdropFilter='auto'
          backdropBlur='8px'
          color="red.700"
          position="absolute"
          right={2}
          top={2}
          onClick={() => removeCard(props.id)} 
          _hover={{ color: 'red.600' }}
        />
      )}
      {props.children}
    </GridItem>
  )
}
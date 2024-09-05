import React, { useState } from 'react';
import { Link as MagritteLink } from '@hh.ru/magritte-ui';
import { Link } from 'react-router-dom';
import {
  Divider,
  VSpacingContainer,
  LoadingContextProvider,
  Text,
} from '@hh.ru/magritte-ui';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const ItemType = 'ANSWER';

interface DragItem {
  id: string;
  content: string;
}

const DraggableAnswer: React.FC<{
  id: string;
  content: string;
}> = ({ id, content }) => {
  const [, drag] = useDrag({
    type: ItemType,
    item: { id, content },
  });

  return (
    <span
      ref={drag}
      style={{
        padding: '4px 8px',
        margin: '0 4px',
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        fontSize: '14px',
        cursor: 'pointer',
        display: 'inline-block',
      }}
    >
      {content}
    </span>
  );
};

const Slot: React.FC<{
  id: string;
  answer: DragItem | null;
  onDrop: (item: DragItem) => void;
  onRemove: () => void;
}> = ({ id, answer, onDrop, onRemove }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item: DragItem) => onDrop(item),
  });

  return (
    <span
      ref={drop}
      style={{
        padding: '4px 8px',
        margin: '0 4px',
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        fontSize: '14px',
        display: 'inline-block',
        minWidth: '80px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      {answer ? (
        <span style={{ position: 'relative' }}>
          {answer.content}
          <button
            onClick={onRemove}
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#999',
              fontSize: '12px',
            }}
          >
            ✖
          </button>
        </span>
      ) : (
        <span style={{ color: '#999' }}>Слот</span>
      )}
    </span>
  );
};

export const PairMatchingDemoPage4: React.FC = () => {
  const [slots, setSlots] = useState([
    { id: '1', answer: null },
    { id: '2', answer: null },
    { id: '3', answer: null },
    { id: '4', answer: null },
  ]);

  const [answers, setAnswers] = useState([
    { id: '5', content: 'React' },
    { id: '6', content: 'Node.js' },
    { id: '7', content: 'Figma' },
    { id: '8', content: 'Jest' },
  ]);

  const handleDrop = (slotId: string, item: DragItem) => {
    // Проверяем, не занят ли слот уже другим элементом
    const slot = slots.find((slot) => slot.id === slotId);
    if (slot && slot.answer) {
      return; // Если слот уже занят, не делаем ничего
    }

    // Обновляем состояние слотов
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === slotId ? { ...slot, answer: item } : slot
      )
    );

    // Удаляем элемент из списка доступных ответов
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => answer.id !== item.id)
    );
  };

  const handleRemove = (slotId: string) => {
    const slot = slots.find((slot) => slot.id === slotId);
    if (slot && slot.answer) {
      // Возвращаем элемент обратно в список доступных ответов
      setAnswers((prevAnswers) => [...prevAnswers, slot.answer!]);

      // Очищаем слот
      setSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot.id === slotId ? { ...slot, answer: null } : slot
        )
      );
    }
  };

  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
      <VSpacingContainer default={24}>
        <LoadingContextProvider loading={true}>
          <div
            style={{
              padding: 16,
              borderRadius: 16,
              border: '1px solid #ccc',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              justifyContent: 'stretch',
            }}
          >
            <div
              style={{
                borderRadius: 16,
                border: '1px solid #ccc',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: 16,
              }}
            >
              <Text>
                Эта демоверсия позволяет заполнить слоты элементами. Перетащите элемент в соответствующий слот.
              </Text>
              <Divider marginTop={20} marginBottom={20} />
              <Text>
                Например, вы можете перетащить <Slot id="1" answer={slots[1].answer} onDrop={(item) => handleDrop('1', item)} onRemove={() => handleRemove('1')} /> сюда, или <Slot id="2" answer={slots[2].answer} onDrop={(item) => handleDrop('2', item)} onRemove={() => handleRemove('2')} /> сюда.
              </Text>
            </div>

            <Divider marginTop={20} marginBottom={20} />

            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', flexWrap: 'wrap' }}>
              {answers.map((answer) => (
                <DraggableAnswer
                  key={answer.id}
                  id={answer.id}
                  content={answer.content}
                />
              ))}
            </div>
          </div>
        </LoadingContextProvider>
      </VSpacingContainer>
      <Link to="/">
        <MagritteLink style="positive" typography="label-2-regular">
          HOME
        </MagritteLink>
      </Link>
    </DndProvider>
  );
};
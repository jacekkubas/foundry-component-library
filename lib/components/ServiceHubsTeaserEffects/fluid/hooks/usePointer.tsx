import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import { Vector2 } from 'three';

type SplatStack = {
  mouseX: number;
  mouseY: number;
  velocityX: number;
  velocityY: number;
};

export const usePointer = ({ force }: { force: number }) => {
  const { size, gl } = useThree();

  const splatStack = useRef<SplatStack[]>([]).current;
  const lastMouse = useRef(new Vector2());
  const hasMoved = useRef(false);

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const deltaX = x - lastMouse.current.x;
      const deltaY = y - lastMouse.current.y;

      if (!hasMoved.current) {
        hasMoved.current = true;
        lastMouse.current.set(x, y);
        return;
      }

      lastMouse.current.set(x, y);

      splatStack.push({
        mouseX: x / size.width,
        mouseY: 1 - y / size.height,
        velocityX: deltaX * force,
        velocityY: -deltaY * force,
      });
    },
    [force, size.width, size.height, gl, splatStack],
  );

  useEffect(() => {
    const el = gl.domElement;
    el.addEventListener('pointermove', onPointerMove);
    return () => el.removeEventListener('pointermove', onPointerMove);
  }, [onPointerMove, gl]);

  return splatStack;
};

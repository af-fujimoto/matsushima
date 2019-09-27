import * as React from 'react';

interface stoneProps {
  color: stoneColor
}

export default function Stone(props: stoneProps) {
  const {color} = props;
  const className: string = `is-show-${color.toLowerCase()}`;

  return (
    <div className={'stone ' + className}>
      <span className="stone-black" />
      <span className="stone-white" />
    </div>
  );
}

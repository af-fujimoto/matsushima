import * as React from 'react';

interface CountProps {
  count: countData
}

export default function Count(props: CountProps) {
  const {EMPTY, WHITE, BLACK} = props.count;
  return (
    <dl className="count">
      <dt className="name">EMPTY:</dt>
      <dd className="value">{EMPTY}</dd>
      <dt className="name">WHITE:</dt>
      <dd className="value">{WHITE}</dd>
      <dt className="name">BLACK:</dt>
      <dd className="value">{BLACK}</dd>
      <dt className="name">TOTAL:</dt>
      <dd className="value">{EMPTY + WHITE + BLACK}</dd>
    </dl>
  );
}

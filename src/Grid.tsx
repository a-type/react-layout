import * as React from 'react';
import { Consumer } from './Context';

export type LayoutGridTemplate = string[][];

export interface LayoutGridProps extends React.HTMLAttributes<HTMLDivElement> {
  gridTemplate: LayoutGridTemplate;
  gridRows: string[];
  gridColumns: string[];
  gridGap: string;
}

const LayoutGrid: React.SFC<LayoutGridProps> = ({ gridTemplate, gridRows, gridColumns, gridGap, className, children, style, ...rest }) => {
  const areaNames = gridTemplate.reduce((allNames, row) => row.reduce((rowNames, name) => {
    rowNames.add(name);
    return rowNames;
  }, allNames), new Set<string>());

  const gridTemplateCSS = gridTemplate.reduce<string[]>((rows, row) => [...rows, `'${row.join(' ')}'`], []).join(' ');

  const finalClassName = `react-layout-grid ${className}`;

  return (
    <Consumer>
      {({ area }) => {
        return (
          <div
            style={{ ...style, gridTemplateAreas: gridTemplateCSS, gridTemplateRows: gridRows.join(' '), gridTemplateColumns: gridColumns.join(' '), gridGap }}
            className={finalClassName}
            {...area<HTMLDivElement>(...areaNames)}
            {...rest}
          />
        );
      }}
    </Consumer>
  );
};

export default LayoutGrid;

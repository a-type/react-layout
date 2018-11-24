import * as React from 'react';
import { Consumer } from './Context';

export interface ContentProps {
  area: string;
  children: React.ReactNode;
}

const LayoutContent: React.SFC<ContentProps> = ({ children, area }) => {
  return (
    <Consumer>
      {({ renderContent }) => {
        return renderContent(
          children,
          area
        )
      }}
    </Consumer>
  );
}

export default LayoutContent;

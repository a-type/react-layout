import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface AreaProps<TElement extends HTMLElement> {
  ref(element: TElement): void;
  'data-layout-area': string;
}

export interface LayoutContextValue {
  area<TElement extends HTMLElement>(
    ...areaNames: string[]
  ): AreaProps<TElement>;
  renderContent(node: React.ReactNode, area: string): React.ReactNode;
}

const Context = React.createContext<LayoutContextValue>({
  // no-op ref
  area: (areaName: string) => ({
    ref: () => {},
    'data-layout-area': areaName,
  }),
  // no-op render
  renderContent: node => node,
});

interface LayoutProviderState {
  areaElements: {
    [areaName: string]: HTMLElement;
  };
}

class LayoutProvider extends React.Component<{}, LayoutProviderState> {
  state = {
    areaElements: {},
  };

  areaRefs = {};

  areaElementRef = (areaNames: string[]) => {
    const key = areaNames.join(' ');
    if (this.areaRefs[key]) {
      return this.areaRefs[key];
    }

    const ref = (element: HTMLElement) => {
      this.setState(oldState => {
        const assignedAreas = areaNames.reduce(
          (elements, name) => ({
            ...elements,
            [name]: element,
          }),
          oldState.areaElements,
        );

        return {
          areaElements: assignedAreas,
        };
      });
    };
    this.areaRefs[key] = ref;
    return ref;
  };

  createArea = <TElement extends HTMLElement>(
    ...areaNames: string[]
  ): AreaProps<TElement> => {
    const ref = this.areaElementRef(areaNames);
    const props = {
      ref,
      'data-layout-area': areaNames.join(' '),
    };
    return props;
  };

  renderContent = (node: React.ReactNode, area: string): React.ReactNode => {
    const element = this.state.areaElements[area];

    if (!element) {
      return node;
    }

    return ReactDOM.createPortal(node, element);
  };

  render() {
    const { children } = this.props;

    const contextValue = {
      area: this.createArea,
      renderContent: this.renderContent,
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  }
}

export const Provider = LayoutProvider;
export const Consumer = Context.Consumer;

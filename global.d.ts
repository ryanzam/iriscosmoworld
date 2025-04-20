interface Window {
    AgentInitializer: {
      init: (config: {
        rootId: string;
        formID: string;
        queryParams: string[];
        domain: string;
        isInitialOpen: boolean;
        isDraggable: boolean;
        background: string;
        buttonBackgroundColor: string;
        buttonIconColor: string;
        variant: boolean;
        customizations: {
          greeting: string;
          greetingMessage: string;
          pulse: string;
          position: string;
        };
      }) => void;
    };
  }
  
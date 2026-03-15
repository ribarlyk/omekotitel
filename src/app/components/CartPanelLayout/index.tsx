interface CartPanelLayoutProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

export const CartPanelLayout = ({ children, footer }: CartPanelLayoutProps) => (
  <>
    <div className="flex-1 overflow-y-auto p-6">{children}</div>
    <div className="shrink-0 border-t border-gray-200 p-6">{footer}</div>
  </>
);

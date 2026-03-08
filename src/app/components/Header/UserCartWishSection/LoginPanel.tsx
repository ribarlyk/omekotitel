import Login from "@/src/app/components/auth/Login";

interface Props {
  onSuccess: () => void;
}

export const LoginPanel = ({ onSuccess }: Props) => <Login onSuccess={onSuccess} />;

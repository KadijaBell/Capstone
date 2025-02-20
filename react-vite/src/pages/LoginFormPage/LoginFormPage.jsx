import LoginFormModal from '../../components/LoginFormModal/LoginFormModal';

function LoginFormPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight px-4">
      <div className="max-w-md w-full bg-ivory rounded-lg shadow-xl p-8">
        <LoginFormModal isPage={true} />
      </div>
    </div>
  );
}


export default LoginFormPage;
